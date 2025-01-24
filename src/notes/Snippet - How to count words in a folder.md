---
publish: true
date: 2024-11-20
---
(naive, but good *enough*!)

```bash
total_words=0
folder=./*
for file in $folder; do
  if [ -f "$file" ](<../ -f "$file" >); then
    words=$(wc -w < "$file")
    total_words=$((total_words + words))
  fi
done
echo $total_words
```