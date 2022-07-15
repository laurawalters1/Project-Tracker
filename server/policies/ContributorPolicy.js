const Permission = require("../models/Permission");

class ContributorPolicy {
	constructor(contributor) {
		this.model = contributor.role.permissions.findOne({
			model: "Contributor",
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
