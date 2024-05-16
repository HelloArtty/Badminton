const { Request, Response } = require("express");
const { hashPassword } = require("../utils/PasswordManagement");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    password = await hashPassword(password);
    const user = new UserModel({
      username,
      password,
      email,
    });
    await user.save();

    const playload = jwt.sign(
      { UserID: user._id },
      String(process.env.secret_jwt),
      {
        algorithm: "HS256",
      }
    );

    res.cookie("token", playload, { httpOnly: true });
    res.status(200).send({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log("Error on registerController", error.message);
  }
};

module.exports = registerController;