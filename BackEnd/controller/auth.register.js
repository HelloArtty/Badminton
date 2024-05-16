const { Request, Response } = require("express");
const jwt = require("jsonwebtoken");

const { hashPassword } = require("../utils/PasswordManagement");
const { createCookies } = require("../utils/CookiesManagement");
const UserModel = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new UserModel({
      username,
      password: await hashPassword(password),
      email,
    });
    await user.save();

    const payload = await createCookies({ UserID: user._id });

    res.cookie("token", payload, { httpOnly: true });
    res.status(200).send({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log("Error on registerController -> ", error.message);
    res.status(400).send({
      message: error.message,
    });
  }
};

module.exports = registerController;
