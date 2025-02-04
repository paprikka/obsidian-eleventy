---
publish: true
tit: kebab-case
date: '2025-02-03'
---
[best Kebab on Old Street](<../best Kebab on Old Street>)

{% raw %}
<button type="button" onclick="kebab()">kebab</button>
<script>
function kebab(){
 function toKebab(s){
  return s.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).join('-')
 }
 var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(n){
   if(n.parentNode && ['SCRIPT','STYLE'].includes(n.parentNode.tagName)) return NodeFilter.FILTER_SKIP
   return NodeFilter.FILTER_ACCEPT
  }
 }, false)
 var node; 
 while(node = walker.nextNode()){
  node.textContent = toKebab(node.textContent)
 }
};
</script>

{% endraw %}
