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
`;

module.exports = typeDefs;
