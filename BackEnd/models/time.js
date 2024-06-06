const { Schema, model } = require("mongoose");

const timeSchema = new Schema({
  timeslot: {
    type: String,
    require: true,
  },
});

const Time = model("Time", timeSchema);
module.exports = Time;
