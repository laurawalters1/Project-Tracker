const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const { signToken } = require("../utils/auth");
const { isConstValueNode } = require("graphql");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return { response: "hello" };
    },
  },
};

module.exports = resolvers;
