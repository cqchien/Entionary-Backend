const Joi = require('joi');

const createNewFlashcardValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    picture: Joi.string().empty(''),
    topicTitle: Joi.string().required(),
    isPublic: Joi.boolean().required(),
  }),
};

const getFlashcardsValidationSchema = {
  query: Joi.object().keys({
    page: Joi.number().required(),
    take: Joi.number().required(),
    sortBy: Joi.string().empty(''),
  }),
};

const getDetailFlashcardValidationSchema = {
  params: Joi.object().keys({
    flashcardId: Joi.string().required(),
  }),
};

module.exports = {
  createNewFlashcardValidationSchema,
  getFlashcardsValidationSchema,
  getDetailFlashcardValidationSchema,
};
