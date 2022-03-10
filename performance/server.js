const express = require("express");
// const cluster = require("cluster");
// const os = require("os");

const PORT = 5000;

const app = express();

const delay = (time) => {
  const startTime = Date.now();
  while (Date.now() - startTime < time) {}
};

app.get("/", (req, res) => {
  res.send(`Hey there, your PId is ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(4000);
  res.send(`Beep, your PId is ${process.pid}`);
});

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});

// if (cluster.isMaster) {
//   console.log("Master Process");

//   const cores = os.cpus().length;
//   for (let i = 0; i < cores; i++) cluster.fork();
// } else {
//   console.log("Worker Process");
//   app.listen(PORT, () => {
//     console.log(`Listening at port: ${PORT}`);
//   });
// }
