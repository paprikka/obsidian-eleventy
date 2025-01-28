import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token";

type MarkdownItRule = (
  tokens: Token[],
  idx: number,
  options: MarkdownIt.Options,
  env: any,
  self: any
) => string;

type MarkdownItRenderRule = {
  rules: {
    [key: string]: MarkdownItRule | undefined;
  };
};

type MarkdownItRenderer = {
  renderer: MarkdownItRenderRule;
};

export type { MarkdownItRule, MarkdownItRenderer }; 