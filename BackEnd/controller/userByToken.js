const UserModel = require("../models/user");
const { decodeToken } = require("../utils/CookiesManagement");

const userByToken = async (req, res) => {
  try {
    // alredy validate token in middleware
    const token = req.cookies.token;
    const decoded = decodeToken(token);

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

module.exports = userByToken;
