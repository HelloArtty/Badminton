const BookingModel = require("../models/booking.js");

const getBookingAll = async (req, res) => {
  try {
    const booking = await BookingModel.find({});
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

const postBookingAll = async (req, res) => {
  try {
    const { courtID } = req.body;

    const token = req.cookies.token;
    const decoded = jwt.decode(token);

    const userID = decoded.UserID;
    const booking = new BookingModel({
      userID,
      courtID,
    });

    await booking.save();
    res.status(201).send("Post created successfully!");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

// const getBookingQueueByCourtID = async (req, res) => {}
// const getBookingByUserID = async (req, res) => {}

module.exports = { getBookingAll, postBookingAll };
