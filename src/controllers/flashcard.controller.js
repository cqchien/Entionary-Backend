const httpStatus = require('http-status');
const createFlashcard = require('../services/flashcard/create.service');
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

module.exports = { createNewFlashcard };
