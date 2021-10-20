const httpStatus = require('http-status');
const checkVerifyCode = require('../services/user/checkVerifyCode.service');
const getUserByEmailOrId = require('../services/user/getOne.service');
const updateUser = require('../services/user/update.service');
const Exception = require('../utils/exception');
const handleSuccess = require('../utils/successfulHandler');

const getUserDetail = async (req, res, next) => {
  const { user } = req;
  try {
    const userDetail = await getUserByEmailOrId({ id: user.id });
    if (!userDetail) {
      throw new Exception(httpStatus.NOT_FOUND, 'User Not Found');
    }
    return handleSuccess(res, { user: userDetail }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { email, codeToVerify, password } = req.body;
  try {
    // Check email
    const userDetail = await getUserByEmailOrId({ email });
    if (!userDetail) {
      throw new Exception(httpStatus.NOT_FOUND, 'User Not Found');
    }

    // Validate code
    const isMatchCode = checkVerifyCode(userDetail, codeToVerify);
    if (!isMatchCode) {
      throw new Exception(httpStatus.BAD_REQUEST, 'Code To Verify is invalid');
    }

    // Update password
    await updateUser(userDetail._id, { password });

    return handleSuccess(res, { ...userDetail, password }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserDetail,
  resetPassword,
};
