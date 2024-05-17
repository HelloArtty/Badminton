const CourtModel = require("../models/court");

const courtFreeController = async (req, res) => {
  try {
    const court = await CourtModel.find({ isBooked: false });
    if (!court) {
      res.status(200).json({ message: "No Courts available" });
    }
    res.status(200).json(court);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

module.exports = courtFreeController;
