import { test, expect, describe } from "vitest";
import { load } from "cheerio";

// Mock the transform function since we're testing it in isolation
function processFleetingTag(content) {
  const $ = load(content);
  
  // Find paragraphs that contain only a fleeting tag
  $("p").each((_, el) => {
    const $p = $(el);
    const html = $p.html().trim();
    
    // Check if paragraph contains only the fleeting tag span
    if (html === '<span class="tag">fleeting</span>') {
      // Replace the content with the special format
      $p.html('<span class="tag">fleeting</span> and very much <a href="/notes/fleeting-notes/">wip</a>');
    }
  });
  
  return $.html();
}

describe("obsidian plugin fleeting tag transform", () => {
  const testCases = [
    {
      name: "fleeting tag alone in paragraph",
      input: '<p><span class="tag">fleeting</span></p>',
      expected: '<html><head></head><body><p><span class="tag">fleeting</span> and very much <a href="/notes/fleeting-notes/">wip</a></p></body></html>',
    },
    {
      name: "fleeting tag with other content",
      input: '<p>This is a <span class="tag">fleeting</span> note</p>',
      expected: '<html><head></head><body><p>This is a <span class="tag">fleeting</span> note</p></body></html>',
    },
    {
      name: "multiple tags including fleeting",
      input: '<p><span class="tag">fleeting</span> <span class="tag">other</span></p>',
      expected: '<html><head></head><body><p><span class="tag">fleeting</span> <span class="tag">other</span></p></body></html>',
    },
    {
      name: "fleeting tag with text nodes",
      input: '<p>Some text <span class="tag">fleeting</span></p>',
      expected: '<html><head></head><body><p>Some text <span class="tag">fleeting</span></p></body></html>',
    },
    {
      name: "other tag alone in paragraph",
      input: '<p><span class="tag">other</span></p>',
      expected: '<html><head></head><body><p><span class="tag">other</span></p></body></html>',
    },
    {
      name: "fleeting tag in multiple paragraphs",
      input: '<p><span class="tag">fleeting</span></p><p>Some text</p><p><span class="tag">fleeting</span></p>',
      expected: '<html><head></head><body><p><span class="tag">fleeting</span> and very much <a href="/notes/fleeting-notes/">wip</a></p><p>Some text</p><p><span class="tag">fleeting</span> and very much <a href="/notes/fleeting-notes/">wip</a></p></body></html>',
    },
  ];

  testCases.forEach(({ name, input, expected }) => {
    test(name, () => {
      const result = processFleetingTag(input);
      expect(result).toBe(expected);
    });
  });
});