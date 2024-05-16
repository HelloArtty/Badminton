const { Schema, model } = require("mongoose");

const User = require("./user");
const Court = require("./court");

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

const Booking = model("User", bookingSchema);
module.exports = Booking;
