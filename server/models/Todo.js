const { Schema, model } = require("mongoose");

const moment = require("moment");

const todoSchema = new Schema(
	{
		content: {
			type: String,
		},
		priority: {
			type: Number,
		},
		status: {
			type: Number,
		},
		project: {
			type: Schema.Types.ObjectId,
			ref: "Project",
		},
		due: {
			type: Date,
		},
		assignees: [
			{
				type: Schema.Types.ObjectId,
				ref: "Contributor",
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

const Todo = model("Todo", todoSchema);

module.exports = Todo;
