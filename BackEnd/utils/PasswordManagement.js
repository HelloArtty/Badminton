const bcrypt = require("bcrypt");
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt); //return hashed password
}

// async function comparePassword(password, hashPassword) {
//   return await bcrypt.compare(password, hashPassword); //return true or false
// }

module.exports = hashPassword;
// module.exports = comparePassword;
