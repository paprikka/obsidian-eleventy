import { test, expect } from "vitest";
import { slugifyPath } from "./slugify.js";

test.each([
  ["../some path.md", "../some-path/"],
  ["../some other path/foo bar.md", "../some-other-path/foo-bar/"],
  [
    "../folder%20name/path%20with%20escaped%20chars.md",
    "../folder-name/path-with-escaped-chars/",
  ],
  ["../111/", "../111/"],
])("slugifyPath(%s) => %s", (input, expected) => {
  expect(slugifyPath(input)).toBe(expected);
});
