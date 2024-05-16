const { Schema, model } = require("mongoose");

const courtSchema = new Schema(
  {
    courtname: {
      type: String,
      require: true,
    },
    isBooked: {
      type: Email,
      default: false,
    },
  },
  { Timestamp: true }
);

const Court = model("User", courtSchema);
module.exports = Court;
