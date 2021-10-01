const httpStatus = require('http-status');
const createUser = require('../services/user/create.service');
const generateAuthToken = require('../services/token/generateAuth.service');
const handleSuccess = require('../utils/successfulHandler');
const loginWithEmail = require('../services/auth/login.service');
const loginWithSocialNetworkAccount = require('../services/auth/loginWithSocialNetwork.service');
const getNewAccessToken = require('../services/token/getNewAcessToken.service');

const register = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await createUser(body);
    const token = await generateAuthToken(user);

    return handleSuccess(res, { token }, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await loginWithEmail(body);
    const token = await generateAuthToken(user);
    return handleSuccess(res, { token }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

const loginWithSocialNetwork = async (req, res, next) => {
  const { user } = req;
  try {
    const userFromSocialNetwork = await loginWithSocialNetworkAccount(user);
    const token = await generateAuthToken(userFromSocialNetwork);
    return handleSuccess(res, { token }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

const getAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req;
    // get refreshtoken in db token
    // get user in this refresh token
    // create new access token
    const token = await getNewAccessToken({ refreshToken });
    return handleSuccess(res, { token }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  loginWithSocialNetwork,
  getAccessToken,
};
