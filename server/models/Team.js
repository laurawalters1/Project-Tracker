const { Schema, model } = require("mongoose");

const moment = require("moment");

const teamSchema = new Schema(
	{
		projects: [
			{
				type: Schema.Types.ObjectId,
				ref: "Project",
			},
		],
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
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

const Team = model("Team", teamSchema);

module.exports = Team;
