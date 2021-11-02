const Joi = require('joi');

const createNewFlashcardValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  picture: Joi.string(),
  topicId: Joi.string(),
  topicTitle: Joi.string(),
  displayMode: Joi.string(),
});

module.exports = createNewFlashcardValidationSchema;
