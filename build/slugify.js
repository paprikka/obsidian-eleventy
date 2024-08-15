import slugifyOriginal from "slugify";

export const slugify = (text) => {
  return slugifyOriginal(text, {
    replacement: "-",
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
  });
};
