---
cover: https://res.cloudinary.com/dlve3inen/image/upload/v1706208401/card-human-llama_tvtd8m.png
publish: true
date: 2024-01-25
tags:
  - untested-article
---
![163](human-llama.webp)

*<strong>human llama</strong> was the brand behind your favourite AAA titles such as "[Tommy the Toe](<../Tommy the Toe>) and the Chamber of Hostile Carpentry" and ["How to Run an All-hands Meeting"](https://rafsters.itch.io/all-hands)*

I wrote a quick script to summarise and process my [Stream of Consciousness Morning Notes](<../Stream of Consciousness Morning Notes>). You can find the repo [here](https://github.com/paprikka/review-notes-article-sample).

## Why

1. because a bunch of people ([Ensō](https://enso.sonnet.io) users and [Say Hi](<../Say Hi>) friends) are using LLMs with the Ensō output in a variety of interesting ways (more on that in another post)
2. because I believe that the open/offline models are they way to go
	1. for [many](https://locusmag.com/2023/12/commentary-cory-doctorow-what-kind-of-bubble-is-ai/) reasons (besides the obvious ethical implications)
3. because I wanted to play with [ollama](http://ollama.ai) and [llamafile](http://llamafile.ai)
4. because it seemed like a fun thing to do (and it was!)

Finally, every Monday morning I spend 20-30m to review my previous week ([New Week](<../New Week>)). During the review I like to sometimes skim through my daily notes to see if anything interesting (mood, language, tone changes) piques my attention.

None of this takes much time and I enjoy the process itself, but I thought it might be fun to spike a quick script and see I can find anything interesting to share with you.

## How it works

### Short version:

Read the most recent daily entries from my morning notes, summarise them, extract some key sections (e.g. [Beautiful Things](<../Beautiful Things>)) and collate everything into a markdown file.

#### 1\. Find the 7 most recent notes in my Obsidian vault:

```python
dir_path = "/Users/raf/Library/Mobile Documents/iCloud~md~obsidian/Documents/sol/Diary/"
files = [f for f in os.listdir(dir_path) if f.endswith(".md")]
# yyyy-mm-dd
sorted_files = sorted(files, reverse=True)[:7]
```

#### 2\. Summarise using ollama/llama2

ollama just released their [JS](https://github.com/ollama/ollama-js) and [Python](https://github.com/ollama/ollama-python) packages. At the time of writing this the JS has some [rough edges](https://github.com/ollama/ollama-js/issues/27), so I went with the Python version instead.

```python
def summarise_single_note(note_content):
    response = ollama.chat(
        model="llama2",
        messages=[
            {
                "role": "user",
                "content": f"""
        
        Summarise the note below under 100 words.
        Use markdown bullet points.
        Every bullet point is one sentence.
        
        Note:
        {note_content}
        """.strip(),
            },
        ],
    )

    return response["message"]["content"]

```

#### 3\. Extract "[Beautiful Things](<../Beautiful Things>)"

After a few years of writing my daily notes have developed a common [structure](<../Stream of Consciousness Morning Notes>). In short: they usually end with a TODO list for the day and a list of Beautiful Things I noticed. Normally, I'd just use a regular expression for this sort of work:

```python
def list_beautiful_things(note_content):
    response = ollama.chat(
        model="llama2",
        messages=[
            {
                "role": "user",
                "content": f"""
The note below contains a list of "Beautiful Things". 

== EXAMPLE_START ==
Beautiful things:

- Luna's amazing focaccia
- playing with the dog before dinner

== EXAMPLE_END ==

Extract the beautiful things from the note below. Do not introduce any new information. Do not include any text besides the list of beautiful things. Do not include the "Today:" list. 

        Note:
        {note_content}
        """.strip(),
            },
        ],
    )

    return response["message"]["content"]


```

4\. Save everything to a markdown file.
```python
note = list_beautiful_things(content)
with open(beautiful_things_path, "a") as result_file:
	result_file.write(note)
```




## TIL

### llamafile vs. ollama

I started my experiment by using `llamafile` and then moved to `ollama`. `llamafile` is a standalone executable containing model weights, and a simple web server with a chat GUI. It's cross-platform (thanks to [cosmopolitan libc](https://justine.lol/cosmopolitan/)) and super easy to set up:

1. download [the llamafile](https://huggingface.co/jartine/llava-v1.5-7B-GGUF/resolve/main/llava-v1.5-7b-q4.llamafile?download=true) (`llava` in this case)
2. `$ chmod +x name.llamafile`
3. `$ ./name.llamafile` (starts a server with chatbot GUI on localhost:8080)

I've been using since the the moment it came out. And, I'd use it for anything I wouldn't want to share with third-parties (i.e. most of my private writing). You can read more about `llamafile` on Simon Willison's [blog](https://simonwillison.net/2023/Nov/29/llamafile/) or in their official [README](https://github.com/Mozilla-Ocho/llamafile). 

The `llamafile` server opens up an API endpoint compatible with the OpenAI client, so you can talk to it via CURL or using the `openai` package. 

Here's the `llamafile` based version of `summarise_single_note`:

```python
def summarise_single_note(note_content):
    client = OpenAI(
        base_url="http://localhost:8080/v1",
        api_key="sk-no-key-required",
    )
    completion = client.chat.completions.create(
        model="LLaMA_CPP",
        messages=[
            {
                "role": "system",
				"content": "You are SummariserBot. You will ONLY respond with summaries of the messages send to you. Every summary will be a list of bullet points. Every bullet point will be one sentence. use markdown to format your messages.",
            },
            {
                "role": "user",
                "content": note_content,
            },
        ],
```

Now, I love the idea behind `llamafile` and find the tech itself feels magical: I mean, it's an executable LLM that you can run on Win/Linux/Mac with almost zero config! 
	
Why `ollama` then? You can think of ollama as the "iTunes of LLMs" — it's an app that manages and runs the LLMs on your local machine. It's also trivial to use and provides a decent, not too large, selection of models. I think that the latter point is their main value — it's easy to get overwhelmed when comparing LLMs.

I noticed that the `llamafile` models I had on my machine didn't perform as well as `llama2` I had installed via `ollama`. I attribute this mainly to my lack of experience, not the tool itself.

### llava vs llama2

LLaVA is a multi-modal LLM capable of handing image and text input. LLaMA2 is a text-only foundation LLM. [To my knowledge](https://github.com/haotian-liu/LLaVA/blob/main/docs/LLaVA_from_LLaMA2.md), LLaVA is based on LLaMA1, which might explain why it performed worse than LLaMA2 on my summarisation tasks.

I'm almost certain I could get both to work well enough by tweaking the prompts and inference settings.


## Next steps

The 2 use cases I have here are not that exciting, but now I have a sandbox to play with:

- detect commonly used phrases
- provide follow-up questions to notes
- rephrase my notes using a different language

Also:

- try different, larger models, tweak inference settings
- use RAG to ask questions about my notes

## Summary 

This is just a quick sketch made for fun, but you can get much better results by choosing the right model or just pre-processing the text before jumping into ML. LLMs work well as a "calculator for words" ([source](https://simonwillison.net/2023/Apr/2/calculator-for-words/)), and are decent at automating the boring stuff, but learning requires effort, so there's a limit to how much I'd like to offload to llama.


[New Week](<../New Week>)

Related: [Ollama releases Python and JavaScript Libraries | Hacker News](https://news.ycombinator.com/item?id=39125477)
