const userModel = require('../../models/user.model');

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
    throw new Error();
  }

  return userModel.create({
    name, avatar, email, password, role,
  });
};

module.exports = createUser;
