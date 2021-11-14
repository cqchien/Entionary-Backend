const wordModel = require('../../models/word.model');

const createWord = async (word) => {
  const newWord = await wordModel.create(word);

  return newWord;
};

module.exports = createWord;
