import { load } from "cheerio";
import url from "url";
import path from "path";
import fs from "fs/promises";
import { isRemoteUrl } from "../is-remote-url.js";
import { makeAbsoluteUrl } from "../absolute-url.js";
import SiteData from "../../src/_data/site.js";
import { getEmbedContent } from "./get-embed-content.js";
import { getAnchorIdForLink } from "../anchor-ids.js";

const absoluteUrl = makeAbsoluteUrl(SiteData.rootUrl);

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
  const filesToCopy = {};

  // TODO: could me made more generic with something like: data-transform-attr='attr-name'
  $('meta[property="og:image"], meta[name="twitter:image"]').each((_, meta) => {
    const $meta = $(meta);
    if (!$meta.attr("content")) {
      console.log(
        `[postprocess] missing meta image for [${current.inputPath}]`,
      );
      return;
    }

    const src = $meta.attr("content");
    if (isRemoteUrl(src)) return;

    const cwd = process.cwd();
    const fromPath = path.join(cwd, path.dirname(current.inputPath), src);
    const toPath = path.join(cwd, path.dirname(current.outputPath), src);

    const updatedUrl = absoluteUrl(url.resolve(current.url, src));
    $meta.attr("content", updatedUrl);
    filesToCopy[fromPath] = toPath;
  });

  // TODO: extract so this cache is shared
  const filesToCopyList = Object.entries(filesToCopy);
  for (const [fromPath, toPath] of filesToCopyList) {
    try {
      await fs.copyFile(fromPath, toPath);
    } catch (error) {
      console.log(
        `[postprocess] failed to copy related asset ${fromPath} to ${toPath}`,
      );
    }
  }

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
        const embedNamePretty = decodeURIComponent(targetHref)
          .split("/")
          .at(-1);
        $embed.replaceWith(
          `<p class="embed embed--error">
              Missing embed: <strong>${embedNamePretty}</strong>
           </p>`,
        );
        continue;
      }

      const targetIdAttr = $embed.attr("data-target")?.trim();
      const targetId = targetIdAttr;
      const embed = getEmbedContent(target.content, targetId);
      const $wrapper = $("<blockquote>");
      $wrapper.addClass("embed embed--note");
      const fullTargetUrl = targetId
        ? `${target.url}${embed.selector}`
        : target.url;

      $wrapper.append(
        `<a href="${fullTargetUrl}" class="embed__source">Source</a>`,
      );

      $wrapper.append(embed.content);
      $embed.replaceWith($wrapper);
    } catch (err) {
      console.error(
        `Error reading file [${targetHref}]:\nMessage: ${err.message}\nStack: ${err.stack}`,
      );
      // TODO: render a placeholder element
      $embed.replaceWith(`<!-- Error loading ${targetHref} -->`);
    }
  }

  return $.html();
};
