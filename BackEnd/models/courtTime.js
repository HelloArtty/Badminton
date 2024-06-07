const { Schema, model } = require("mongoose");
const Time = require("./time");
const Court = require("./court");

const courtTimeSchema = new Schema({
  court: {
    type: Schema.Types.ObjectId,
    ref: "Court",
  },
  time: {
    type: Schema.Types.ObjectId,
    ref: "Time",
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const CourtTime = model("CourtTime", courtTimeSchema);
module.exports = CourtTime;
