const crypto = require("crypto");
const User = require("../db/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Quote = require("../db/models/Quotes");

const resolvers = {
  Query: {
    user: async (parent, args, context, info) => await User.findById(args.id),
    users: async () => await User.find({}),
    quotes: async () => await Quote.find({}),
    iquote: async (parent, args, context, info) => {
      console.log(args.by);
      return await Quote.find({ by: args.by });
    },
    myprofile: async (parent, args, { id }, info) => {
      if (!id) throw new Error("Please login first to access profile");
      return await User.findById(id);
    },
  },

  User: {
    id: async (parent, args, context, info) => {
      return parent.id;
    },
    quotes: async (parent, args, context, info) =>
      await Quote.find({ by: parent.id }),
  },

  Mutation: {
    signUp: async (parent, { user }, context, info) => {
      const oldUser = await User.findOne({ email: user.email });
      if (oldUser) {
        throw new Error("Account is already exist with this email");
      }

      const hashedPassword = bcrypt.hashSync(user.password);

      const newUser = await User.create({ ...user, password: hashedPassword });

      return newUser;
    },

    login: async (parent, { user }, context, info) => {
      console.log(user.email);
      const existUser = await User.findOne({ email: user.email });

      if (!existUser) {
        throw new Error("Account not found with this email");
      }
      const matchPassword = bcrypt.compareSync(
        user.password,
        existUser.password
      );

      if (!matchPassword) {
        throw new Error("Password incorrect");
      }

      const token = jwt.sign({ id: existUser.id }, "MYSECRET", {
        expiresIn: "7 days",
      });

      return { token };
    },

    createQuote: async (parent, { title }, { id }, info) => {
      if (!id) {
        throw new Error("You must have to login");
      }

      const user = await User.findById(id);
      const { email, name } = user;

      const quote = await Quote.create({
        title,
        by: id,
        email,
        name,
      });
      return quote;
    },
  },
};

module.exports = resolvers;
