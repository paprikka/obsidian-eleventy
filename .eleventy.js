// TODO: ignore twitter images

import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { mdEmbed } from "./build/plugins/md-embed.js";
import { ObsidianImportPlugin } from "./build/plugins/obsidian.js";
import markdownIt from "markdown-it";

export default function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setQuietMode(true);

  // TODO: drop from here and colocate with the content
  eleventyConfig.addCollection("notes", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/notes/**/*.md").map((item) => {
      item.data.title = item.data?.title || item.fileSlug;
      item.data.layout = "note.njk";
      return item;
    });
  });

  const markdownOptions = { linkify: false, breaks: true, html: true };
  const mdLib = markdownIt(markdownOptions);
  mdLib.use(mdEmbed);
  eleventyConfig.setLibrary("md", mdLib);

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["auto"],
    defaultAttributes: { loading: "lazy", decoding: "async" },
    // sharpOptions: { animated: true },
    cacheOptions: {
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
