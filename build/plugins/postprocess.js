import { load } from "cheerio";
import url from "url";

/**
 * @typedef {Object} ProcessedPage
 * @property {string} inputPath
 * @property {string} outputPath
 * @property {string} url
 * @property {string} content
 * @property {string} rawInput
 */

/**
 * @param {ProcessedPage} current
 * @param {ProcessedPage[]} all
 * @returns {Promise<string>}
 */
export const postprocess = async (current, all) => {
  const $ = load(current.content);

  $('article :is(a[href^="/"], a[href^="./"], a[href^="../"])').each((_, a) => {
    const $a = $(a);
    const href = $a.attr("href");
    if (all[$a.attr("href")]) return;

    const normalisedHref = url.resolve(current.url, href);

    if (all[normalisedHref]) return;
    if (all[normalisedHref + "/"]) return;
    if (all[decodeURIComponent(normalisedHref)]) return;
    if (all[decodeURIComponent(normalisedHref) + "/"]) return;

    $a.addClass("link link--broken");
  });

  const embedsArray = $("article a[data-embed]").toArray();
  const getTargetFile = (hrefNonNormalised, all) => {
    const normalisedHref = url.resolve(current.url, hrefNonNormalised);
    if (all[hrefNonNormalised]) return all[hrefNonNormalised];
    if (all[normalisedHref]) return all[normalisedHref];
    if (all[normalisedHref + "/"]) return all[normalisedHref + "/"];
    if (all[decodeURIComponent(normalisedHref)])
      return all[decodeURIComponent(normalisedHref)];
    if (all[decodeURIComponent(normalisedHref) + "/"])
      return all[decodeURIComponent(normalisedHref) + "/"];
  };

  for (let embed of embedsArray) {
    const $embed = $(embed);
    const targetHref = $embed.attr("href");
    try {
      const target = getTargetFile(targetHref, all);
      if (!target) {
        console.log(`Cannot find embed for ${targetHref} from ${current.url}`);
        continue;
      }
      const targetId = $embed.attr("data-embed").trim();
      const fileContent = target.content;
      const $fileDOM = load(fileContent);

      let contentToEmbed = "";
      // Fragment Embed
      if (targetId) {
        const fragment = $fileDOM(targetId).parent();
        if (fragment) {
          contentToEmbed = $fileDOM(fragment).html();
        } else {
          // TODO: render a placeholder
          contentToEmbed = "Missing fragment";
        }
      } else {
        // Full embed
        contentToEmbed = $fileDOM("article").html();
      }

      const $wrapper = $("<blockquote>");
      $wrapper.addClass("embed embed--note");
      $wrapper.append(
        `<a href="${target.url}" class="embed__source">Source</a>`,
        // `<a href="${target.url}" class="embed__source">${$fileDOM("h1").text()}</a>`,
      );
      $wrapper.append(contentToEmbed);

      $embed.replaceWith($wrapper);
    } catch (err) {
      console.error(
        `Error reading file [${targetHref}]:\nMessage: ${err.message}`,
      );
      // TODO: render a placeholder element
      $embed.replaceWith(`<!-- Error loading ${targetHref} -->`);
    }
  }

  return $.html();
};
