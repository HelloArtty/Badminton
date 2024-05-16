const { Request, Response, NextFunction } = require("express");

const validateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const isLogin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      return res.status(401).json({ message: "You are already logged in" });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = validateToken;
module.exports = isLogin;
