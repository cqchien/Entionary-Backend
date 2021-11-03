const flashcardModel = require('../../models/flashcard.model');

const createFlashcard = async ({
  name, topicId, isPublic, picture,
}) => {
  const flashcard = await flashcardModel.create({
    name,
    picture,
    isPublic,
    topic: topicId,
  });
  return flashcard;
};

module.exports = createFlashcard;
