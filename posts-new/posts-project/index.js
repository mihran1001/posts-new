import { App } from "./components/App.js";

window.addEventListener("load", init);

function init() {
  const root = document.querySelector("#root");
  root.appendChild(App());
}
