require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");

const port = process.env.PORT || 4000;

const dburl =
  "mongodb+srv://sinbad:1025Sinbad1561@cluster0.q94ur.mongodb.net/gqltest?retryWrites=true&w=majority";

mongoose
  .connect(dburl)
  .then(console.log("DB connected"))
  .catch((error) => console.log(error.message));

const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { id } = jwt.verify(authorization, "MYSECRET");
    return { id };
  }
};

const createServer = async () => {
  const app = express();
  app.use(cors());
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  });

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  });

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log("Server is running at" + port);
  });
};

createServer();
