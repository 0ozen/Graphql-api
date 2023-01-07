const { GraphQLString, GraphQLID } = require("graphql");
const User = require("../models/User");
const Post = require("../models/Post");
const createJWT = require("../utils/auth");
const { userType, postType } = require("./typedef");

const register = {
	type: GraphQLString,
	description: "Register a new user",
	args: {
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		displayName: { type: GraphQLString },
	},
	async resolve(_, args) {
		const newUser = await User.create({
			...args,
		});

		const token = createJWT({
			id: args._id,
			username: args.username,
			displayName: args.displayName,
		});

		return token;
	},
};

const login = {
	type: GraphQLString,
	description: "Login user",
	args: {
		email: { type: GraphQLString },
		password: { type: GraphQLString },
	},
	async resolve(_, args) {
		const { email, password } = args;
		const user = await User.findOne({ email }).select("password");

		const validPassword = password === user.password;

		if (!validPassword) throw new Error("Invalid Password");

		const token = createJWT({
			id: user._id,
			displayName: user.displayName,
			username: user.username,
		});

		return token;
	},
};

const createPost = {
	type: postType,
	description: "create a post",
	args: {
		title: { type: GraphQLString },
		body: { type: GraphQLString },
	},
	resolve(_, args, req) {
		if (!req.authorizedUser)
			throw new Error("You must be logged in to do that");

		const post = Post.create({
			title: args.title,
			body: args.body,
			author: req.authorizedUser,
		});

		return post;
	},
};

const updatePost = {
	type: postType,
	description: "update a post",
	args: {
		id: { type: GraphQLString },
		title: { type: GraphQLString },
		body: { type: GraphQLString },
	},
	async resolve(_, { id, title, body }, { authorizedUser }) {
		if (!authorizedUser) throw new Error("Unauthorized");

		const post = await Post.findById(id);

		if (!post) throw new Error("No post for given id");

		if (post.author === authorizedUser) {
			post.title = title;
			post.body = body;
		}

		await Post.updateOne({ _id: post._id }, post);

		return post;
	},
};

const deletePost = {
	type: GraphQLString,
	description: "delete a post",
	args: {
		id: { type: GraphQLID },
	},
	async resolve(_, { id }, { authorizedUser }) {
		if (!authorizedUser) throw new Error("Unauthorized");

		const postDeleted = await Post.findOneAndDelete({
			_id: id,
			author: authorizedUser,
		});

		if (!postDeleted) throw new Error("post not found");

		return "post deleted";
	},
};

module.exports = { register, login, createPost, updatePost, deletePost };
