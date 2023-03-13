const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    username: String!
    email: String!
    password: String!
  }

  # Queries
  type Query {
    getAllUsers: [User!]!
    getByIdUser(id: ID!): User!
  }

  # Mutations
  type Mutation {
    createNewUser(
      id: ID
      username: String!
      email: String!
      password: String!
    ): User!

    updateUser(
      id: ID
      username: String!
      email: String!
      password: String!
    ): User!

    deleteUser(id: ID!): User!
  }
`;

module.exports = { typeDefs };
