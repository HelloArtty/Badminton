const { Schema, model } = require("mongoose");

const courtSchema = new Schema(
  {
    courtname: {
      type: String,
      require: true,
    },
    timeslot: {
      type: String,
      require: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { Timestamp: true }
);

const Court = model("Court", courtSchema);
module.exports = Court;
