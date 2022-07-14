const { Schema, model } = require("mongoose");

const moment = require("moment");

const contributorSchema = new Schema(
	{
		role: {
			type: Schema.Types.ObjectId,
			ref: "Role",
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

const Contributor = model("Contributor", contributorSchema);

module.exports = Contributor;
