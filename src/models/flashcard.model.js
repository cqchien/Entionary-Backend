const { Schema, model } = require('mongoose');

const flashcardSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  picture: {
    type: String,
  },
  words: [
    {
      type: Schema.Types.ObjectId,
      ref: 'word',
    },
  ],
  sentences: [
    {
      type: Schema.Types.ObjectId,
      ref: 'sentence',
    },
  ],
  stars: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
});

const flashcardModel = model('flashcard', flashcardSchema, 'flashcard');

module.exports = flashcardModel;
