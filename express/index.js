const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("../schema");
const models = require("../models");
const redis = require("../lib/redis");
const modelEntries = Object.entries(models);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		return {
			models: modelEntries.reduce((acc, [model, initFn]) => {
				acc[model] = initFn({ store: { redis } });
				return acc;
			}, {})
		};
	}
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
