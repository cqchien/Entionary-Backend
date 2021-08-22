const httpStatus = require('http-status');
const userModel = require('../../models/user.model');
const Exception = require('../../utils/exception');
/**
 * Create a new user
 * @param {Object} { name, avatar, email, password, role }
 * @returns Promise<userModel>
 */
const createUser = async ({
  name, avatar, email, password, role,
}) => {
  const user = await userModel.findOne({ email });
  if (user) {
    throw new Exception(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const newUser = await userModel.create({
    name,
    avatar,
    email,
    password,
    role,
  });

  return newUser;
};

module.exports = createUser;
