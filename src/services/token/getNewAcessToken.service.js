const moment = require('moment');
const httpStatus = require('http-status');
const getRefreshToken = require('./getRefreshToken.service');
const tokenTypes = require('../../constant/token');
const { token: tokenConfig } = require('../../config/config');
const generateToken = require('./generate.service');
const Exception = require('../../utils/exception');

const getNewAccessToken = async ({ refreshToken }) => {
  const refreshTokenInfo = await getRefreshToken(refreshToken);
  if (!refreshTokenInfo) {
    throw new Exception(httpStatus.NOT_FOUND, 'Token Is InValid');
  }

  const userId = refreshTokenInfo.user._id;

  const accessTokenExpires = moment().add(tokenConfig.accessExpiration, 'minutes');
  const accessToken = generateToken(userId, tokenTypes.ACCESS, accessTokenExpires);

  return accessToken;
};

module.exports = getNewAccessToken;
