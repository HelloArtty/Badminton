const UserModel = require("../models/user");
const { hashPassword } = require("../utils/PasswordManagement");

const getUserByID = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error or Object ID not found" });
  }
};

const updateUserByID = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await UserModel.findByIdAndUpdate(req.params.id, {
      username: username,
      password: await hashPassword(password),
      //img
    });

    if (!result) {
      return res.status(400).send({
        message: "User Not Found",
      });
    }

    res.status(200).send({
      message: "User updated sucessfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error or Object ID not found" });
    console.log(error.message);
  }
};

module.exports = { getUserByID, updateUserByID };
