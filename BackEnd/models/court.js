const { Schema, model } = require("mongoose");

const courtSchema = new Schema({
  courtname: {
    type: String,
    require: true,
  },
});

const Court = model("Court", courtSchema);
module.exports = Court;
