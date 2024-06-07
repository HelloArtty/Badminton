const BookingModel = require("../models/booking.js");
const CourtTimeModel = require("../models/courtTime.js");
const { decodeToken } = require("../utils/CookiesManagement");

const getBookingAll = async (req, res) => {
  try {
    const booking = await BookingModel.find({})
      .populate("user")
      .populate({
        // populate the courtTime field inside the booking
        path: "courtTime",
        populate: { path: "court time" },
      });

    if (!booking) {
      res.status(200).json({ message: "This Booking is Not found " });
    }
    res.status(200).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error or Object ID not found" });
    console.log(error.message);
  }
};

const postBooking = async (req, res) => {
  try {
    const { courtID, timeID } = req.body;

    //get courtTimeID by search court and time
    courtTimeQuery = await CourtTimeModel.findOne({
      court: courtID,
      time: timeID,
    });

    // Check if courtTimeQuery is null or undefined
    if (!courtTimeQuery) {
      return res.status(404).json({ message: "Court time not found" });
    }

    const courtTimeID = courtTimeQuery._id;

    // Check if the court time is already booked
    if (courtTimeQuery.isBooked) {
      return res
        .status(400)
        .json({ message: "This court time is already booked" });
    }

    // TODO:Check if the court time is already passed

    //get userID from token
    const decoded = decodeToken(req.cookies.token);
    const userID = decoded.UserID;

    // TODO:check if user qouta is avilable

    const booking = new BookingModel({
      user: userID,
      courtTime: courtTimeID,
    });

    await booking.save();

    // Update isBooked in courtTime
    await CourtTimeModel.findOneAndUpdate(
      { _id: courtTimeID },
      { $set: { isBooked: true } }
    );

    res
      .status(201)
      .json({ message: "Post created successfully!", booking: booking });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

const getBookingByUserID = async (req, res) => {
  try {
    //get userID from token
    const decoded = decodeToken(req.cookies.token);
    const userID = decoded.UserID;

    const booking = await BookingModel.find({ user: userID })
      .populate("user")
      .populate({
        // populate the courtTime field inside the booking
        path: "courtTime",
        populate: { path: "court time" },
      });

    if (!booking) {
      res.status(200).json({ message: "This Booking is Not found " });
    }
    res.status(200).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error or Object ID not found" });
    console.log(error.message);
  }
};

module.exports = { getBookingAll, postBooking, getBookingByUserID };
