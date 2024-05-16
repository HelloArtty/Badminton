const express = require("express");
const { registerController } = require("../controller/auth.register.js");

const router = express.Router();

router.post("/register", registerController);
