const userModel = require('../../models/user.model');

const updateUser = (userId, params) => userModel.updateOne({ _id: userId }, params);

module.exports = updateUser;
