const { Schema, model } = require("mongoose");

const CourtTime = require("./courtTime");
const User = require("./user");

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courtTime: {
      type: Schema.Types.ObjectId,
      ref: "CourtTime",
    },
  },
  { Timestamp: true }
);

const Booking = model("Booking", bookingSchema);
module.exports = Booking;
