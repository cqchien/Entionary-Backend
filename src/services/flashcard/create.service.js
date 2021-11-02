const flashcardModel = require('../../models/flashcard.model');

const createFlashcard = async (name, topicId, displayMode, picture) => {
  const flashcard = await flashcardModel.create({
    name, picture, displayMode, topic: topicId,
  });
  return flashcard;
};

module.exports = createFlashcard;
