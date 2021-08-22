/**
 * Validate password
 * @param {string} value
 * @param {*} helpers
 * @returns string
 */
const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('Password must be at least 8 characters');
  }
};

module.exports = {
  password,
};
