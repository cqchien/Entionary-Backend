const { Schema, model } = require('mongoose');
const paginate = require('../utils/paginate');

const flashcardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    words: [
      {
        type: Schema.Types.ObjectId,
        ref: 'word',
      },
    ],
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'topic',
    },
    createdBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { timestamps: true },
);

flashcardSchema.plugin(paginate);

const flashcardModel = model('flashcard', flashcardSchema, 'flashcard');

module.exports = flashcardModel;
