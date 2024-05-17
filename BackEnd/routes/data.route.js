const express = require("express");

const userByTokenController = require("../controller/userByToken");
const userByIDController = require("../controller/userByID");

const courtByIDController = require("../controller/courtByID");
const courtAllController = require("../controller/courtAll");
const courtFreeController = require("../controller/courtFree");

const bookingByIDController = require("../controller/bookingByID");
const router = express.Router();

// User
router.get("/user-by-id/:id", userByIDController);
router.get("/user-by-token", userByTokenController);

// Court
router.get("/court-by-id/:id", courtByIDController);
router.get("/court-all", courtAllController);
router.get("/court-free", courtFreeController);

// Booking
router.get("/booking-by-id/:id", bookingByIDController);

module.exports = router;
