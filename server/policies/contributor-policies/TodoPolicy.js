const Todo = require("../../models/Todo");

class TodoPolicy {
	constructor(contributor) {
		this.model = contributor.role.permissions.findOne({
			model: "Todo",
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

module.exports = TodoPolicy;
