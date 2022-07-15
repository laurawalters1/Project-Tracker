const Permission = require("../../models/Permission");

class ProjectPolicy {
	constructor(contributor) {
		this.model = contributor.role.permissions.findOne({
			model: "Project",
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
