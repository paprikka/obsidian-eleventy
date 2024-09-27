import { load } from "cheerio";
import path from "path";

const cache = {};

/**
 * @typedef {Object} ProcessedPage
 * @property {string} inputPath
 * @property {string} outputPath
 * @property {string} url
 * @property {string} content
 * @property {string} rawInput
 */

/**
 * Extracts links from the HTML content of a page.
 * @param {ProcessedPage} sourcePage - The processed page object containing the page data and content.
 * @returns {Set<string>} A Set of unique links found in the page.
 */
export const getLinks = (sourcePage) => {
  const html = sourcePage.templateContent;
  const cacheKey = sourcePage.url.endsWith("/")
    ? sourcePage.url
    : `${sourcePage.url}/`;

  if (cache[cacheKey]) return cache[cacheKey];

  const $ = load(html);

  const result = new Set(
    $("a[href^='/'], a[href^='.']")
      .map((_, el) => {
        const href = $(el).attr("href");
        const rootHref = path.resolve(sourcePage.url, href);
        return rootHref.endsWith("/") ? rootHref : `${rootHref}/`;
      })
      .get(),
  );

  cache[cacheKey] = result;
  return result;
};
