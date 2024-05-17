const express = require("express");

const userByIDController = require("../controller/userByID");
const courtByIDController = require("../controller/courtByID");
const bookingByIDController = require("../controller/bookingByID");
const router = express.Router();

router.get("/user-by-id", userByIDController);
router.get("/court-by-id/:courtID", courtByIDController);
router.get("/booking-by-id/:bookingID", bookingByIDController);

module.exports = router;
