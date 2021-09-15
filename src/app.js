const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const httpStatus = require('http-status');
const GoogleStrategy = require('passport-google-oauth20');
const passport = require('passport');
const router = require('./routes');
const Exception = require('./utils/exception');
const { convertException, handleException } = require('./middlewares/exception.middleware');
const { google } = require('./config/config');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// Config Passport Strategy
// Config Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientId,
      clientSecret: google.clientSecret,
      callbackURL: '/login-gg/callback',
      scope: ['profile'],
      // state: true,
    },
    (accessToken, refreshToken, profile, done) => done(null, profile),
  ),
);

// API routes
app.use('/', router);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new Exception(httpStatus.NOT_FOUND, 'NOT FOUND'));
});

// Convert other error to Exception
app.use(convertException);

// Handle error to send to user
app.use(handleException);
module.exports = app;
