import slugifyOriginal from "slugify";
import path from "path";

type SlugifyOptions = {
  replacement: string;
  lower: boolean;
  strict: boolean;
  locale: string;
  trim: boolean;
};

export const slugify = (text: string): string => {
  if (text === "..") return text;
  return slugifyOriginal(text, {
    replacement: "-",
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
  });
};

export const slugifyPath = (pathString: string): string => {
  const pathTrimmed = pathString.replace(/\.md$/, "").replace(/^\.\./, "");
  const pathParts = pathTrimmed.split("/");
  const pathPartsSlugified = pathParts
    .map((part) => decodeURIComponent(part))
    .map((part) => slugify(part));

  const joined = path.join("..", ...pathPartsSlugified);
  return joined.endsWith("/") ? joined : `${joined}/`;
};

export const slugifyPermalink = (filePathStem: string): string => {
  const pathTrimmed = filePathStem.replace(/\.md$/, "").replace(/^\.\./, "");
  const pathParts = pathTrimmed.split("/");
  const pathPartsSlugified = pathParts
    .map((part) => decodeURIComponent(part))
    .map((part) => slugify(part));

  const joined = path.join("/", ...pathPartsSlugified);
  return joined.endsWith("/") ? joined : `${joined}/`;
};
