const { Schema, model } = require("mongoose");
const Time = require("./time");

const courtSchema = new Schema({
  courtname: {
    type: String,
    require: true,
  },
  time_id: {
    type: Schema.Types.ObjectId,
    ref: "Time",
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const Court = model("Court", courtSchema);
module.exports = Court;
