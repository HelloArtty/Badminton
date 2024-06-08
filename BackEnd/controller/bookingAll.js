const BookingModel = require("../models/booking.js");
const CourtTimeModel = require("../models/courtTime.js");
const UserModel = require("../models/user.js");
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

    if (!courtTimeQuery) {
      return res.status(404).json({ message: "Court time not found" });
    }

    const courtTimeID = courtTimeQuery._id;
    if (courtTimeQuery.isBooked) {
      return res
        .status(400)
        .json({ message: "This court time is already booked" });
    }

    // TODO:Check if the court time is already passed

    //get userID from token
    const decoded = decodeToken(req.cookies.token);
    const userID = decoded.UserID;

    // check if user book qouta is avilable
    const userQuery = await UserModel.findById(userID);
    if (!userQuery) {
      return res.status(404).json({ message: "User not found in token" });
    }
    if (userQuery.isBook) {
      return res.status(400).json({ message: "User can book only 1 court" });
    }

    const booking = new BookingModel({
      user: userID,
      courtTime: courtTimeID,
    });

    await booking.save(); // done add new booking

    // Update isBooked in courtTime
    await CourtTimeModel.findOneAndUpdate(
      { _id: courtTimeID },
      { $set: { isBooked: true } }
    );

    // Update isBook in user
    await UserModel.findOneAndUpdate(
      { _id: userID },
      { $set: { isBook: true } }
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
    // const decoded = decodeToken(req.cookies.token);
    // const userID = decoded.UserID;

    //get userID from params
    const booking = await BookingModel.find({ user: req.params.id })
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
