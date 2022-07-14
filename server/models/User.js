const { Schema, model } = require("mongoose");

const moment = require("moment");

const userSchema = new Schema(
	{
		contributions: {
			type: Schema.Types.ObjectId,
			ref: "Contributor",
		},
		teams: {
			type: Schema.Types.ObjectId,
			ref: "Team",
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

// function to return all of a users tickets
userSchema.virtual("tickets").get(function () {
	return this.contributions.reduce((contribution) => {
		return [...total, contribution.tickets];
	}, []);
});

const User = model("User", userSchema);

module.exports = User;
