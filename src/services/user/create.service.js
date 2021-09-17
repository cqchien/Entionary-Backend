const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const Exception = require('../../utils/exception');
const { SALT } = require('../../constant/bcrypt');
const userModel = require('../../models/user.model');
const getOneUserByEmailOrId = require('./getOne.service');

/**
 * Create a new user
 * @param {Object} { name, avatar, email, password, role }
 * @returns Promise<userModel>
 */
const createUser = async ({
  name, avatar, email, password, role,
}) => {
  try {
    await getOneUserByEmailOrId({ email });
  } catch (error) {
    throw new Exception(httpStatus.CONFLICT, 'Email Already Taken');
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
