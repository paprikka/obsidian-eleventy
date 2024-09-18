import slugifyOriginal from "slugify";
import path from "path";

export const slugify = (text) => {
  return slugifyOriginal(text, {
    replacement: "-",
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
  });
};

export const slugifyPath = (pathString) => {
  const pathTrimmed = pathString.replace(/\.md$/, "").replace(/^\.\./, "");
  const pathParts = pathTrimmed.split("/");
  const pathPartsSlugified = pathParts
    .map((part) => decodeURIComponent(part))
    .map((part) => slugify(part));

  const joined = path.join("..", ...pathPartsSlugified);
  return joined.endsWith("/") ? joined : `${joined}/`;
};

export const slugifyPermalink = (filePathStem) => {
  const pathTrimmed = filePathStem.replace(/\.md$/, "").replace(/^\.\./, "");
  const pathParts = pathTrimmed.split("/");
  const pathPartsSlugified = pathParts
    .map((part) => decodeURIComponent(part))
    .map((part) => slugify(part));

  const joined = path.join("/", ...pathPartsSlugified);
  return joined.endsWith("/") ? joined : `${joined}/`;
};
