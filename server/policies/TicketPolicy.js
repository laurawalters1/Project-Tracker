const Permission = require("../models/Permission");

class TicketPolicy {
	constructor(contributor) {
		this.model = contributor.role.permissions.findOne({
			model: Ticket,
		});
	}

	view = () => {
		return this.model.view;
	};

	create = () => {
		return this.model.create;
	};

	update = () => {
		return this.model.update;
	};

	delete = () => {
		return this.model.delete;
	};
}
