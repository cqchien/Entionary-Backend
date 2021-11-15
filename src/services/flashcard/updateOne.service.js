const flashcardModel = require('../../models/flashcard.model');

const updateOneFlashcard = async (flashcardId, dataToUpdate) => {
  const result = await flashcardModel.updateOne(
    { _id: flashcardId },
    { ...dataToUpdate, $push: { words: dataToUpdate.word } },
  );
  return result;
};

module.exports = updateOneFlashcard;
