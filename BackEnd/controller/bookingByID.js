const BookingModel = require("../models/court");

const bookingByIDController = async (req, res) => {
  try {
    const booking = await BookingModelModel.findById(req.params.bookingID);
    if (!booking) {
      res.status(200).json({ message: "This Booking is Not found " });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

module.exports = bookingByIDController;
