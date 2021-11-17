const flashcardModel = require('../../models/flashcard.model');

const createFlashcard = async ({
  name, topic, isPublic, picture, userId,
}) => {
  const flashcard = await flashcardModel.create({
    name,
    picture,
    isPublic,
    topic,
    createdBy: userId,
  });
  return flashcard;
};

module.exports = createFlashcard;
