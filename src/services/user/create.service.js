const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');
const Exception = require('../../utils/exception');
const { SALT } = require('../../constant/bcrypt');

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
    throw new Exception(httpStatus.CONFLICT, 'Email already taken');
  }

  const hashPassword = bcrypt.hashSync(password, SALT);
  const newUser = await userModel.create({
    name,
    avatar,
    email,
    password: hashPassword,
    role,
  });

  return newUser;
};

module.exports = createUser;
