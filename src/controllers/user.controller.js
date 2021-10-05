const httpStatus = require('http-status');
const getUserByEmailOrId = require('../services/user/getOne.service');
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

module.exports = {
  getUserDetail,
};
