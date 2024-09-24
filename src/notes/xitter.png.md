---
publish: true
date: 2024-09-24
---
Hi there! The new site's up, standing on its three (mostly finished) and one (slightly wobbly) leg. I'll continue working on it and share what I've learned along the way. Enough with intros and [disclaimers](<../Disclaimer>). This site is [the Snail of Theseus](<../the Snail of Theseus>) after all. Let's goooooooo!

## What's xitter.png

xitter.png is a small tool I use to embed tweets privately. By *privately* I mean that none of the reader data is shared with the ~~social network~~ ad platform. 

Think of it as a one-way mirror. You can see the doomsday gremlins, but the gremlins can't see you.

## Why xitter.png

I don't like Twitter. The reasons are many. The specific one I'm tackling here is this: 

> I don't see why, when you open my site, Twitter should be notified of that fact, alongside a chain of 3rd party cookies used later to tell you to buy shit you don't need (which is achieved by finding way to make you angry).

## How it works

### Short version

Replace Twitter embed widgets with screenshots of embeds and a link to the tweet. Tweets/screenshots are generated on my machine when the content is published.

### Slightly longer version

The code is pretty rudimentary ([MISS – Make It Stupid, Simple](<../MISS – Make It Stupid, Simple>)). Here's the [source](https://github.com/paprikka/xitter.png/blob/main/main.js).

1. Embed tweets in Obisidian using regular links:
   `![X](https://twitter.com/pfree05/status/1709956985586581620)`
2. use a markdown-it plugin to transform images pointing to twitter.com as `http://<xitter.url>?<tweet id>`
3. when an image is downloaded during build, xitter.png
	1. starts a web browser
	2. loads the shared tweet
	3. takes a screenshot of the tweet
	4. returns an image
4. a screenshot of the tweet is saved in cache and added to the output

### Limitations

Works well, locally or at a small scale.  I don't expect it to work hosted from an EC2 instance and used by hundreds of people, due to bot/scraping prevention tools used by Twitter.  

## How I made it

I wrote the scaffolding with 2-3 Claude Sonnet 3.5 prompts. Then I fixed the nicely polished gibberish using a paste made of my prefrontal cortex and basic programming skills.

Reason: using puppeteer for screenshots and web scraping is quite common plus, those scripts tend to be repetitive, I already had the structure of the script in my head. This is one of the (few in 2024) cases, where LLMs speed up work.

## Why I made it

I don't share tweets that often. I probably could've just manually copy-pasted the screenshots into my notes.

- I needed a break from another task. My thought sponge was tired and I felt like I wasn't moving in any direction.
- I needed a quick snack to give me a sense of progress
- Even if only one person reads this and adds something similar to their site, that's still a win
- Having to manually add screenshots to a page doesn't take much time but I'm easily distracted
- I bought shoelaces in Shoreditch once and the seller asked if I could give them my email address. 

## What I've learned (or want to remind myself of)

[express.js](https://expressjs.com) is (still) amazing. It's simple, intuitive, stable, it doesn't get in your way. [Express is the CSS of web frameworks](<../Express is the CSS of web frameworks>). 

I tend to judge myself when I don't stick with a task, when I feel stuck. Judgement is not a good way of looking at this as it's unproductive and distracting: sometimes I need more focus, sometimes I need to take a break and clear my head, and finally – sometimes I need to distract myself with another task so I can feel that I'm moving, feel more hungry, curious. What works better: figuring out why I'm stuck, why I feel that way. Then I can move on and act.

[Hummingbirds are Evil!](https://sonnet.io/posts/hummingbirds/)

