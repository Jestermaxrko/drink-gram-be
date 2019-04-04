
const bcrypt = require('bcrypt');

module.exports.hashData = async data => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
}
