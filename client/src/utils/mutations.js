import { gql } from "@apollo/client";

// TODO - add authentication token here

// sign up user
export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				username
				email
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			token
			user {
				username
			}
		}
	}
`;
