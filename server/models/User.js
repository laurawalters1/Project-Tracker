const { Schema, model } = require("mongoose");
const { ProjectPolicy, TeamPolicy } = require("../policies/user-policies");

const moment = require("moment");

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		contributions: {
			type: Schema.Types.ObjectId,
			ref: "Contributor",
		},
		teams: {
			type: Schema.Types.ObjectId,
			ref: "Team",
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

// hash user password
userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

// Function to return user access permissions
userSchema.methods.can = (action, model, optional = {}) => {
	switch (model) {
		case "Team":
			const teamPolicy = new TeamPolicy(this);
			return teamPolicy[action]();
		case "Project":
			const projectPolicy = new ProjectPolicy(this);
			return projectPolicy[action](optional.project, this);
		default:
			break;
	}
};

// Function to return inverse user access permissions
userSchema.methods.cant = (action, model) => {
	switch (model) {
		case "Team":
			const teamPolicy = new TeamPolicy(this);
			return !teamPolicy[action]();
		case "Project":
			const projectPolicy = new ProjectPolicy(this);
			return !projectPolicy[action]();
		default:
			break;
	}
};

// function to return all of a users tickets
userSchema.virtual("tickets").get(function () {
	return this.contributions.reduce((contribution) => {
		total.concat(contribution.tickets);
		return total;
	}, []);
});

userSchema.virtual("completedTickets").get(function () {
	const tickets = this.tickets;
	const completedTickets = tickets.filter((ticket) => {
		return ticket.status === 1;
	});
	return completedTickets;
});

userSchema.virtual("notStartedTickets").get(function () {
	const tickets = this.tickets;
	const notStartedTickets = tickets.filter((ticket) => {
		return ticket.status === 0;
	});
	return notStartedTickets;
});

userSchema.virtual("inProgressTickets").get(function () {
	const tickets = this.tickets;
	const inProgressTickets = tickets.filter((ticket) => {
		return ticket.status === 2;
	});
	return inProgressTickets;
});

const User = model("User", userSchema);

module.exports = User;
