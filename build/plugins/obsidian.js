import cheerio from "cheerio";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { postprocess } from "./postprocess.js";
import { projectRootDir } from "./get-root.js";

export function ObsidianImportPlugin(eleventyConfig, options) {
  const { fileIndex } = options;
  // TODO: this should be done in markdown, move
  eleventyConfig.addTransform(
    "processRegularEmbeds",
    async function (content, outputPath) {
      // Only process HTML files
      if (!outputPath || !outputPath.endsWith(".html")) {
        return content;
      }

      const $ = cheerio.load(content);

      $("video").wrap($('<p class="embed embed--video"/>'));
      return $.html();
    },
  );

  eleventyConfig.addTransform("updateExternalLinks", (content, outputPath) => {
    // Only process HTML files
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    const $ = cheerio.load(content);

    $('a[href^="http"]')
      .attr("target", "_blank")
      .attr("rel", "noopener noreferrer");

    return $.root().html();
  });

  // Process broken links
  eleventyConfig.on(
    "eleventy.after",
    async ({ dir, results, runMode, outputMode }) => {
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
