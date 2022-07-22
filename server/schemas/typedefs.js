const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		username: String!
		email: String!
		password: String!
	}

	type Response {
		response: String!
	}

	type Query {
		me: User
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): UserAuth
		loginUser(email: String!, password: String!): UserAuth
	}
`;

module.exports = typeDefs;
