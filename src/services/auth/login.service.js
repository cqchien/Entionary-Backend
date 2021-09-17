const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const Exception = require('../../utils/exception');
const getOneUserByEmailOrId = require('../user/getOne.service');

/**
 * Login with email and password
 * @param {object} {email, password}
 * @returns user
 */
const loginWithEmail = async ({ email, password }) => {
  const user = await getOneUserByEmailOrId({ email });
  if (!user) {
    throw new Exception(httpStatus.UNAUTHORIZED, 'Incorrect Email Or Password');
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    throw new Exception(httpStatus.UNAUTHORIZED, 'Incorrect Email Or Password');
  }
  return user;
};

module.exports = loginWithEmail;
