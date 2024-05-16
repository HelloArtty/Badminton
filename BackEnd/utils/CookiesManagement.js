const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

function createCookies(user_id) {
  return jwt.sign(user_id, String(process.env.secret_jwt), {
    algorithm: "HS256",
  });
}

function decodeToken(token) {
  return jwt.verify(token, String(process.env.secret_jwt));
}

module.exports = { createCookies, decodeToken };
