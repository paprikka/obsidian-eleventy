import { load, type Element as CheerioElement } from "cheerio";
import path from "path";

type ProcessedPage = {
  inputPath: string;
  outputPath: string;
  url: string;
  content: string;
  rawInput: string;
  templateContent: string;
};

type LinkCache = {
  [key: string]: Set<string>;
};

const cache: LinkCache = {};

/**
 * Extracts links from the HTML content of a page.
 * @param sourcePage - The processed page object containing the page data and content.
 * @returns A Set of unique links found in the page.
 */
export const getLinks = (sourcePage: ProcessedPage): Set<string> => {
  const html = sourcePage.templateContent;
  const cacheKey = sourcePage.url.endsWith("/")
    ? sourcePage.url
    : `${sourcePage.url}/`;

  if (cache[cacheKey]) return cache[cacheKey];

  const $ = load(html);

  const result = new Set<string>(
    $("a[href^='/'], a[href^='.']")
      .map(function(this: CheerioElement, _: number, el: CheerioElement) {
        const href = $(el).attr("href");
        if (!href) return "";
        const rootHref = path.resolve(sourcePage.url, href);
        return rootHref.endsWith("/") ? rootHref : `${rootHref}/`;
      })
      .get()
      .filter(Boolean)
  );

  cache[cacheKey] = result;
  return result;
};
