const { Request, Response, NextFunction } = require("express");
const { decodeToken } = require("../utils/CookiesManagement");
const UserModel = require("../models/user");

const validateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("==== Token not found ====");
      next();
      // return res.status(401).json({ message: "Token not found" });
    }

    decoded = decodeToken(token);
    const user = UserModel.findById(decoded.UserID);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("User Found in Token!");
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = validateToken;
