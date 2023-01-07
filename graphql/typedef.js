const { GraphQLObjectType, GraphQLString } = require("graphql");
const User = require("../models/User");

const userType = new GraphQLObjectType({
	name: "UserType",
	fields: {
		id: { type: GraphQLString },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		displayName: { type: GraphQLString },
	},
});

const postType = new GraphQLObjectType({
	name: "PostType",
	fields: {
		id: { type: GraphQLString },
		title: { type: GraphQLString },
		body: { type: GraphQLString },
		author: {
			type: userType,
			resolve(parent) {
				return User.findById(parent.author);
			},
		},
	},
});

module.exports = { userType, postType };
