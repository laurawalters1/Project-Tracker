
const { Schema, model } = require("mongoose");

const moment = require("moment");

const projectSchema = new Schema(
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


const Project = model("Project", projectSchema);

module.exports = Project;
