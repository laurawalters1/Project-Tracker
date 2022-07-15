const { Schema, model } = require("mongoose");

const moment = require("moment");

const permissionSchema = new Schema(
	{
		role: {
			type: Schema.Types.ObjectId,
			ref: "Role",
		},
		model: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		view: {
			type: int,
		},
		create: {
			type: Int,
		},
		update: {
			type: Int,
		},
		delete: {
			type: Int,
		},
		approve: {
			type: Int,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

const Permission = model("Permission", permissionSchema);

module.exports = Permission;
