const Joi = require('joi');
const { password } = require('./custom.validation');

const registerValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

const loginValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const getAccessTokenValidationSchema = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const loginSocialValidationSchema = {
  body: Joi.object().keys({
    access_token: Joi.string().required(),
  }),
};

module.exports = {
  registerValidationSchema,
  loginValidationSchema,
  getAccessTokenValidationSchema,
  loginSocialValidationSchema,
};
