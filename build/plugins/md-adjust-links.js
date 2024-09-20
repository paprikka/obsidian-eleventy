import { slugifyPath } from "../slugify.js";
export function mdAdjustLinks(md) {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, _env, self) {
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
