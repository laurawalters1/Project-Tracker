
const { Schema, model } = require("mongoose");

const moment = require("moment");

const notificationSchema = new Schema(
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


const Notification = model("Notification", notificationSchema);

module.exports = Notification;
