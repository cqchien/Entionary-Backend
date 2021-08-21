const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');

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

app.use('/', router);

module.exports = app;
