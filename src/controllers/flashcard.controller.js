const httpStatus = require('http-status');
const createFlashcard = require('../services/flashcard/create.service');
const getAllFlashcards = require('../services/flashcard/getAll.service');
const createTopic = require('../services/topic/create.service');
const getOneTopicByTitleOrId = require('../services/topic/getOne.service');
const handleSuccess = require('../utils/successfulHandler');

const createNewFlashcard = async (req, res, next) => {
  try {
    const {
      name, picture, topicTitle, isPublic,
    } = req.body;
    // check the exist of topic
    let topic = await getOneTopicByTitleOrId({ title: topicTitle });

    // If the topic not exist -> create new topic
    if (!topic) {
      topic = await createTopic({ title: topicTitle });
    }

    // Create new Flashcard
    await createFlashcard({
      name,
      picture,
      isPublic,
      topicId: topic._id,
    });

    return handleSuccess(res, {}, httpStatus.CREATED, 'Create Flashcard Successfully');
  } catch (error) {
    next(error);
  }
};

const getFlashcards = async (req, res, next) => {
  try {
    const { page, take, sortBy } = req.query;
    const paginationOptions = {
      page,
      take,
      sortBy,
      population: 'topic',
    };
    const { flashcards, pagination } = await getAllFlashcards(paginationOptions);

    return handleSuccess(res, { flashcards }, httpStatus.OK, '', pagination);
  } catch (error) {
    next(error);
  }
};

module.exports = { createNewFlashcard, getFlashcards };
