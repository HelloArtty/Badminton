const CourtTimeModel = require("../models/courtTime");

const courtByID = async (req, res) => {
  try {
    const court = await CourtTimeModel.findById(req.params.id)
      .populate("court")
      .populate("time");
    if (!court) {
      res.status(200).json({ message: "Not found Court at this timeslot" });
    }
    res.status(200).json(court);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error or Object ID not found" });
    console.log(error.message);
  }
};

module.exports = { courtByID };
