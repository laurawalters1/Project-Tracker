const { Schema, model } = require("mongoose");

const moment = require("moment");

const projectSchema = new Schema(
	{
		contributors: [
			{
				type: Schema.Types.ObjectId,
				ref: "Contributor",
			},
		],
		Tickets: [
			{
				type: Schema.Types.ObjectId,
				ref: "Ticket",
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

const Project = model("Project", projectSchema);

module.exports = Project;
