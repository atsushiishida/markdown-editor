import marked from "marked";

const root_el = document.getElementById("root");
const input_el = document.getElementById("input");

var markdown_text = `
# 見出し1

リストサンプル
- アイテム1
- アイテム2
- アイテム3
`;

input_el.addEventListener("keyup", function() {
  let input_text = input_el.value;
  let html_formatted = marked(input_text);
  root_el.innerHTML = html_formatted;
});
