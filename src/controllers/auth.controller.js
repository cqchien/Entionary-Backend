const httpStatus = require('http-status');
const createUser = require('../services/user/create.service');
const generateAuthToken = require('../services/token/generateAuth.service');
const handleSuccess = require('../utils/successfulHandler');

const register = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await createUser(body);
    const token = await generateAuthToken(user);

    return handleSuccess(res, { user, token }, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
