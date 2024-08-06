const fs = require("fs/promises");
const path = require("path");
const MarkdownIt = require("markdown-it");
const grayMatter = require("gray-matter");

const md = new MarkdownIt();
const filenames = `
  How to draw a Janusz.md
  111.md
  Visual Snapshot Tests, Cheap Bastard Edition™.md
  retrospective.png.md
  User Agent is becoming a User Identifier.md
  Projects and apps I built for my own well-being.md
  Instead or writing a comment, write a post and link it.md
  Dog mode.md
  Physical uncolouring book.md
  "I understand".md
  The modern Web has lost the User Agent.md
  Things to support my own well-being – a wishlist.md
  Kind software.md
  working definition.md
  Proteus.md
  Let people send me printed messages via the cat printer.md
  Chilli for Your Mom.md
  Mobile as a multi-tool not a peephole.md
  best Kebab on Old Street.md
  Everything is Alive.md
  Storienteer.md
  Demon Tamagotchis.md
  the holiest of all vegetables.md
  Be kind, be curious.md
  Sit., (together).md
  Cat Printer – tools and resources.md
  Brutally simple.md
  Nothing Twice.md
  TIL/weekly/40.md
  Journey.md
  2 cheesy existential metaphors.md
  Medieval Content Farm and Procedural Cheese.md
  untested-drafts.md
  This is not writing or productivity advice.md
  Stream of Consciousness Morning Notes.md
  beautifully weird.md
  TIL/weekly/41.md
  Doom-driven development.md
  Vercel, Svelte and Doom-Driven Development.md
  Alternatives to Adobe.md
  Natural Gradients in CSS.md
  Here's a List of Toys.md
  Why make toys, why play?.md
  TIL/weekly/42.md
  Sit., (together) devlog 001.md
  Proteus - Uncertainty is the only Certainty.md
  Zygmunt Bauman.md
  Obsidian for Vampires.md
  Sit., (together) devlog 002 – Space Kalimba.md
  TIL/weekly/43.md
  The Janusz I Live In.md
  Dogs and Palimpsests.md
  Night Rider.md
  Bless this Mess.md
  TIL/weekly/44.md
  Sit., part 2 – devlog 001.md
  Sit., (together) – why I'm happy with it.md
  Why I Didn't Study Computer Science.md
  Ursula K. Le Guin.md
  Spiritual Volleyball.md
  Leading or Line Height - a Measured Response.md
  Essentially.md
  TIL/weekly/45.md
  Muddle Your Way To Success.md
  Bird-knife.md
  Web and Feedback Loops.md
  Heart of Dorkness.md
  Share your unfinished, scrappy work.md
  Your time is the most valuable thing you have.md
  TIL/weekly/46.md
  MISS – Make It Stupid, Simple.md
  How to optimise images for Obsidian Publish.md
  How I Use Obsidian to Publish These Notes.md
  Kill your darlings, their bones are the best fertiliser.md
  Fleeting Notes.md
  Better note taking is not the problem, it's better thinking.md
  Abusing and reviewing Obsidian Publish.md
  Tools like Obsidian a true Web 1.0 platform.md
  TIL/weekly/47.md
  Say Hi Catalog.md
  Portuguese Orange, Persian Portugal.md
  Default Apps 2023.md
  Fermi Paradox (for 35-Year-Olds).md
  Communication is Action.md
  TIL/weekly/48.md
  Find Your Tribe.md
  What's a Peach?.md
  Auto-hibernate Subscriptions.md
  Work on my notes with the garage door up.md
  Midnight Ramen.md
  Wikipedia Rabbit Holes.md
  Shader Park is Kinda Neat.md
  Dark Mode - Articles.md
  TIL/weekly/49.md
  Sigmoid function.md
  Midnight Shader.md
  Building a private, clutter-free browser on top of Safari.md
  Shader Park and 2D.md
  Places to Find Indie Web Content.md
  Texas Friendship Massacre.md
  TIL/weekly/50.md
  My Now Page.md
  Project Cemetery.md
  My Bootleg T-shirts.md
  How I Make My Bootleg T-shirts.md
  Cacio e pepe with black garlic.md
  Patreon and Ownership.md
  Publishing tools (desktop → web, no-code).md
  Montaigne.md
  Sit. Offline Mode.md
  FAQs are a Dark Orange Flag.md
  Sleepy Safari.md
  Work With the Garage Door Up.md
  TIL/weekly/51.md
  Deadlines Bring Focus.md
  Why is it So Hard to Respond to Positive Comments.md
  How I Use Analytics With My Indie Projects.md
  Data Is the New Oil.md
  Say Hi.md
  Bootleg T-Shirts - December Batch.md
  TIL/weekly/52.md
  Zhoozh.md
  Orthographic Shorthand.md
  Asemic Writing.md
  TouchDesigner (and Mr Noto, the Talking Ball).md
  Done? Take Time to Appreciate and Reflect.md
  New Week.md
  Beautiful Things.md
  Summarise My Weekly Notes (With Llamas).md
  TIL/weekly/53.md
  Roland Topor Fidget Spinner.md
  Jeremy Bent-ham.md
  Talk to the Blog.md
  Reasons to use open, offline LLMs.md
  RAG.md
  Spikes.md
  Tip of the Tongue and Handmade Software.md
  Future of Coding.md
  Ad Space Bodies.md
  Wernicke's Area.md
  Wernicke's Aphasia.md
  Brocas's Aphasia.md
  Broca's Area.md
  Parahippocampal Gyrus.md
  Types of Memory.md
  TIL/weekly/54.md
  Using Writing to Process Your Emotions.md
  Expressive Writing.md
  3-3-3 Rule for Rescue Dogs.md
  HCD.md
  XP.md
  2-2-2 Project Scoping Technique.md
  TIL/weekly/55.md
  Aye-aye.md
  First Fig Digression.md
  Fig.md
  Second Fig Digression.md
  Julia.md
  Rosie's Poem.md
  Fig Tree Brushes.md
  Things you can do when you don't rely on ads.md
  Things I can do online instead of doomscrolling.md
  Screenshot Saturday.md
  Sharing more often -- toolbox.md
  Two Minute Week.md
  56.md
  Max Bittker.md
  Sandboxes, Games, and Play.md
  TIL/weekly/57.md
  Defaults Matter, Don't Assume Consent.md
  TIL/weekly/58.md
  Stories Help Us Learn, Teach and Remember.md
  Rafałku.md
  Overscroll, behave..md
  Disclaimer.md
  LLM-powered Tools I'm Actually Using.md
  Transient notes are like fuel.md
  TIL/weekly/59.md
  Half-ass it.md
  Make.md
  Adventures of the Bun-man.md
  Just Some Innocent Gradient Fun.md
  Wislawa Szymborska.md
  Just Some Innocent Gradient Fun/SVG filter quirks.md
  TIL/weekly/60.md
  112.md
  index.md`
  .split("\n")
  .map((_) => _.trim())
  .filter(Boolean)
  .map((_) => `vault/${_}`);

const result = [];
const missing = [];
const updated = new Set();
filenames.forEach(async (filename) => {
  const filePath = path.join(__dirname, filename);
  console.log(`Processing ${filePath}`);
  let content = "";
  try {
    content = await fs.readFile(filePath, "utf8");
  } catch (error) {
    missing.push(filename);
  }

  const tokens = md.parse(content, {});

  tokens.forEach((token) => {
    if (token.type === "inline" && token.children) {
      token.children.forEach((child) => {
        if (child.type === "image" && child.attrs) {
          const src = child.attrs.find((attr) => attr[0] === "src")[1];
          if (src.startsWith("https://www.potato.horse/_next/image?url")) {
            updated.add(filename);
            const alt = child.content || "";
            child.type = "html_inline";
            child.content = `<img src="${src}" alt="${alt}" />`;
            child.children = null;
          }
        }
      });
    }
  });

  const updatedContent = md.renderer.render(tokens, md.options, {});
  result.push({ filename, content: updatedContent });
});

// Output or further process 'result' as needed
result.forEach(({ filename, content }) => {
  console.log(`Updated content for ${filename}:\n`, content);
});

console.log({ missing });
console.log({ updated: [...updated] });
