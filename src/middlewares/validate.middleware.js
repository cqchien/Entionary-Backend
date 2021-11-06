const httpStatus = require('http-status');
const Joi = require('joi');
const Exception = require('../utils/exception');
const pick = require('../utils/pick.js');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);
  // handle error
  if (error) {
    const errorMessages = error.details.map((errorDetail) => errorDetail.message).join('; ');
    return next(new Exception(httpStatus.BAD_REQUEST, errorMessages));
  }
  return next();
};

module.exports = validate;
