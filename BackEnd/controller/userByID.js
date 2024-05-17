const UserModel = require("../models/user");
const { decodeToken } = require("../utils/CookiesManagement");

const userByIDController = async (req, res) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      res.status(401).json({ message: "User Unauthorized" });
    }
    const decoded = decodeToken(token);
    if (!decoded) {
      res.status(401).json({ message: "User Unauthorized" });
    }

    const user = await UserModel.findById(decoded.UserID);
    if (!user) {
      res.status(200).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

module.exports = userByIDController;
