import { load } from "cheerio";
import path from "path";
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
 * @returns {void}
 */
export const postprocess = (current, all) => {
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
  return $.html();
};
