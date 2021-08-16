const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Set a schema to compare
const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(5000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
  })
  .unknown();

const { value: envVal, error } = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

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
};
