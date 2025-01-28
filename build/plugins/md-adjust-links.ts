import { slugifyPath } from "../slugify.ts";
import type { MarkdownItRule, MarkdownItRenderer } from "../types/markdown-it-plugin.ts";
import type MarkdownIt from "markdown-it";
import type Token from "../types/markdown-it-token.ts";

export function mdAdjustLinks(md: MarkdownIt & MarkdownItRenderer): void {
  const defaultRender: MarkdownItRule =
    md.renderer.rules.link_open ||
    function (
      tokens: Token[],
      idx: number,
      options: MarkdownIt.Options,
      _env: any,
      self: any
    ) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    self: any
  ) {
    const hrefIndex = tokens[idx].attrIndex("href");
    if (hrefIndex >= 0) {
      const href = tokens[idx].attrs?.[hrefIndex]?.[1];
      if (href?.startsWith("../")) {
        tokens[idx].attrs![hrefIndex][1] = slugifyPath(href);
      }
    }
    return defaultRender(tokens, idx, options, env, self);
  };
}
