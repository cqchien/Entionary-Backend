const userModel = require('../../models/user.model');

const saveVerifyCode = (email, code) => {
  const verifyCode = {
    code,
    updateAt: new Date(),
  };
  // Remove code existed in db
  // Save new code
  return userModel.updateOne({ email }, { verifyCode });
};

module.exports = saveVerifyCode;
