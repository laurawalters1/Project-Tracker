
const { Schema, model } = require("mongoose");

const moment = require("moment");

const userSchema = new Schema(
  {
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


const User = model("User", userSchema);

module.exports = User;
