const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [Quote]
    user(id: ID!): User
    iquote(by: ID!): [Quote]
    myprofile: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    quotes: [Quote]
  }

  type Quote {
    title: String!
    by: ID!
    name: String!
    email: String!
  }

  type Token {
    token: String
  }

  type Mutation {
    signUp(user: userInput!): User
    login(user: loginInput!): Token
    createQuote(title: String!): Quote
  }

  input userInput {
    name: String!
    email: String!
    password: String!
  }

  input loginInput {
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
