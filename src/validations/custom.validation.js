const passwordMinLength = require('../constant/password');
const verifyCodeLength = require('../constant/verifyCode');

/**
 * Validate password
 * @param {string} value
 * @param {*} helpers
 * @returns string
 */
const password = (value, helpers) => {
  if (value.length < passwordMinLength.MIN) {
    return helpers.message(`Password must be at least ${passwordMinLength.MIN} characters`);
  }
  // If not return value, when you have validate,
  // the field which you custom will not be contained in return value
  return value;
};

const verifyCode = (value, helpers) => {
  if (value.toString().length !== verifyCodeLength.LENGTH) {
    return helpers.message(`Verify code must have ${verifyCodeLength.LENGTH} characters`);
  }
  return value;
};
module.exports = {
  password,
  verifyCode,
};
