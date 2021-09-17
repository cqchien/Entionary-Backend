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
  try {
    const user = await getOneUserByEmailOrId({ email });
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw Error();
    }
    return user;
  } catch (error) {
    throw new Exception(httpStatus.UNAUTHORIZED, 'Incorrect Email Or Password');
  }
};

module.exports = loginWithEmail;
