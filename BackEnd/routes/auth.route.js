const express = require("express");

const registerController = require("../controller/auth-register.js");
const loginController = require("../controller/auth-login.js");
const logoutController = require("../controller/auth-logout.js");
const validateToken = require("../middleware/auth.js");

const router = express.Router();

router.post("/register", validateToken, registerController);
router.post("/log-in", validateToken, loginController);
router.post("/log-out", logoutController);

module.exports = router;
