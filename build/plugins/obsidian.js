import { load } from "cheerio";
import { promises as fs } from "fs";
import path from "path";
import { postprocess } from "./postprocess.js";
import { projectRootDir } from "./get-root.js";
import {
  getAnchorIdForLink,
  getHeaderIdFromEl,
  normalizeLocalLinkHref,
} from "../anchor-ids.js";

export function ObsidianImportPlugin(eleventyConfig, options) {
  // TODO: this should be done in markdown, move
  eleventyConfig.addTransform(
    "processRegularEmbeds",
    async function (content, outputPath) {
      // Only process HTML files
      if (!outputPath || !outputPath.endsWith(".html")) {
        return content;
      }

      const $ = load(content);

      $("video").wrap($('<p class="embed embed--video"/>'));
      return $.root().html();
    },
  );

  eleventyConfig.addTransform("updateInternalLinks", (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html")) return content;

    const $ = load(content);
    $("article :is(h1, h2, h3, h4, h5, h6)").each((_, el) => {
      const $el = $(el);
      const idFormatted = getHeaderIdFromEl($el);
      $el.attr("id", idFormatted);
      $('<a class="headline-anchor"/>')
        .attr("href", `#${idFormatted}`)
        .attr("aria-hidden", "true")
        .attr("tabindex", "-1")
        .prependTo($el);
    });

    // $('article a[href^="#"]').each((_, el) => {
    //   const $el = $(el);
    //   const href = $el.attr("href");
    //   const hrefFormatted = normalizeLocalLinkHref(href);
    //   $el.attr("href", hrefFormatted);
    // });

    return $.root().html();
  });

  eleventyConfig.addTransform("updateExternalLinks", (content, outputPath) => {
    // Only process HTML files
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    const $ = load(content);

    $('a[href^="http"]')
      .attr("target", "_blank")
      .attr("rel", "noopener noreferrer");

    return $.root().html();
  });
  // TODO: move to the obsidian import script and use markdown-it
  // markdown-it would:
  // find the correct link-marker token (or what it replaced)
  // traverse the AST to find the associated element
  // append the correct classes and targets to that element.
  // this is slower but still will work so no rush, pal

  eleventyConfig.addTransform("inlineLinks", (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html")) return content;

    const $ = load(content);

    $(".link-marker").each((_, el) => {
      const $el = $(el);
      const $targetEl = $el.parent().prev();
      $targetEl.append($el);
    });

    return $.root().html();
  });
  // Process broken links
  eleventyConfig.on(
    "eleventy.after",
    async ({ dir, results, _runMode, _outputMode }) => {
      const resultsMap = Object.fromEntries(results.map((r) => [r.url, r]));

      await Promise.all(
        results.map(async (r) => {
          const newContent = await postprocess(r, resultsMap);
          r.content = newContent;
          fs.writeFile(path.join(projectRootDir, r.outputPath), newContent);
        }),
      );
      console.log(`Processed broken links in ${dir}`);
    },
  );
}
