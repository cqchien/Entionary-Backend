const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');
const Exception = require('../../utils/exception');

/**
 * Login with email and password
 * @param {object} {email, password}
 * @returns user
 */
const loginWithEmail = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Exception(httpStatus.UNAUTHORIZED, 'Incorrect Email or Password');
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    throw new Exception(httpStatus.UNAUTHORIZED, 'Incorrect Email or Password');
  }
  return user;
};

module.exports = loginWithEmail;
