const httpStatus = require('http-status');
const Exception = require('../../utils/exception');
const createUser = require('../user/create.service');
const getUserByEmailOrId = require('../user/getOne.service');

const loginWithSocialNetworkAccount = async (user) => {
  if (!user || !user?.email) {
    throw new Exception(httpStatus.UNAUTHORIZED, 'Incorrect Email Or Password');
  }
  const { email, name, avatar } = user;

  const userInDB = await getUserByEmailOrId({ email });
  if (userInDB) {
    return userInDB;
  }
  const newUser = await createUser({
    name,
    avatar,
    email,
    password: '',
  });

  return newUser;
};

module.exports = loginWithSocialNetworkAccount;
