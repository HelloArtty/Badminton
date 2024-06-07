const CourtTimeModel = require("../models/courtTime");

const getCourtAll = async (req, res) => {
  try {
    const court = await CourtTimeModel.find({})
      .populate("court")
      .populate("time");
    if (!court) {
      res.status(200).json({ message: "Not found any Courts" });
    }
    res.status(200).json(court);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

const getCourtFree = async (req, res) => {
  try {
    const court = await CourtTimeModel.find({ isBooked: false })
      .populate("court")
      .populate("time");
    if (!court) {
      res.status(200).json({ message: "No Courts available" });
    }
    res.status(200).json(court);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

module.exports = { getCourtAll, getCourtFree };
