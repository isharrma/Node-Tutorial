const express = require("express");
const path = require("path");

const { ApolloServer } = require("apollo-server-express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const PORT = process.env.port || 5000;

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolvers = loadFilesSync(path.join(__dirname, "**/*resolvers.js"));

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolvers,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(`Listening at ${PORT}...`);
  });
}

startApolloServer();
