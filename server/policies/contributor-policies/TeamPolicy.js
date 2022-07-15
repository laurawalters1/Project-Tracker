const Permission = require("../../models/Permission");

class TeamPolicy {
	// Need to add policy function for viewing a specific team
	constructor(contributor) {
		this.model = contributor.role.permissions.findOne({
			model: "Team",
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
