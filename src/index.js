const { ApolloServer } = require("apollo-server-express");
const express = require("express");

const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/Resolver");

const app = express();

async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
