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
        "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
    },
  },
  { Timestamp: true }
);

const User = model("User", userSchema);
module.exports = User;
