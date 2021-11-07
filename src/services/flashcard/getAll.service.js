const flashcardModel = require('../../models/flashcard.model');

const getAllFlashcards = async (paginationOptions) => {
  const {
    page, take, sortBy, population,
  } = paginationOptions;

  const { docs, paginationMetaData } = await flashcardModel.paginate({
    page, take, sortBy, population,
  });

  return { flashcards: docs, pagination: paginationMetaData };
};

module.exports = getAllFlashcards;
