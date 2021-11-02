const topicModel = require('../../models/topic.model');

const getOneTopicByTitleOrId = async ({ title, id }) => {
  const _id = id;
  const query = _id ? { _id } : { title };

  const topic = await topicModel.findOne(query);

  return topic;
};

module.exports = getOneTopicByTitleOrId;
