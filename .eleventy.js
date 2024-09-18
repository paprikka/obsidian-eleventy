// TODO: ignore twitter images

import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import hljs from "highlight.js";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItCallout from "markdown-it-github-alerts";
import { escapeHtml } from "markdown-it/lib/common/utils.mjs";
import { makeAbsoluteUrl } from "./build/absolute-url.js";
import { dateFormat } from "./build/date-format.js";
import { mdEmbed } from "./build/plugins/md-embed.js";
import taskListPlugin from "./build/plugins/md-task-list.js";
import { ObsidianImportPlugin } from "./build/plugins/obsidian.js";
import { slugifyPath, slugifyPermalink } from "./build/slugify.js";
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

  function adjustLinks(md) {
    const defaultRender =
      md.renderer.rules.link_open ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      const hrefIndex = tokens[idx].attrIndex("href");
      if (hrefIndex >= 0) {
        const href = tokens[idx].attrs[hrefIndex][1];
        if (href.startsWith("../")) {
          tokens[idx].attrs[hrefIndex][1] = slugifyPath(href);
        }
      }
      return defaultRender(tokens, idx, options, env, self);
    };
  }

  mdLib.use(adjustLinks);
  eleventyConfig.setLibrary("md", mdLib);

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
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    templateFormats: ["md", "njk", "html"],
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
