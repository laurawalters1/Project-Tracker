const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const path = require("path");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const app = express();
const PORT = process.env.PORT || 3001;
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});

const http = require("http");
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async (typeDefs, resolvers) => {
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });

	db.once("open", () => {
		server.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(
				`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`
			);
		});
	});
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
