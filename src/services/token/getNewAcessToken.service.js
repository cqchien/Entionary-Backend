const moment = require('moment');
const httpStatus = require('http-status');
const getRefreshToken = require('./getRefreshToken.service');
const tokenTypes = require('../../constant/token');
const { token: tokenConfig, token } = require('../../config/config');
const generateToken = require('./generate.service');
const Exception = require('../../utils/exception');
const verifyToken = require('../../utils/verifyToken');

const getNewAccessToken = async ({ refreshToken }) => {
  try {
    await verifyToken(refreshToken, token.secret);
  } catch (error) {
    throw new Exception(httpStatus.UNAUTHORIZED, 'Token Is Invalid');
  }

  const refreshTokenInfo = await getRefreshToken(refreshToken);
  if (!refreshTokenInfo) {
    throw new Exception(httpStatus.NOT_FOUND, 'No Token Provided.');
  }

  const userId = refreshTokenInfo.user._id;

  const accessTokenExpires = moment().add(tokenConfig.accessExpiration, 'minutes');
  const accessToken = generateToken(userId, tokenTypes.ACCESS, accessTokenExpires);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

module.exports = getNewAccessToken;
