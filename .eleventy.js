import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { importObsidianMarkdown } from "./build/obsidian-import.js";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
//
// TODO: ignore twitter images
// wikilinks + wiki image links
export default function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setQuietMode(true);
  // eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  eleventyConfig.amendLibrary("md", importObsidianMarkdown);
  // eleventyConfig.ignores.add("src/sol/**/*.md");

  eleventyConfig.addCollection("publishedNotes", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/sol/**/*.md")
      .filter(function (item) {
        item.data.title = item.data.title || item.page.fileSlug;
        return item.data.publish === true;
      });
  });

  // eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
  //   extensions: "html",
  //   formats: ["auto"],
  //   defaultAttributes: {
  //     loading: "lazy",
  //     decoding: "async",
  //   },
  // });

  eleventyConfig.addFilter("notesUrl", (path) => {
    console.log("asda ", path);
    const result = path.replace("/sol", "foo");
    console.log({ result });
    return result;
  });
  eleventyConfig.addFilter("json", (obj) => console.log(obj));
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
