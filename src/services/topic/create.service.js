const topicModel = require('../../models/topic.model');

const createTopic = async ({ title }) => {
  const topic = await topicModel.create({ title });

  return topic;
};

module.exports = createTopic;
