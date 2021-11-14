const flashcardModel = require('../../models/flashcard.model');

const updateOneFlashcard = async (flashcardId, dataToUpdate) => {
  const result = await flashcardModel.updateOne({ _id: flashcardId }, { ...dataToUpdate });
  return result;
};

module.exports = updateOneFlashcard;
