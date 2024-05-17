const CourtModel = require("../models/court");

const courtAllController = async (req, res) => {
  try {
    const court = await CourtModel.find({});
    if (!court) {
      res.status(200).json({ message: "Not found any Courts" });
    }
    res.status(200).json(court);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

module.exports = courtAllController;
