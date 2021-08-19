const { Schema, model } = require('mongoose');
const validator = require('validator');
const roles = require('../constant/role');
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
    enum: [roles.ADMIN, roles.USER],
    default: 'USER',
  },
  coin: {
    type: Number,
    default: coin.DEFAULT,
    minimum: coin.MIN,
    maximum: coin.MAX,
  },
  numberOfStars: {
    type: Number,
    default: star.DEFAULT,
    minimum: star.MIN,
    maximum: star.MAX,
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
