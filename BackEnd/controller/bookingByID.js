const BookingModel = require("../models/booking.js");
const CourtTimeModel = require("../models/courtTime.js");

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
    // TODO: check time to delete booking

    // get booking id
    const booking = await BookingModel.findById(req.params.id);

    //delete booking
    const deleteBooking = await BookingModel.findByIdAndDelete(booking._id);

    if (!deleteBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // get courtTimeID from booking and set isBooked == false
    await CourtTimeModel.findOneAndUpdate(
      { _id: booking.courtTime },
      { $set: { isBooked: false } }
    );

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
