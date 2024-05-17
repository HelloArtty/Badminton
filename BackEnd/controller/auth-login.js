const { comparePassword } = require("../utils/PasswordManagement");
const { createCookies } = require("../utils/CookiesManagement");
const UserModel = require("../models/user");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const payload = createCookies({ UserID: user._id });

    res.cookie("token", payload, { httpOnly: true });
    res.status(200).json({ message: "Login Success" });
  } catch (error) {
    console.log("Error on loginController -> ", error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = loginController;
