const { ApolloServer } = require('apollo-server-fastify');
const { typeDefs, resolvers } = require('../schema');
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

const app = require('fastify')();

(async function () {
  app.register(server.createHandler());
  await app.listen(3000);
})();
