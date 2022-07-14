
const { Schema, model } = require("mongoose");

const moment = require("moment");

const ticketSchema = new Schema(
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


const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;
