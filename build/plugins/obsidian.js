import cheerio from "cheerio";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function ObsidianImportPlugin(eleventyConfig) {
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

  eleventyConfig.addTransform(
    "processNoteEmbeds",
    async function (content, outputPath) {
      // Only process HTML files
      if (!outputPath || !outputPath.endsWith(".html")) {
        return content;
      }
      const $ = cheerio.load(content);
      const sonnetEmbeds = $("sonnet-embed");

      if (sonnetEmbeds.length === 0) {
        return content;
      }

      console.log(`Found embeds in ${outputPath}`);
      try {
        await Promise.all(
          sonnetEmbeds.map(async (index, element) => {
            const $embed = $(element);
            const targetId = $embed.attr("data-target");
            const relativeFilePath = $embed.text().trim();
            const relativeFilePathNormalised = relativeFilePath
              .split(".")
              .slice(0, -1)
              .join(".");

            const absoluteFilePath = path.resolve(
              path.dirname(outputPath),
              "../",
              relativeFilePathNormalised,
              "index.html",
            );

            if (!absoluteFilePath) {
              console.warn(
                `Empty file path in <sonnet-embed> at index ${index}`,
              );
              return;
            }

            try {
              const fileContent = await fs.readFile(absoluteFilePath, "utf8");
              const $fileDOM = cheerio.load(fileContent);
              if (targetId) {
                const fragment = $fileDOM(targetId).parent();

                if (fragment) {
                  $embed.replaceWith($fileDOM(fragment).html());
                } else {
                  $embed.replaceWith("Missing fragment");
                }
              } else {
                $embed.replaceWith($fileDOM("article").html());
              }
              $embed.wrap("<blockquote>");
            } catch (err) {
              console.error(
                `Error reading file [${absoluteFilePath}]:\nMessage: ${err.message}`,
              );
              $embed.replaceWith(
                `<!-- Error loading ${absoluteFilePath}: ${err.message} -->`,
              );
            }
          }),
        );

        return $.html();
      } catch (err) {
        console.error(`Error processing sonnet embeds: ${err.message}`);
        return content;
      }
    },
  );
}
