// const internals = require("./internals");

import { send } from "./request.mjs";
const { read } = require("./response.mjs");

const req = (url, data) => {
  send(url, data);
  return read();
};

const res = req("http://www.google.com", "hello");
console.log(res);
