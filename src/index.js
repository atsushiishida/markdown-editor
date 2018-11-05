import marked from "marked";
import React from "react";
import ReactDOM from "react-dom";

const root_el = document.getElementById("root");
const input_el = document.getElementById("input");

input_el.addEventListener("keyup", function() {
  let input_text = input_el.value;
  let html_formatted = marked(input_text);
  ReactDOM.render(<MDPreview text_html={html_formatted} />, root_el);
});

class MDPreview extends React.Component {
  render() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: this.props.text_html
        }}
      />
    );
  }
}
