const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Entionary API documentation',
    version,
    description:
      'This is an API document for Events Marketing - Entionary projects. Read README.md to setup something before start.',
    license: {
      name: 'MIT',
    },
    contact: {
      email: 'caochientp1@gmail.com',
    },
  },
  servers: [
    {
      url: 'https://phpmyad.kargomyanmar.com',
      description: 'Online',
    },
    {
      url: `http://localhost:${config.port}`,
      description: 'Local',
    },
  ],
  tags: [
    {
      name: 'auth',
      description: 'Authentication for account.',
    },
    { name: 'user', description: 'Everything about user' },
  ],
};

module.exports = swaggerDef;
