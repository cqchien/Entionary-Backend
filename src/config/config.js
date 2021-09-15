const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Set a schema to compare
const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(5000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_ACCESS_EXPIRATION: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION: Joi.number().default(30).description('days after which access tokens expire'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    GOOGLE_CLIENT_ID: Joi.string().required().description('Google Client Id'),
    GOOGLE_CLIENT_SECRET: Joi.string().required().description('Google Client Secret'),
  })
  .unknown();

const { value: envVal, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVal.NODE_ENV,
  port: envVal.PORT,
  mongoose: {
    url: envVal.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    },
  },
  token: {
    accessExpiration: envVal.JWT_ACCESS_EXPIRATION,
    refreshExpiration: envVal.JWT_REFRESH_EXPIRATION,
    secret: envVal.JWT_SECRET,
  },
  google: {
    clientId: envVal.GOOGLE_CLIENT_ID,
    clientSecret: envVal.GOOGLE_CLIENT_SECRET,
  },
};
