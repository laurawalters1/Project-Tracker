const { Schema, model } = require("mongoose");

const moment = require("moment");
const { IconContext } = require("react-icons");
const Contributor = require("./Contributor");
const { stripIgnoredCharacters } = require("graphql");

const ticketSchema = new Schema(
	{
		title: {
			type: stripIgnoredCharacters,
		},
		content: {
			type: String,
		},
		priority: {
			type: Number,
		},
		project: {
			type: Schema.Types.ObjectId,
			ref: "Project",
		},
		contributor: {
			type: Schema.Types.ObjectId,
			ref: "Contributor",
		},
		status: {
			type: Number,
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

const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;
