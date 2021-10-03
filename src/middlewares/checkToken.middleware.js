const httpStatus = require('http-status');
const config = require('../config/config');
const Exception = require('../utils/exception');
const verifyToken = require('../utils/verifyToken');

const checkToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  try {
    if (token) {
      const decode = await verifyToken(token, config.token.secret);
      req.user = decode;

      next();
    } else {
      throw new Exception(httpStatus.FORBIDDEN, 'No Token Provided.');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = checkToken;
