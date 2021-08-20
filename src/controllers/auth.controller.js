const createUser = require('../services/user/create.service');
const generateAuthToken = require('../services/token/generateAuth.service');

const register = async (req, res) => {
  const { body } = req;
  const user = await createUser(body);
  const token = await generateAuthToken(user);

  return res.status(200).send({ user, token });
};

module.exports = {
  register,
};
