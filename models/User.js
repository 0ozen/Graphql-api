const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type:String,
			required: true,
		},
		password: {
			type: String,
			required: true,
      select: false,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [
				/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
				"provide a valid email address",
			],
		},
		displayName: {
			type: String,
			required: true,
      unique: true
		},
	},
	{
		timestamps: true,
    versionKey: false,
	}
);

module.exports = model("User",userSchema);
