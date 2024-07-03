const bcrypt = require("bcryptjs");

const hashedPassword = (plainPassword) => {
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(plainPassword, salt);

  plainPassword = hash;
  return plainPassword;
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { hashedPassword, comparePassword };
