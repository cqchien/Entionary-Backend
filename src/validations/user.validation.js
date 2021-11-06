const Joi = require('joi');
const { password, verifyCode } = require('./custom.validation');

const resetPasswordValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    codeToVerify: Joi.number().required().custom(verifyCode),
  }),
};

const sendVerifyCodeValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

module.exports = {
  resetPasswordValidationSchema,
  sendVerifyCodeValidationSchema,
};
