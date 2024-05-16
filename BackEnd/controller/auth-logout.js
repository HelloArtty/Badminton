const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Success" });
  } catch (error) {
    console.log("Error on logoutController -> ", error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = logoutController;
