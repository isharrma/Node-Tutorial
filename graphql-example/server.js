const express = require("express");
const path = require("path");

const { graphqlHTTP } = require("express-graphql");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const app = express();
const PORT = process.env.port || 5000;

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolvers = loadFilesSync(path.join(__dirname, "**/*resolvers.js"));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolvers,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}...`);
});
