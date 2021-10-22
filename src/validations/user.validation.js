const Joi = require('joi');
const { password, verifyCode } = require('./custom.validation');

const resetPasswordValidationSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  verifyCode: Joi.string().required().custom(verifyCode),
});

const sendVerifyCodeValidationSchema = Joi.object().keys({
  email: Joi.string().required().email(),
});

module.exports = {
  resetPasswordValidationSchema,
  sendVerifyCodeValidationSchema,
};
