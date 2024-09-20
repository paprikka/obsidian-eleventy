---
cover: https://res.cloudinary.com/dlve3inen/image/upload/v1706640253/card-talk-to-the-blog_qxxztt.png
publish: true
date: 2024-01-30
tags:
  - untested-article
---
![](head-tree-cat.webp)

*I'm expecting the next few weeks to get a bit more busy, so I'll be posting shorter, TIL posts and dev notes ([Share your unfinished, scrappy work](<../Share your unfinished, scrappy work>)).*

## What is it

It's a tiny Jupyter notebook that allows you to talk to my articles on Sonnet.io. Most of its code is based on the official Langchain docs.

You can find the source [here](https://github.com/paprikka/talk-to-blog/blob/main/rag.ipynb) (no collab link yet, sorry!)

You can easily customise it to work with your own site. Just update the first two cells in the ***Load*** section:

```python
import requests
from bs4 import BeautifulSoup

url = "http://sonnet.io/blog" # 👈
# ...
loader = WebBaseLoader(
    web_paths=urls,
    bs_kwargs=dict(
        parse_only=bs4.SoupStrainer(
            class_=("post__content", "post__title") # 👈 🐐
        )
    ),
)
```
*Tangent: the kitchen utensil related metaphors in BeautifulSoup bring me back to the early 2010s where every python/ruby/js lib seemed to be named after something I could munch on. Whatever I'll build next, it'll have kimchi.*


## How it works

We're using RAG ([Retrieval-augmented Generation](<../RAG>)). RAG is a technique used to give language models access to more recent data without the need for training.

[Embed](<../RAG>){data-embed data-target="#Example"}

## Initial results

The initial results were much better than I expected and they seem to have kept some of the original style of my writing. This will become useful later, but for now I'd like to keep those shorter so I'll probably update the base prompt down the line.

> Q: Why write tests?
> A: Tests are important because they reduce cognitive load, improve communication with peers, and provide the ability to split complex problems into smaller, more manageable chunks. Additionally, tests make the intent behind the code more obvious and help create simpler and less abstract code. Ultimately, writing tests contributes to mental health and overall satisfaction in the work.

> Q: Why play?
> A: Playing serves a plethora of different purposes, including improving motor coordination, practice, bonding, managing stress, developing and improving cognitive skills, and reinforcing or organizing social structures. It is a universal behavior shared by humans and animals.

It's fairly easy to tell the LLM to bail if the question doesn't make much sense (just tell it do to so in the prompt). 

> Q: Why should I get a pet donkey?
> *A: I'm sorry, but I don't have enough information to answer your question about getting a pet donkey.*

## Why I am making this

I have a bunch of projects which will require RAG and I'd like to upload this to my short-term memory so I can iterate faster. This seems like a good exercise. 

### Expressive Writing

> “Give sorrow words; the grief that does not speak knits up the o-er wrought heart and bids it break.”
> ― William Shakespeare, Macbeth (but shamelessly pawned from Bessel van der Kolk)

I build tools focused improving our well-being ([Projects and apps I built for my own well-being](<../Projects and apps I built for my own well-being>), [Things to support my own well-being – a wishlist](<../Things to support my own well-being – a wishlist>)). Eventually I'd like to build a small, sustainable ([Kind software](<../Kind software>)) business focused on this category of problems. Whether it's python, Polish, Portuguese, or Persian — language can be used as a tool to achieve that.

Although talk therapy can have a limited impact on healing trauma, there's a strong body of research dating back to the mid-1980s which supports *writing* as a useful tool for confronting and process emotion.

I've been following the Expressive Writing exercise mentioned in one of the key-papers about the subject ([(PDF) Confronting a Traumatic Event. Toward an Understanding of Inhibition and Disease](https://www.researchgate.net/publication/19415586_Confronting_a_Traumatic_Event_Toward_an_Understanding_of_Inhibition_and_Disease)).

I'll talk more about this later, but in short: the exercise involves several writing sessions and an optional summary/review at the end. I will re-read and review my notes (10k words) and then funnel it via an offline LLM to:

- spot patterns in my speech
- interrogate my own thinking
- find emotionally loaded expressions

### Morning notes

I have ca. 1,000,000 words' worth of morning notes and I'd like to analyse them in the same way. This is more of a fun side project. If I can use play to better understand myself and the world around me, that's fantastic!


## Next steps

1. use Mistral7B or LLaMA2 to run inference locally
2. see if I can build embeddings for my notes locally on my M1 MBA
	1. I'd like to keep everything completely offline and use open models
		1. [Reasons to use open, offline LLMs](<../Reasons to use open, offline LLMs>)
3. if 2. is possible → can we turn it into a tool for more people?


I've been avoiding playing with RAG and Langchain because I felt like this a topic beaten to death, but it's so much fun, and the results are pretty impressive given how little work went into this on my part.

See you tomorrow!
