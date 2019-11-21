const { gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	type Query {
		items: [Item!]!
		item: Item,
		hello: String!
	}

	type Item {
		id: ID!
		name: String!
		message: String!
	}

	input ItemInput {
		name: String!
		message: String!
	}

	type Mutation {
		addItem(item: ItemInput): Item
		removeItem(id: ID!): Item
	}
`;

// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		hello: () => "Hello World",
		items: (rootVal, params, ctx) => ctx.models.item.list(params),
		item: (rootVal, { id }, ctx) => ctx.models.item.get({ id })
	},
	Mutation: {
		addItem: (rootVal, { item }, ctx) => ctx.models.item.add(item),
		removeItem: (rootVal, { id }, ctx) => ctx.models.item.remove(id)
	}
};

module.exports = {
	typeDefs,
	resolvers
};
