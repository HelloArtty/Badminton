const express = require("express");
const registerController = require("../controller/auth.register.js");
const loginController = require("../controller/auth.login.js");

const router = express.Router();

router.post("/register", registerController);
router.post("/log-in", loginController);

module.exports = router;
