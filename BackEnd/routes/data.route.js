const express = require("express");

const validateToken = require("../middleware/auth");

const { userByToken } = require("../controller/userByToken");
const { getUserByID } = require("../controller/userByID");
const { updateUserByID } = require("../controller/userByID");

const { courtByID } = require("../controller/courtByID");
const { getCourtAll } = require("../controller/courtAll");
const { getCourtFree } = require("../controller/courtAll");

const { getBookingAll } = require("../controller/bookingAll");
const { postBooking } = require("../controller/bookingAll");
const { getBookingByUserID } = require("../controller/bookingAll");
const { getBookingByID } = require("../controller/bookingByID");
const { deleteBooking } = require("../controller/bookingByID");

const router = express.Router();

// User
router.get("/get-user-by-token", validateToken, userByToken);
router.get("/get-user/:id", getUserByID);
router.put("/update-user/:id", updateUserByID);

// Court
router.get("/court-by-id/:id", courtByID);
router.get("/court-all", getCourtAll);
router.get("/court-free", getCourtFree);

// Booking
router.get("/booking-all", getBookingAll);
router.get("/booking-by-user/:id", getBookingByUserID);
router.post("/add-booking", validateToken, postBooking);
router.get("/booking-by-id/:id", getBookingByID);
router.delete("/delete-booking/:id", deleteBooking);

module.exports = router;
