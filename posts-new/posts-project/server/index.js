import http from "http";
import fs from "fs/promises";
import { API_URL } from "./constants.js";
const server = http.createServer((req, res) => {
  const paths = req.url.split("/");
  const lastPathName = paths.at(-1);
  if (
    (lastPathName === "comments" || lastPathName === "posts") &&
    req.url === `${API_URL}${lastPathName}`
  ) {
    fs.readFile(`./db/${lastPathName}.json`, "utf-8").then((data) => {
      res.end(data);
    });
  } else if (
    !isNaN(lastPathName) &&
    lastPathName !== "" &&
    (paths.at(-2) === "comments" || paths.at(-2) === "posts")
  ) {
    fs.readFile(`./db/${paths.at(-2)}.json`, "utf-8").then((data) => {
      const dataObj = JSON.parse(data);
      res.end(JSON.stringify(dataObj[lastPathName - 1]));
      res.end();
    });
  } else {
    res.end("invalid path name");
  }
});
server.listen(8000, () => {
  console.log("listening..");
});