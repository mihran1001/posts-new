import { Post } from "./Post.js";

export const Posts = (data, inputValue) => {
  const container = document.createElement("div");
  container.classList.add("posts-container");
  container.setAttribute("component-name", "posts");

  if (data.length) {
    const df = new DocumentFragment();

    data.forEach((post) => {
      df.appendChild(Post(post, inputValue));
    });

    container.appendChild(df);

    return container;
  }

  const template = document.querySelector("#no-data-found-template");
  const clone = template.content.cloneNode(true);

  return clone;
};
