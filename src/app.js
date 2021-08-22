const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const status = require('http-status');
const router = require('./routes');
const sendException = require('./utils/sendError');

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

// API routes
app.use('/', router);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(sendException(res, 'Not Found', status.NOT_FOUND));
});

module.exports = app;
