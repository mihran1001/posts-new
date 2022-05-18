import { fetchData } from "../helpers.js";
import { Posts } from "./Posts.js";
import { Input } from "./Input.js";
import { BASE_URL } from "../constants.js";

export const App = () => {
  const state = {
    posts: [],
    filteredPosts: [],
    inputValue: "",
  };

  const filterPosts = (ev) => {
    const temp = state.posts.filter((item) => {
      return item.title.includes(ev.target.value);
    });

    state.inputValue = ev.target.value;
    setFilteredPosts(temp);
  };

  window.state = state;

  const container = document.createElement("div");
  container.classList.add("main-container");
  container.setAttribute("component-name", "App");

  const render = () => {
    container.innerHTML = "";
    container.append(Input(filterPosts, state.inputValue));
    container.append(
      Posts(
        state.inputValue ? state.filteredPosts : state.posts,
        state.inputValue
      )
    );
  };

  const setPosts = (posts) => {
    state.posts = posts;
    render();
  };

  const setFilteredPosts = (filtered) => {
    state.filteredPosts = filtered;
    render();
  };

  fetchData("/posts")
    .then((posts) => {
      state.posts = posts;
      const usersIds = Array.from(new Set(posts.map((post) => post.userId)));
      const promises = usersIds.map((userId) => fetchData(`users/${userId}`));

      return Promise.all(promises);
    })
    .then((users) => {
      const posts = state.posts.map((post) => {
        return {
          ...post,
          creator: users.find((user) => post.userId === user.id),
        };
      });
      setPosts(posts);
    });

  render();

  return container;
};
