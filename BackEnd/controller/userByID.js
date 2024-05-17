const UserModel = require("../models/user");

const userByIDController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      res.status(200).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error or Object ID not found" });
    console.log(error.message);
  }
};

module.exports = userByIDController;
