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
      type: Number,
    },
    create: {
      type: Number,
    },
    update: {
      type: Number,
    },
    delete: {
      type: Number,
    },
    approve: {
      type: Number,
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
