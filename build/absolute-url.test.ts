import { makeAbsoluteUrl } from "./absolute-url.js";
import { test, expect } from "vitest";

test("returns the original URL if already absolute", () => {
  const url = "https://potato.horse";
  const rootUrl = "https://example.com";

  expect(makeAbsoluteUrl(rootUrl)(url)).toBe(url);
});

test("returns the root URL if the URL is relative", () => {
  const url = "/hello";
  const rootUrl = "https://example.com";

  expect(makeAbsoluteUrl(rootUrl)(url)).toBe("https://example.com/hello");
});
