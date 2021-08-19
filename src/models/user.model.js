const { Schema, model } = require('mongoose');
const validator = require('validator');
const roles = require('../config/role');
const coin = require('../constant/coin');
const star = require('../constant/star');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  role: {
    type: String,
    enum: roles,
    default: 'USER',
  },
  coin: {
    type: Number,
    default: coin.default,
    minimum: coin.min,
    maximum: coin.max,
  },
  numberOfStars: {
    type: Number,
    default: star.default,
    minimum: star.min,
    maximum: star.max,
  },
  flashcards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'flashcard',
    },
  ],
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

const userModel = model('user', userSchema, 'user');

module.exports = userModel;
