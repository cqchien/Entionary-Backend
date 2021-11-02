const { Schema, model } = require('mongoose');

const topicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
  },
  { timestamps: true },
);

const topicModel = model('topic', topicSchema, 'topic');

module.exports = topicModel;
