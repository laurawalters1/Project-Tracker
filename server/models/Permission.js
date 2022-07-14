const { Schema, model } = require("mongoose");

const moment = require("moment");

const permissionSchema = new Schema(
	{
		name: {
			type: String,
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

const Permission = model("Permission", permissionSchema);

module.exports = Permission;
