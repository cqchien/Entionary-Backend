const flashcardModel = require('../../models/flashcard.model');

const createFlashcard = async ({
  name, topicId, isPublic, picture, userId,
}) => {
  const flashcard = await flashcardModel.create({
    name,
    picture,
    isPublic,
    topic: topicId,
    createdBy: userId,
  });
  return flashcard;
};

module.exports = createFlashcard;
