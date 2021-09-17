const httpStatus = require('http-status');
const userModel = require('../../models/user.model');
const Exception = require('../../utils/exception');
/**
 * find a user which have id or email
 * @param {*} {id, email}
 * @returns user
 */
const getOneUserByEmailOrId = async ({ id, email }) => {
  const _id = id;
  const query = _id || email;
  const user = await userModel.findOne({ query });

  if (!user) {
    throw new Exception(httpStatus.NOT_FOUND, 'User Not Found');
  }
  return user;
};

module.exports = getOneUserByEmailOrId;
