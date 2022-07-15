const { Schema, model } = require("mongoose");

const moment = require("moment");
const { IconContext } = require("react-icons");
const Contributor = require("./Contributor");

const ticketSchema = new Schema(
	{
		project: {
			type: Schema.Types.ObjectId,
			ref: "Project",
		},
		contributor: {
			type: Schema.Types.ObjectId,
			ref: "Contributor",
		},
		status: {
			type: Int,
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
