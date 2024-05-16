const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt); //return hashed password
};

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword); //return true or false
};

module.exports = hashPassword;
module.exports = comparePassword;
