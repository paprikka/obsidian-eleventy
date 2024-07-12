// TODO: ignore twitter images

import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { mdEmbed } from "./build/plugins/md-embed.js";
import { ObsidianImportPlugin } from "./build/plugins/obsidian.js";

export default function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setQuietMode(true);

  eleventyConfig.addCollection("notes", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/notes/**/*.md").map((item) => {
      item.data.title = item.data?.title || item.fileSlug;
      item.data.layout = "note.njk";
      return item;
    });
  });

  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.use(mdEmbed);
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["auto"],
    defaultAttributes: { loading: "lazy", decoding: "async" },
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
