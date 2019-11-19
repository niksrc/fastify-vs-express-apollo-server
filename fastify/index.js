const { ApolloServer } = require('apollo-server-fastify');
const { typeDefs, resolvers } = require('../schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = require('fastify')();

(async function () {
  app.register(server.createHandler());
  await app.listen(3000);
})();
