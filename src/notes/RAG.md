---
publish: true
---
a.k.a. Retrieval-augmented generation

Allow LLMs use data outside of their training set, by:

1. Querying a large dataset (e.g. a db) for information relevant to your query.
2. Including that information in the LLM prompt

## Example:

1. Load documents (websites, PDFs, .md files) <span id="^c7597f" class="link-marker"></span>
2. Create embeddings for the documents
3. Store them in a vector db (e.g. sqlite w. a vector extension or ChromaDB)
4. Find the closest documents in a vector db given the query
5. Pass those documents to the LLM prompt as context
6. Return the prompt result


## Related: [Quickstart | 🦜️🔗 Langchain](https://python.langchain.com/docs/use_cases/question_answering/quickstart)

[Deep learning](<../Learning/Deep learning>)
