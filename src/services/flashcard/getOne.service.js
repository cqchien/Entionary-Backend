const flashcardModel = require('../../models/flashcard.model');

const getOneFlashCard = async (flashcardId) => {
  const flashcard = await flashcardModel.findOne({ _id: flashcardId }).populate('topic');

  return flashcard;
};

module.exports = getOneFlashCard;
