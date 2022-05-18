export const Input = (fn, value) => {
  const clone = document
    .querySelector("#search-template")
    .content.cloneNode(true);

  const inputElement = clone.querySelector(".search");
  inputElement.value = value;
  inputElement.addEventListener("input", fn);

  setTimeout(() => inputElement.focus(), 0);
  return clone;
};
