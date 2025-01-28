// TODO: ignore twitter images

import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import hljs from "highlight.js";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItCallout from "markdown-it-github-alerts";
import { escapeHtml } from "markdown-it/lib/common/utils.mjs";
import { makeAbsoluteUrl } from "./build/absolute-url.ts";
import { dateFormat } from "./build/date-format.ts";
import { mdAdjustLinks } from "./build/plugins/md-adjust-links.ts";
import { mdEmbed } from "./build/plugins/md-embed.ts";
import taskListPlugin from "./build/plugins/md-task-list.ts";
import { ObsidianImportPlugin } from "./build/plugins/obsidian.ts";
import { shuffle } from "./build/shuffle.ts";
import { groupByMonth } from "./build/group-by-month.ts";
import { slugifyPermalink } from "./build/slugify.ts";
import { getLinks } from "./build/plugins/backlinks.ts";
import SiteData from "./src/_data/site.js";
/**
 * Eleventy Configuration File
 *
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig - Eleventy configuration object.
 * @returns {import("@11ty/eleventy").UserConfig} Eleventy configuration options.
 */
export default function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setQuietMode(true);

  const markdownOptions = {
    linkify: false,
    breaks: true,
    html: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
        } catch (__) {}
      }

      return `<pre class="hljs"><code>${escapeHtml(str)}</code></pre>`;
    },
  };
  const mdLib = markdownIt(markdownOptions);
  mdLib.use(markdownItAttrs);
  mdLib.use(taskListPlugin);
  mdLib.use(markdownItCallout, {
    markers: "*",
    // Just disable all titles and icons
    icons: new Proxy({}, { get: () => "" }),
    titles: new Proxy({}, { get: () => "" }),
  });
  mdLib.use(mdEmbed);
  mdLib.use(mdAdjustLinks);
  eleventyConfig.setLibrary("md", mdLib);

  eleventyConfig.addFilter("groupByMonth", groupByMonth);
  eleventyConfig.addFilter("shuffle", shuffle);
  // TODO: move to a separate file
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["auto"],
    defaultAttributes: { loading: "lazy", decoding: "async" },
    sharpOptions: { animated: true },
    cacheOptions: {
      duration: "30000d", // I'll update it on my 118th birthday
      formatUrlForDisplay: (url) => url,
      fetchOptions: {
        headers: {
          // lol
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
        },
      },
    },
  });

  eleventyConfig.addPlugin(ObsidianImportPlugin);
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addFilter("dateFormat", dateFormat);
  eleventyConfig.addFilter("absoluteUrl", makeAbsoluteUrl(SiteData.rootUrl));
  eleventyConfig.addFilter("slugifyPermalink", slugifyPermalink);

  eleventyConfig.addFilter("getBacklinks", async (collection, target) =>
    collection
      .filter((item) => getLinks(item).has(target))
      .map((_) => ({ url: _.url, title: _.data.title, date: _.date })),
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    templateFormats: ["md", "njk", "html"],
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
