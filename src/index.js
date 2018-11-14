import marked from "marked";
import React from "react";
import ReactDOM from "react-dom";

const root_el = document.getElementById("root");
const input_el = document.getElementById("input");
const save_el = document.getElementById("save");
const load_el = document.getElementById("load");

const DB_NAME = "markdown_db";
const DB_VERSION = 1;

input_el.addEventListener("keyup", () => {
  let input_text = sanitize(input_el.value);
  let html_formatted = marked(input_text);
  ReactDOM.render(<MDPreview text_html={html_formatted} />, root_el);
});

save_el.addEventListener("click", () => {
  let data = input_el.value;
  save_idb(DB_NAME, DB_VERSION, data);
});

load_el.addEventListener("click", () => {
  let data = load_idb(DB_NAME, DB_VERSION, 1);
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

const sanitize = html => {
  return html.replace(/</g, "$lt;");
};

const save_idb = (db_name, db_version, data) => {
  let indexDBReq = indexedDB.open(db_name, db_version);
  indexDBReq.onupgradeneeded = event => {
    let db = event.target.result;
    let markdownStore = db.createObjectStore("markdown", { keyPath: "id_str" });
  };
  indexDBReq.onerror = event => {
    console.log("error");
  };
  indexDBReq.onsuccess = event => {
    let db = indexDBReq.result;

    let transaction = db.transaction(["markdown"], "readwrite");

    let markdownStore = transaction.objectStore("markdown");

    console.log("data:" + data);

    markdownStore.put({ id_str: "1", text: data });
  };
};

const load_idb = (db_name, db_version, key) => {
  let indexDBReq = indexedDB.open(db_name, db_version);
  indexDBReq.onupgradeneeded = event => {
    let db = event.target.result;
    let markdownStore = db.createObjectStore("markdown", { keyPath: "id_str" });
  };
  indexDBReq.onerror = event => {
    console.log("error");
  };
  indexDBReq.onsuccess = event => {
    let db = indexDBReq.result;
    let transaction = db.transaction(["markdown"], "readwrite");
    let markdownStore = transaction.objectStore("markdown");
    let request = markdownStore.get("1");

    request.onsuccess = event => {
      let data = request.result;
      console.log("out in func:" + data.text);
      input_el.value = data.text;
    };
  };
};
