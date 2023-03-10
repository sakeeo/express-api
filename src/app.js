const express = require("express");
const app = express();
require("dotenv").config();
// const port = process.env.PORT;
// const usersRouters = require("./routers/users");
const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const { getAllUsers } = require("./controllers/users");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
  }
  type Query {
    users: [User]
  }
`;

async () => {
  const data = getAllUsers();
  console.log(data);
};

const resolvers = () => {
  Query: {
    users: async () => await getAllUsers();
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// app.use("/users", usersRouters);
// app.get("/", (req, res) => {
//   res.json({ message: "ok" });
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
