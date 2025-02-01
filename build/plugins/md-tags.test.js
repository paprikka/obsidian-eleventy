import { test, expect, describe } from "vitest";
import MarkdownIt from "markdown-it";
import tagPlugin from "./md-tags.js";

describe("markdown-it tag plugin", () => {
  const md = new MarkdownIt({
    html: true, // Allow HTML tags in the output
  });
  md.use(tagPlugin);

  const testCases = [
    {
      name: "basic tag",
      input: "This is a #tag.",
      expected: '<p>This is a <span class="tag">tag</span>.</p>',
    },
    {
      name: "multiple tags",
      input: "Here are #multiple #tags",
      expected:
        '<p>Here are <span class="tag">multiple</span> <span class="tag">tags</span></p>',
    },
    {
      name: "hyphenated tag",
      input: "#kebab-case-tag",
      expected: '<p><span class="tag">kebab-case-tag</span></p>',
    },
    {
      name: "mixed case tag",
      input: "#CamelCase #lowercase #UPPERCASE",
      expected:
        '<p><span class="tag">CamelCase</span> <span class="tag">lowercase</span> <span class="tag">UPPERCASE</span></p>',
    },
    {
      name: "tag with numbers",
      input: "#tag123 #123tag",
      expected:
        '<p><span class="tag">tag123</span> <span class="tag">123tag</span></p>',
    },
    {
      name: "ignore tags in code blocks",
      input: "`#not-a-tag`",
      expected: "<p><code>#not-a-tag</code></p>",
    },
    {
      name: "ignore tags in links",
      input: "[Link with #tag](#anchor)",
      expected: '<p><a href="#anchor">Link with #tag</a></p>',
    },
    {
      name: "tag with punctuation",
      input: "#tag! #tag, #tag.",
      expected:
        '<p><span class="tag">tag</span>! <span class="tag">tag</span>, <span class="tag">tag</span>.</p>',
    },
    {
      name: "invalid tags",
      input: "#! #@ #tag/invalid #tag_underscore",
      expected: "<p>#! #@ #tag/invalid #tag_underscore</p>",
    },
    {
      name: "fenced code block",
      input: "```\n#not-a-tag\n```",
      expected: "<pre><code>#not-a-tag\n</code></pre>",
    },
  ];

  testCases.forEach(({ name, input, expected }) => {
    test(name, () => {
      const result = md.render(input.trim());
      expect(result.trim()).toBe(expected);
    });
  });
});
