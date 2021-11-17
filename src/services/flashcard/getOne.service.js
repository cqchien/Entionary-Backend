const flashcardModel = require('../../models/flashcard.model');
const wordModel = require('../../models/word.model');

const getOneFlashCard = async (flashcardId) => {
  const flashcard = await flashcardModel.findOne({ _id: flashcardId }).populate([{ path: 'words', model: wordModel }]);

  return flashcard;
};

module.exports = getOneFlashCard;
