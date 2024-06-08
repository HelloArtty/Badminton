const BookingModel = require("../models/booking.js");
const CourtTimeModel = require("../models/courtTime.js");
const TimeModel = require("../models/time.js");
const UserModel = require("../models/user.js");

const { sendCancelBookingEmail } = require("../utils/EmailManagement");

const getBookingByID = async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id)
      .populate("user")
      .populate({ path: "courtTime", populate: { path: "court time" } });

    if (!booking) {
      return res.status(200).json({ message: "This Booking is Not found " });
    }
    res.status(200).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error or Object ID not found" });
    console.log(error.message);
  }
};

const deleteBooking = async (req, res) => {
  try {
    // get booking id
    const booking = await BookingModel.findById(req.params.id)
      .populate("user")
      .populate({
        path: "courtTime",
        populate: { path: "court time" },
      });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // keep info as variables for send email
    const userEmail = booking.user.email;
    const username = booking.user.username;
    const court = booking.courtTime.court.courtname;
    const time = booking.courtTime.time.timeslot;
    const bookingAt = booking.createdAt.toLocaleString(); // Output: "6/8/2024, 7:06:33 PM"
    /*

    // Fetch the related courtTime document
    const courtTime = await CourtTimeModel.findById(booking.courtTime);
    const time = await TimeModel.findById(courtTime.time);
    // Extract the timeslot string from courtTime
    const timeslotString = time.timeslot;
    const [hours, minutes] = timeslotString.split(":").map(Number);

    const currentTime = new Date(); // Get the current time
    const timeslotDate = new Date().setHours(hours, minutes, 0, 0); // Create a Date object for the timeslot
    const timeDifference = (timeslotDate - currentTime) / 1000 / 60; // Difference in minutes

    // Check if the current time is within 30 minutes of the timeslot
    if (timeDifference <= 30) {
      return res.status(400).json({
        message:
          "Cannot delete booking within 30 minutes of the scheduled time",
      });
    }

    */

    //delete booking
    const deleteBooking = await BookingModel.findByIdAndDelete(booking._id);

    if (!deleteBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // update courtTime isBooked == false
    await CourtTimeModel.findOneAndUpdate(
      { _id: booking.courtTime },
      { $set: { isBooked: false } }
    );

    // update user isBook == false
    await UserModel.findOneAndUpdate(
      { _id: booking.user },
      { $set: { isBook: false } }
    );

    // Send cancellation booking  email
    sendCancelBookingEmail(userEmail, username, court, time, bookingAt);

    res.status(200).json({ message: "Your booking deleted successfully" });

    // delete booking
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error or Object ID not found" });
    console.log(error.message);
  }
};

module.exports = {
  getBookingByID,
  deleteBooking,
};
