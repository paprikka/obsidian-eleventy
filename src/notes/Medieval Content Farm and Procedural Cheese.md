---
cover: https://images.ctfassets.net/hyylafu4fjks/4drq2gSGYr8INYte7bdiTh/f64a699f0d868f9152db63b6b63fb9fb/245491987_342644317634651_7224792750543159376_n_18064078861288800.jpg
publish: true
date: 2023-10-10
tags:
  - untested-article
---
[The Medieval Content](https://tidings.potato.horse) farm is a joke about crappy, AI-generated content. It's a rant I over-engineered to the point it became an autonomous generative publication powered by the very thing I was ranting about. You can read more about it [here](https://tidings.potato.horse/about). 

In this post we'll learn how the content farm works and finish with some AI/generative art lessons I picked up on the way. There will be another post focused on its design, illuminated manuscripts and CSS, as well as less AI-ey (eyayeee) technical bits.

### Here's how it works:

1\. Every morning I pull a list of article headlines from WSJ

2\. I delegate the stories between different authors. Those authors are AI-generated personas, medieval poets with different styles, thematic preferences, backgrounds and personal quirks. *Brother Arnulfus* is a dog-shaped Benedictine monk (totally) with(out) an alcohol problem, *Guillemette de Ventadour* is an Occitanian bard who loves animals, especially their most superior form: goats.

3\. Every author generates a poem based on the WSJ story, in their own style, following their own perspective.

4\. All poems are put together into the daily issue of the Medieval Content Farm.

### Here's how it's implemented:

1. Start a CRON scheduled Github Actions job.
2. Pull the headlines from WSJ RSS feed.
3. Wrap them into author-specific LLM prompts.
4. *Massage* the results so they fit the specific criteria: number of stanzas, verse lengths, etc... *Massage* sounds more pleasant, dare I say mysterious, than use *a for loop and a conditional statement*.
5. Save those into a "dumb database" JSON file.
6. Commit and deploy to Vercel.

And bam, the thing is so good it keeps writing itself!

### Some interesting things I learned when working on it:

The mantra of every procedurally generated project: Iterate, iterate, iterate. Just like with diffusion models, the output of an LLM will be always boring and predictable if you don't put effort in it. OK, I knew that, likely you know that too. But I had to repeat this so many times, I feel like this deserves to be here. **Meaning is not a commodity and creativity is not something that you can outsource.**


#### Et tu, Arnulfe?

**Bigger or "smarter" ≠ better when it comes to LLMs**, and I'm not talking about performance or cost. Your model responding to your prompts *too well* can be a problem too. For instance, switching to GPT-4 resulted in:

1. (generally) respecting the constraints such as number of stanzas, syllables per verse, rhyme patterns, themes, etc... 
2. Brother Arnufus abandoning the language of Chaucer and writing exclusively in Latin.

Granted, Latin seems historically more correct, but at the same time I wanted this thing to be cheesy. And now my cheese was replaced with gibberish in Latin (I checked). Speaking of cheese.

#### My dear dairy

**All cheese, including AI cheese is good.** Whatever crappy tool you use for your creative endeavours, use its limitations as your brush/chisel/you get the point. <span id="cba64c" class="link-marker">cba64c</span>

MeatGPT works (at least for those who don't message me asking about my mental state) because it uses the limitations of the current tech to its advantage. It's like poorly done taxidermy or a hedgehog-shaped Jesus.

![3525](taxidermy-cat.jpg)


When working on any generative project, embrace the cheese, have fun with it. It's more fun with AI of course, because of the amount of hype and expectations around it. AI tool catalogues are a big source of traffic for MeatGPT and real, human people with jobs and working thought-sponges asked me how I wanted to monetise Butter. Both projects are obviously jokes.

**Bias and lack of proper training data makes things boring.** I love Persian poetry so when it came to the Medieval Content Farm, I wanted to include some Iranian, Arab (broad, I know) and Indian artists as well as more women, but it was really hard to get results that are in any way interesting. I mean, I would love to add [Hildegard von Bingen](https://en.wikipedia.org/wiki/Hildegard_of_Bingen),  [Rabia Balkhi](https://en.wikipedia.org/wiki/Rabia_Balkhi) and [Gwerful Mechain](https://allpoetry.com/The-Female-Genitals) to my editorial team. (The last one is mildly nsfw.)

It's not my first generative project. Storienteer used procgen to create locations, scene entity properties and location names, but most of that was done using a seeded RNG and Markov Chains or noise in one form or another. Still, the amount of unrealistic expectations and hype, makes LLM generated art somewhat, sometimes, funny. 



[Illuminated Manuscripts and CSS](<../Illuminated Manuscripts and CSS>)
[What's a Manicula, Who stole my Breviary and What's up with those Murderous Rabbits?](<../What's a Manicula, Who stole my Breviary and What's up with those Murderous Rabbits?>)
