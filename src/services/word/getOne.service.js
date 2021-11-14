const wordModel = require('../../models/word.model');

const getOneWord = async ({ id, word, definition }) => {
  const query = id ? { _id: id } : { word, definition };
  const wordInDB = await wordModel.findOne(query);

  return wordInDB;
};

module.exports = getOneWord;
