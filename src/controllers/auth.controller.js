const createUser = require('../services/user/create.service');
const generateAuthToken = require('../services/token/generateAuth.service');
const returnSuccess = require('../utils/sendSuccess');

const register = async (req, res) => {
  const { body } = req;
  const { success, data } = await createUser(res, body);
  if (success) {
    const user = data;
    const token = await generateAuthToken(user);
    return returnSuccess(res, { user, token });
  }
  return data;
};

module.exports = {
  register,
};
