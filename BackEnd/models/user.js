const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isBook: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default:
        "https://media1.tenor.com/m/ovWTVvG3VBwAAAAd/mr-fresh-mr-fresh-multiverse.gif",
    },
  },
  { Timestamp: true }
);

const User = model("User", userSchema);
module.exports = User;
