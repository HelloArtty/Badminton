const { Request, Response, NextFunction } = require("express");
const { decodeToken } = require("../utils/CookiesManagement");
const { decode } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("==== Token not found ====");
      next();
      //return res.status(401).json({ message: "Token not found" });
    }

    decode = decodeToken(token);
    const user = UserModel.findById(decode.UserID);

    console.log("User : " + user);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("User Found in Token!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = validateToken;
