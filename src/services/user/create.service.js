const userModel = require('../../models/user.model');

const createUser = async (body) => {
  const { email } = body;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error();
  }

  return userModel.create(body);
};

module.exports = createUser;
