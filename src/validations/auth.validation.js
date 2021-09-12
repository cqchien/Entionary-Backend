const Joi = require('joi');
const { password } = require('./custom.validation');

const registerValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
});

const loginValidationSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

module.exports = {
  registerValidationSchema,
  loginValidationSchema,
};
