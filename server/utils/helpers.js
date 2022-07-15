const TicketPolicy = require("../policies/contributor-policies/TicketPolicy");

function can(action, model, contributor) {
	switch (model) {
		case "Ticket":
			const policy = new TicketPolicy(contributor);
			return policy[action];
			break;

		default:
			break;
	}
}
