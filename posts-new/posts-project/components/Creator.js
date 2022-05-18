export const Creator = (user) => {
  const container = document
    .querySelector("#creator-template")
    .content.cloneNode(true);
  const [name, surname] = user.name.split(" ");
  const firstLetters = `${name[0]}${surname[0]}`;

  container.querySelector("span").innerHTML = firstLetters;
  container.querySelector("p").innerHTML = user.name;
  return container;
};
