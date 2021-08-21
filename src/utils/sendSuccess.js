/**
 * Format data to return to user
 * @param {*} res
 * @param {object} data
 * @param {string} message
 * @param {*} pagination
 * @returns object{
  success: true,
  data,
  message,
  pagination,
}
 */
const returnSuccess = (res, data, message = '', pagination = {}) => res.status(200).send({
  success: true,
  data,
  message,
  pagination,
});

module.exports = returnSuccess;
