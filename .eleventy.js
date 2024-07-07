// TODO: ignore twitter images

import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { mdEmbed } from "./build/md-embed.js";
// import embedYoutube from "eleventy-plugin-youtube-embed";
// wikilinks + wiki image links

function isBlockedUrl(url, blockedDomains) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    return Array.from(blockedDomains).some((domain) =>
      hostname.includes(domain),
    );
  } catch (_) {
    return false;
  }
}

// Example usage
const blockedDomains = new Set([
  "www.youtube.com",
  "youtube.com",
  "youtu.be",
  "twitter.com",
]);

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
  // eleventyConfig.addPlugin(embedYoutube);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["auto"],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  // eleventyConfig.ignores.add("src/sol/**/*");

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
