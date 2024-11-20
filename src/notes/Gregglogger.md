---
publish: true
date: 2024-11-15
tags:
  - untested-article
cover: gregglogger-cover.png
---
![](gregglogger-cover.png)

A few weeks back I felt bored and somewhat nihilistic, so naturally I went where people go to when they want to scream into the void. This time the void didn't gaze back at me, but served me this:

![X](https://twitter.com/technology_greg/status/1844355677499859426)

[Programmers have a Pavlovian Engineering Response](<../Programmers have a Pavlovian Engineering Response>), so 20 minutes later with a bit of prompting I made Gregglogger, excuse: me *Gregglogger*✨. 

## What is Gregglogger

Gregglogger records every time you copy, cut or paste things on Mac. It also plays a recording of peeling scotch tape when you do that. 

Let me demonstrate this by helping three little ducklings cross the river and reunite with their mom: 

<video src='https://res.cloudinary.com/dlve3inen/video/upload/v1731678792/gregglogger-demo_uby31r.mp4' controls playsinline />

## Open™ and Kind™

Following the [File over app](https://stephango.com/file-over-app) philosophy, all data is stored in a proprietary but easy to parse [Greggfile (Wikipedia)](https://www.youtube.com/watch?v=rymwqxBkxus) , located by default under `~/how-many-times-did-I-press-CMD-C-or-V.gregg` .

I'm tired of walled gardens. I believe that all keyloggers should have easy and equal access to the same data ([and I am not alone](https://support.microsoft.com/en-us/windows/retrace-your-steps-with-recall-aa03f8a0-a78b-4b3e-b0a1-2eb8ac48701c)). So please if you're building one — go ahead and use ~~my~~ our Greggfile! 

### My body temperature has increased. Where do I get the Gregglogger?

You sound like a warm lead. Let me introduce you to this link: [\<a>link<\/a>](https://github.com/paprikka/gregglogger). 

Alternatively:

```bash
$ git clone git@github.com:paprikka/gregglogger.git && cd gregglogger
$ pip install -r requirements.txt
$ python gregglogger.py
```

## What I've learned 

(Let's be serious for a moment.)

There's something I don't think about very often: **writing simple keyloggers is surprisingly easy.**

1. This [code](https://github.com/paprikka/gregglogger/blob/main/gregglogger.py) is as boilerplate as it gets. Anyone with basic software engineering experience could write it in a few minutes.
2. Running this script in a terminal requires no additional user input, including permission requests.

This, coupled with the fact that MacOS comes with pre-installed python, means that with relative ease anyone could add this to their NPM packages, effectively covering everyone's computers with virtual scotch tape:

```json
{
  "name": "padleft",
  "version": "1.0.0",
  "description": "Pad left (or right, but never both)",
  "main": "index.js",
  "scripts": {
	// 👇🏼
    "postinstall": "pip install && python gregglogger.py"
	// 👆
  },
  "keywords": [
    "padleft",
    "padright",
    "pad",
    "padaria",
    "pastelaria"
  ]
}
```

*To be clear, none of these issues is purely Python or Node specific. These are just the languages I happened to used on that day and it was a rough day, so I'm going to pick on them.* 

### Limitations

This code will detect keyboard events at the OS level, but not when using protected inputs. Here's what happens when I update Gregglogger to record *any* keypress, but open a password input:

<video src='https://res.cloudinary.com/dlve3inen/video/upload/v1731678796/duck-password-gregglogger_hst9fi.mp4' controls playsinline />


As soon as the focus switches to a password input, we can intercept only the modifier keys. To my knowledge, this can be fixed by requesting the OS-level accessibility permissions, which would require a separate user interaction. 

## Next steps

- **Explore new product verticals and demographics.**  Include different sounds like:
	- squishy goo
	- lifting and dropping a slab of wet [meat](https://meat-gpt.sonnet.io)
	- every wet puppet from a Brian Yuzna movie (for those with a premium budget)
	- an angry middle-aged, chain smoking man yelling "son! put it down, NOW!" on `CMD+C` and whispering "...good..." in a way that somehow still makes you feel like a disappointment on `CMD+V`.
- **The amount of possible key combinations to track and monetise is (practically) infinite.** So is our growth potential. Upsell new key combinations using a DLC model.
- **The amount of productive time in a given day is limited.** Start with a limited number of copy-paste interactions per day. Goal: delight our users on a budget. 
- **Further delight** our users by ~~disabling copy-paste~~ boosting their available *Copy-Paste Credit* through interacting with sponsored content and exclusive deals from our verified partners.
- add AI ✨

Anyway, I pressed `CMD+C/V` a bit more than 70 times writing this note. This is a little bit surprising given that I use Vim bindings in my text editor.

Thanks for reading!

---

P.S. And thanks, [Greg](https://greg.technology), for giving me a reason to build something so beautifully useless and half-baked purely for fun! <span style='font-size: .4em;opacity:.4'>Think twice before you tweet next time.</span> 
