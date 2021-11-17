const Joi = require('joi');

const createNewFlashcardValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    picture: Joi.string().empty(''),
    topicTitle: Joi.string().required(),
    topicIcon: Joi.string().required(),
    isPublic: Joi.boolean().required(),
  }),
};

const getFlashcardsValidationSchema = {
  query: Joi.object().keys({
    page: Joi.number(),
    take: Joi.number(),
    sortBy: Joi.string(),
  }),
};

const getDetailFlashcardValidationSchema = {
  params: Joi.object().keys({
    flashcardId: Joi.string().required(),
  }),
};

const addWordToFlashcardValidationSchema = {
  params: Joi.object().keys({
    flashcardId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    word: Joi.string().required(),
    type: Joi.string().required(),
    definition: Joi.string().required(),
    pronunciation: Joi.string().empty(''),
    example: Joi.string().empty(''),
    picture: Joi.string().empty(''),
    synonyms: Joi.array().items(Joi.string()),
    antonyms: Joi.array().items(Joi.string()),
  }),
};

module.exports = {
  createNewFlashcardValidationSchema,
  getFlashcardsValidationSchema,
  getDetailFlashcardValidationSchema,
  addWordToFlashcardValidationSchema,
};
