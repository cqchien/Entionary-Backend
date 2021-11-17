const { Schema, model } = require('mongoose');
const validator = require('validator');
const verifyCode = require('../constant/verifyCode');
const password = require('../constant/password');

const userSchema = new Schema(
  {
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
      minLength: password.MIN,
    },
    score: {
      type: Number,
      default: 0,
    },
    verifyCode: {
      code: {
        type: Number,
        maximum: verifyCode.LENGTH,
        minimum: verifyCode.LENGTH,
      },
      updatedAt: {
        type: Date,
        default: new Date(),
      },
    },
  },
  { timestamps: true },
);

const userModel = model('user', userSchema, 'user');

module.exports = userModel;
