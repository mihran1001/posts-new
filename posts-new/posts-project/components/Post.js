import { Creator } from "./Creator.js";

export const Post = ({ title, body, creator: user }, inputValue) => {
  const clone = document
    .querySelector("#post-template")
    .content.cloneNode(true);

  clone.querySelector(".title").innerHTML = title.replaceAll(
    inputValue,
    `<mark>${inputValue}</mark>`
  );

  clone.querySelector("p").innerHTML = body;
  clone
    .querySelector(".post")
    .prepend(Creator(user))
    .setAttribute("userId", `${user.id}`);
  return clone;
};
