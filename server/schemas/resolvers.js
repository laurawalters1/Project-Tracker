const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const { signToken } = require("../utils/auth");
const { isConstValueNode } = require("graphql");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			const user = await User.findOne();
			return user;
		},
	},

	Mutation: {
		//////////////////////////////////////
		//////////////SIGNUP///////////////////
		//////////////////////////////////////
		addUser: async (parent, args) => {
			const user = await User.create(args);
			// generate token
			const token = signToken(user);
			return { token, user };
		},

		//////////////////////////////////////
		//////////////LOGIN///////////////////
		//////////////////////////////////////

		loginUser: async (parent, { email, password }, context) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError("Email not found!");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect password!");
			}
			const token = signToken(user);

			return { token, user };
		},
	},
};

module.exports = resolvers;
