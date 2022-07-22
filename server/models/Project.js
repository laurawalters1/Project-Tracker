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
		tickets: [
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

// function to return following count
projectSchema.virtual("progress").get(function () {
	const tickets = this.tickets;
	const ticketNum = tickets.length;
	const completedTickets = tickets.filter((ticket) => {
		return ticket.status === 1;
	});
	return (completedTickets.length / ticketNum) * 100;
});

projectSchema.virtual("completedTickets").get(function () {
	const tickets = this.tickets;
	const completedTickets = tickets.filter((ticket) => {
		return ticket.status === 1;
	});
	return completedTickets;
});

projectSchema.virtual("notStartedTickets").get(function () {
	const tickets = this.tickets;
	const notStartedTickets = tickets.filter((ticket) => {
		return ticket.status === 0;
	});
	return notStartedTickets;
});

projectSchema.virtual("inProgressTickets").get(function () {
	const tickets = this.tickets;
	const inProgressTickets = tickets.filter((ticket) => {
		return ticket.status === 2;
	});
	return inProgressTickets;
});

const Project = model("Project", projectSchema);

module.exports = Project;
