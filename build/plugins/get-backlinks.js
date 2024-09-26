import url from "url";
import { load } from "cheerio";
/**
 * @typedef {Object} Backlink
 * @property {string} url
 * @property {string} title
 */

/**
 * @param {import('./postprocess').ProcessedPage} current
 * @param {import('./postprocess').ProcessedPage[]} all
 * @returns {Backlink[]}
 */
export const getBacklinks = (current, all) => {
  const currentUrl = current.url;
  const backlinks = [];

  for (const page of Object.values(all)) {
    if (page.url === currentUrl) continue;

    const $ = load(page.content);
    const links = $("a[href]")
      .map((_, el) => $(el).attr("href"))
      .get();

    const hasBacklink = links.some((link) => {
      const resolvedLink = url.resolve(page.url, link);
      return resolvedLink === currentUrl || resolvedLink === currentUrl + "/";
    });

    if (hasBacklink) {
      backlinks.push({
        url: page.url,
        title: $("h1").first().text() || page.url,
      });
    }
  }

  return backlinks;
};
