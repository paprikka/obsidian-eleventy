import { test, expect, describe } from "vitest";
const rootPath = path.join(process.cwd(), "./build/test/fixtures");
import path from "path";
import {
  getResourceIndex,
  resolveLink,
  linkMatchesPath,
  resourcePathToLink,
} from "./resource-index";

// TODO: remove
const root = "/Users/raf/Developer/untested-11ty/build/test/fixtures/";
const folderTree = {
  "not-unique.md": [
    root + "folder/subfolder/not-unique.md",
    root + "not-unique.md",
  ],
  "unique-folder.md": [root + "folder/unique-folder.md"],
  "unique-root.md": [root + "unique-root.md"],
  "unique-root.png": [root + "unique-root.png"],
  "unique-subfolder.md": [root + "folder/subfolder/unique-subfolder.md"],
};

test("should return the raw file tree", () => {
  expect(getResourceIndex(rootPath)).toEqual(folderTree);
});

describe("resolveLink", () => {
  const cases = [
    ["unique-root.md", "does not exist.md", null],
    ["unique-root.md", "unique-root.md", "unique-root.md"],
    [
      "folder/subfolder/not-unique.md",
      "unique-root.md",
      "../../unique-root.md",
    ],
    ["unique-root.md", "unique-root.md#header", "unique-root.md"],
    [
      "folder/subfolder/not-unique.md",
      "unique-root.md#header",
      "../../unique-root.md",
    ],
  ];

  describe("[with .ext]", () => {
    test.each(cases)("%s → %s", (fromPath, linkText, expected) => {
      expect(resolveLink(root + fromPath, linkText, folderTree)).toBe(expected);
    });
  });

  describe("[no ext]", () => {
    test.each(cases)("%s → %s", (fromPath, linkText, expected) => {
      const linkTextNoExt = linkText.split(".").slice(0, -1).join("/");
      expect(
        resolveLink(root + fromPath, linkTextNoExt, folderTree, ".md"),
      ).toBe(expected);
    });
  });
});

describe("linkMatchesPath", () => {
  test.each([
    [
      "folder/subfolder/file.md",
      "broken.md",
      "folder/subfolder/file.md",
      false,
    ],
    [
      "folder/subfolder/file.md",
      "target.md",
      "folder/subfolder/target.md",
      true,
    ],
    ["folder/subfolder/file.md", ".", "folder/subfolder/file.md", true],
    ["folder/subfolder/file.md", "", "folder/subfolder/file.md", true],
    ["folder/subfolder/file.md", ".", "folder/subfolder/target.md", false],
    ["folder/subfolder/file.md", "", "folder/subfolder/target.md", false],
    ["folder/subfolder/file.md", "../../target.md", "target.md", true],
    ["folder/file.md", "../target.md", "target.md", true],
    ["folder/subfolder/file.md", "../target.md", "target.md", false],
  ])("%s → %s", (fromPath, linkText, candidatePath, expected) => {
    expect(
      linkMatchesPath(root + fromPath, root + candidatePath, linkText),
    ).toBe(expected);
  });
});

describe("resourcePathToLink", () => {
  test.each([
    ["foo.md", "foo"],
    ["foo", "foo"],
    ["foo.md#bar", "foo#bar"],
    ["foo.md#^baz", "foo#^baz"],

    ["a/b/c/foo.md", "a/b/c/foo"],
    ["a/b/c/foo", "a/b/c/foo"],
    ["a/b/c/foo.md#bar", "a/b/c/foo#bar"],
    ["a/b/c/foo.md#^baz", "a/b/c/foo#^baz"],
  ])("%s → %s", (resourcePath, expected) => {
    expect(resourcePathToLink(resourcePath)).toBe(expected);
  });
  // TODO: for now we're just stripping .md as that's the only extension we
  // use but this is a hack
  test.todo("handle edge cases, e.g. ext in the filename");
});
