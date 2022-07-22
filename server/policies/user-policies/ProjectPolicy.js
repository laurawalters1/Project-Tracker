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

	contribute = (project, user) => {
		return (
			this.model.contribute &&
			user.contributions.map((con) => con.project).includes(project)
		);
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

module.exports = ProjectPolicy;
