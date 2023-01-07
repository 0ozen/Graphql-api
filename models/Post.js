const { GraphQLID } = require("graphql");
const { Schema, model } = require("mongoose");

const postSchema = new Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		author: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = model("Post", postSchema);
