const {
	GraphQLString,
	GraphQLObjectType,
	GraphQLList,
	GraphQLID,
} = require("graphql");
const User = require("../models/User");
const Post = require("../models/Post");
const { userType, postType } = require("./typedef");

const hello = {
	type: GraphQLString,
	description: "GraphQLString type?",
	resolve: () => "resolve hello",
};

const allUsers = {
	type: new GraphQLList(userType),
	description: "all users",
	resolve: () => {
		return User.find();
	},
};

const user = {
	type: userType,
	description: "get an user",
	args: {
		displayName: { type: GraphQLString },
	},
	resolve: (_, args) => {
		return User.findOne({ displayName: args.displayName });
	},
};

const posts = {
	type: new GraphQLList(postType),
	description: "get all posts",
	resolve: () => Post.find(),
};

const post = {
	type: postType,
	description: "get a post",
	args: {
		id: { type: GraphQLID },
	},
	resolve: (_, args) => Post.findById(args.id),
};

module.exports = { hello, allUsers, user, posts, post };
