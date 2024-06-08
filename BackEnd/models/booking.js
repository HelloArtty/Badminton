const { Schema, model } = require("mongoose");

const CourtTime = require("./courtTime");
const User = require("./user");

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courtTime: {
      type: Schema.Types.ObjectId,
      ref: "CourtTime",
      required: true,
    },
  },
  { timestamps: true }
);
const Booking = model("Booking", bookingSchema);
module.exports = Booking;
