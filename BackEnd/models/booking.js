const { Schema, model } = require("mongoose");

const Court = require("./court");
const User = require("./user");

const bookingSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    court_id: {
      type: Schema.Types.ObjectId,
      ref: "Court",
    },
  },
  { Timestamp: true }
);

const Booking = model("Booking", bookingSchema);
module.exports = Booking;
