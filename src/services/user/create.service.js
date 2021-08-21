const status = require('http-status');
const userModel = require('../../models/user.model');
const returnException = require('../dataTransfer/sendError');
/**
 * Create a new user
 * @param {Object} { name, avatar, email, password, role }
 * @returns Promise<userModel>
 */
const createUser = async (res, {
  name, avatar, email, password, role,
}) => {
  const user = await userModel.findOne({ email });
  if (user) {
    return {
      success: false,
      data: returnException(res, 'User exists', status.CONFLICT),
    };
  }

  const newUser = await userModel.create({
    name,
    avatar,
    email,
    password,
    role,
  });

  return {
    success: true,
    data: newUser,
  };
};

module.exports = createUser;
