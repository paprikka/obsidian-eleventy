---
cover: https://res.cloudinary.com/dlve3inen/image/upload/v1717612937/cover-ai-tools_mft8eq.png
publish: true
date: 2024-06-05
tags:
  - untested-article
---
![161](black-snake.webp)


I don't like [starting my notes with disclaimers](<../Disclaimer>), so I'll keep this short. None of these tools replace decision making, so read this critically. This note is descriptive, not prescriptive. Having said that, I still did my best to keep it useful to you.

## [Perplexity](https://www.perplexity.ai)

### How I use it

- as a replacement for Google in tandem with [DuckDuckGo](https://duckduckgo.com/) (search by meanings, not words)
- following up on [Wikipedia Rabbit Holes](<../Wikipedia Rabbit Holes>) 
	- I start with Wikipedia, ask follow-up questions, pick the next rabbit hole and read the article itself  
- Stack Overflow replacement: example API usage, common bugs, pitfalls, workarounds <span id="^11117c" class="link-marker"></span>
- I still keep coming back to Github Issues or grep.app for example API usage and real world patterns

The main strength of perplexity for me are the inline references. I rarely trust LLM output verbatim, especially given how well [they trick our bullshit detectors](https://tidings.potato.horse/about).

## How often I use it

- several times per day

## Whisper notes (iOS)

Offline speech to text that can handle my accent. It's a paid, private app.

### How I use it

- create [fleeting](<../Fleeting Notes>), impromptu notes when I can't access the keyboard, e.g. when I'm walking back from the climbing gym or shopping
- I use it with GPT 4o before putting in Obsidian. The prompt goes roughly like this: *Clean up this transcript, remove grammatical mistakes and typos. Keep the original meaning. Split into paragraphs.*

## How often
 
- a couple of times per week

## Github Copilot

### How I use it

- as a smarter autocomplete that matches the existing code style and practices
- to generate boilerplate mocks and tests
- I almost never use it for anything more complex. It feels quite limited compared to GPT-4o and Claude Opus and I still don't like the developer experience. neovim is especially hard to configure properly, VSCode is doesn't get in my way too often, and Zed works really well (that's because it doesn't use Copilot, but the GPT API itself).

Writing this down made me realise how little utility I get from Github Copilot compared to large, conversational LLMs. If you know about a dumber, offline-first LLM I can use privately on a Apple Silicon – [let me know](mailto:hello@sonnet.io)! 

### How often

- several times per day 

## Chat GPT +

### How I use it
- **Code**
	-  [stack overflow replacement](<#^11117c>) but for more complex queries:
		- looking up documentation + code samples, example usage 
	- looking up and comparing different implementation patterns, e.g. this is an example `colander` schema, how can I implement a new schema following these TS type signatures: `...`.
	- learning new programming languages, e.g.:
		- *how can I implement this pattern `(TS example with Rx.js)` in `SwiftUI + Combine`*
		- *What are the main pitfalls when moving from JS to Python? Give me 5*.  
		- *Give me 3 most common patterns of handling async and their pros and cons.*
	- automate boring, repetitive work via bash scripts, examples:
		- one of my clients has a fairly elaborate process involving jumping between task tracking, Slack, GH PRs etc... I used to find this super distracting. So now, I just have a single *new-task.sh* file doing that for me. 
		- a script that checks my calendar and calculates billable hours
		- writing tmux, neovim, alacritty configs (i.e. the stuff that I don't need to keep in my working memory)
	- CLI documentation, e.g.:
		- `vv how to do X in ffmpeg?`
		- `vv how to create a new issue in GH CLI`
		- Note the `vv` prefix . My LLM is configured to reply with code only when it's present.
	- vim tutor
		- `vv replace every instance of foo with bar in neovim, where xxx`
- (via voice) wikipedia rabbit holes, creating *mini-podcasts* for myself where I can ask the LLM to, say, *give me a quick overview of the history of Nigeria* or explain the gotchas when moving from JS to Python.
- **Writing:**
	- looking up more idiomatic, common phrases (how would a native speaker say x?)
	- finding the word on the tip of my tongue (99% of it's *I FORGOT AGAIN, oh my god*)
		- edit: *inertia*, fuck! Why?
	- thesaurus, e.g. *what's the difference between flotsam and jetsam?*
	- **I never use it to generate longer pieces of text. I see it mostly as an editor I can ask questions about my work.**  Besides sharing, I enjoy *learning and thinking through writing*. I'm not worried that by handing over more of my work to LLMs I'll end up generating AI slop. I just don't see the point of taking away the pleasure.
- Quick translation, esp. when I want to find the most idiomatic way of saying something quickly, e.g. *Translate into <Brazilian|continental> Portuguese: Do you have fine-grade sandpaper?*. This is also useful because it helps me with:
- **Language learning:**
	- e.g. *conjugate 10 most common irregular verbs in continental Portuguese, later turn them into Anki flashcards, following this format `...`*
	- I'm looking forward to play with GPT-4o as a poor man's language tutor focussed on spoken language
- summarisation, mainly of academic papers so I can prioritise what to read first. I also use it to query papers, find alternative theories (w. sources), follow-up reading lists
	- Also, summarising and finding issues with Privacy Policies when I'm vetting a product
- manuals
- identify artwork, e.g. *This wood carving depicts a scene from Hindu mythology, identify it and describe under 100 words* (then follow up with Wikipedia)
- Movie recommendations based on samples

I use their desktop and mobile app.

The main strength of Chat GPT lies in its UX. Otherwise, I'd be happy to switch to Claude.

I also used their 3rd-party clients (like Machato) and even wrote a simple client for [Dall-e](https://sonnet.io/projects#:~:text=Dall%2De%20UI%20Cheap%20Bastard%20Edition%E2%84%A2) long time ago.

### How often

- several times per day

## Claude Opus (via the console)

### How I use it

- All of the coding related tasks mentioned with Chat GPT. Claude is much better in my experience, but the console UX is not as good as the Chat GPT native client.
	- I use it sometimes to generate brushes for [Fig](https://fig.sonnet.io) 

### How often

- rarely (several times per week until the Chat GPT 4o became available in the native client)

## ollama w. dolphin-mistral, LLaMa, LLaVa

### How I use it

- for anything mentioned above but *offline*
- for anything mentioned above but *without censorship*
	- LLMs often panic when I ask them to compare passages of text in different religious texts (e.g. Avesta and the Old Testament or Quran). Sorry, nothing naughty to see here.
- offline replacement for google, e.g. *who was Dante hanging out with at the beginning of Comedy?*
- little experiments like [Summarise My Weekly Notes (With Llamas)](<../Summarise My Weekly Notes (With Llamas)>)
	- Ilamafile is also pretty good. ollama is just there, always one `ollama run` away from running and testing a new model

### How often

- every few weeks, mainly during travel (I keep surprising myself how well it works)


## Summary

I use LLMs for *search*. It's search where I *control the shape of the input and the format of the output.*  <span id="^6ef7b9" class="link-marker"></span>

For instance, instead of going through the docs of `colander` (a python schema library), reading up problems and examples on SO, I can just ask it to provide me with sample implementations of a generalised version of a problem. This saves me a ton of time, but also means that I need to know what questions to ask, and how. None of this can replace reasoning, critical thinking and experience.

What I've learned and realised writing this:

- I underestimated how much convenience impacts my work. The main value of OpenAI products for me is convenience. This won't last long.
- I overestimated the usefulness of Copilot. I don't need it. I need a better, dumber, private autocomplete that can match my coding patterns. 
	- I just saved $10 per month! (is there an alternative, ideally an OSS project I can donate to instead of Github? [Let me know](mailto:hello@sonnet.io).)


That's all for today. See you tomorrow!
