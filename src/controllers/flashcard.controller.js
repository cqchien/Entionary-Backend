const httpStatus = require('http-status');
const createFlashcard = require('../services/flashcard/create.service');
const getAllFlashcards = require('../services/flashcard/getAll.service');
const getOneFlashCard = require('../services/flashcard/getOne.service');
const updateOneFlashcard = require('../services/flashcard/updateOne.service');
const createTopic = require('../services/topic/create.service');
const getOneTopicByTitleOrId = require('../services/topic/getOne.service');
const createWord = require('../services/word/create.service');
const getOneWord = require('../services/word/getOne.service');
const Exception = require('../utils/exception');
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
    const { id } = req.user;

    const paginationOptions = {
      page,
      take,
      sortBy,
      population: 'topic',
    };

    const queryOptions = {
      $or: [{ createdBy: id }, { isPublic: true }],
    };
    const { flashcards, pagination } = await getAllFlashcards(paginationOptions, queryOptions);

    return handleSuccess(res, { flashcards }, httpStatus.OK, '', pagination);
  } catch (error) {
    next(error);
  }
};

const getDetailFlashcard = async (req, res, next) => {
  try {
    const { flashcardId } = req.params;

    const flashcard = await getOneFlashCard(flashcardId);
    if (!flashcard) {
      throw new Exception(httpStatus.NOT_FOUND, 'Flashcard Not Found');
    }

    return handleSuccess(res, { flashcard }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

const addWordToFlashcard = async (req, res, next) => {
  try {
    const { flashcardId } = req.params;
    const wordInfo = req.body;

    const flashcard = await getOneFlashCard(flashcardId);
    if (!flashcard) {
      throw new Exception(httpStatus.NOT_FOUND, 'Flashcard Not Found');
    }
    // Check word is exist in db
    let wordInDB = await getOneWord(wordInfo);
    // If not exist, create new word
    if (!wordInDB) {
      wordInDB = await createWord(wordInfo);
    }
    // Add word in db
    const dataUpdate = {
      word: wordInDB._id,
    };

    await updateOneFlashcard(flashcardId, dataUpdate);
    return handleSuccess(res, {}, httpStatus.OK, 'Add Word To Flashcard Successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewFlashcard,
  getFlashcards,
  getDetailFlashcard,
  addWordToFlashcard,
};
