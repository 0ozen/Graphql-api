const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { register, login, createPost,updatePost,deletePost } = require("./mutations");
const { hello, allUsers, user, posts , post} = require("./querys");

const queryType = new GraphQLObjectType({
	name: "QueryType",
	description: "root query typee?",
	fields: {
		hello,
		allUsers,
		user,
    posts,
    post
	},
});

const MutationType = new GraphQLObjectType({
	name: "mutations",
	description: "mutations",
	fields: {
		register,
		login,
		createPost,
    updatePost,
    deletePost
	},
});

const schema = new GraphQLSchema({
	query: queryType,
	mutation: MutationType,
});

module.exports = schema;
