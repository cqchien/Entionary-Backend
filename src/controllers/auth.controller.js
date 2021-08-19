const createUser = require('../services/user/create.service');

const register = async (req, res) => {
  const user = await createUser(req.body);

  return res.status(200).json({ user });
};

module.exports = {
  register,
};
