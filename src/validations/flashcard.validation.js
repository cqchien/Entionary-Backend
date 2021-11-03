const Joi = require('joi');

const createNewFlashcardValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  picture: Joi.string().empty(''),
  topicTitle: Joi.string().required(),
  isPublic: Joi.boolean().required(),
});

module.exports = createNewFlashcardValidationSchema;
