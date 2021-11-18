const flashcardModel = require('../../models/flashcard.model');

const getAllFlashcards = async ({ paginationOptions, queryOptions }) => {
  const {
    page, take, sortBy, population,
  } = paginationOptions;

  const { docs, paginationMetaData } = await flashcardModel.paginate({
    page,
    take,
    sortBy,
    population,
    queryOptions,
  });

  return { flashcards: docs, pagination: paginationMetaData };
};

module.exports = getAllFlashcards;
