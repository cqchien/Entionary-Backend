const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");
let server;

server = app.listen(config.port, () => {
  logger.info(`Listening on port ${config.port}`);
});

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error(`Connected failure with error: ${error.message}`);
  });
