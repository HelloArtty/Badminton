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

// export const google = async (req, res, next) => {
//   try {
//     const user = await UserModel.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = user._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     } else {
//       const generatedPassword = Math.random().toString(36).slice(-8);
//       +Math.random().toString(36).slice(-8);
//       const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
//       const newUser = new UserModel({
//         username:
//           req.body.name.split("").join("").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         avatar: req.body.photo,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = newUser._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = loginController;
