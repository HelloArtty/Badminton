const CourtModel = require("../models/court");

const courtByIDController = async (req, res) => {
  try {
    const court = await CourtModel.findById(req.params.courtID);
    if (!court) {
      res.status(200).json({ message: "Not found Court at this timeslot" });
    }
    res.status(200).json(court);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

module.exports = courtByIDController;
