const express = require("express");

const validateToken = require("../middleware/auth");

const userByToken = require("../controller/userByToken");
const getUserByID = require("../controller/userByID");
const updateUserByID = require("../controller/userByID");

// const courtByIDController = require("../controller/courtByID");
// const courtAllController = require("../controller/courtAll");
// const courtFreeController = require("../controller/courtFree");

// const bookingByIDController = require("../controller/bookingByID");

const router = express.Router();

// User
router.get("/get-user-by-token", validateToken, userByToken);
router.get("/get-user/:id", getUserByID);
router.put("/update-user/:id", updateUserByID);

// // Court
// router.get("/court-by-id/:id", courtByIDController);
// router.get("/court-all", courtAllController);
// router.get("/court-free", courtFreeController);

// // Booking
// router.get("/booking-by-id/:id", bookingByIDController);

module.exports = router;
