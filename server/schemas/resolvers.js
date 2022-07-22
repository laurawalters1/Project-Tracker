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

		addTicket: async (
			parent,
			{ contributor, title, content, priority, project },
			context
		) => {
			const user = User.findById(context.user.id);
			if (user.cant("contribute", "Project", { project })) {
				// error
			}

			// ! Need to add extra check that checks the contributor passed in belongs to the user
			const contributor = Contributor.findOne({
				_id: contributor,
			});

			if (contributor.cant("create", "Ticket")) {
				// error
			}

			const ticket = new Ticket({
				title,
				content,
				priority,
				contributor,
				project,
			});
		},

		deleteTicket: async (parent, { contributor, ticket, project }, context) => {
			const user = User.findById(context.user.id);
			if (user.cant("contribute", "Project", { project })) {
				// error
			}
			// ! Need to add extra check that checks the contributor passed in belongs to the user

			const contributor = Contributor.findOne({
				_id: contributor,
			});

			if (contributor.cant("delete", "Ticket", ticket)) {
				// error
			}
		},
	},
};

module.exports = resolvers;
