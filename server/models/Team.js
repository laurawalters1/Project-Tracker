
const { Schema, model } = require("mongoose");

const moment = require("moment");

const teamSchema = new Schema(
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


const Team = model("Team", teamSchema);

module.exports = Team;
