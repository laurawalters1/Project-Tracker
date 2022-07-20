const { Schema, model } = require("mongoose");
const { TicketPolicy } = require("../policies/contributor-policies");

const moment = require("moment");

const contributorSchema = new Schema(
	{
		project: {
			type: Schema.Types.ObjectId,
			ref: "Project",
		},
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
		tickets: [
			{
				type: Schema.Types.ObjectId,
				ref: "Ticket",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

contributorSchema.methods.can = (action, model) => {
	switch (model) {
		case "Ticket":
			const ticketPolicy = new TicketPolicy(this);
			return ticketPolicy[action]();
		default:
			break;
	}
};

const Contributor = model("Contributor", contributorSchema);

module.exports = Contributor;
