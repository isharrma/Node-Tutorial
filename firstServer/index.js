const http = require("http");
const PORT = 3000;

const friends = [
  {
    id: 0,
    name: "Spade",
  },
  {
    id: 1,
    name: "Ace",
  },
];

const server = http.createServer((req, res) => {
  const items = req.url.split("/");
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("Request:", friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      //The + sign is typecasting string into number
      const frinedIndex = +items[2];
      res.end(JSON.stringify(friends[frinedIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("Hello");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listeing on port: ${PORT}`);
});
