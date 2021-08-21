/**
 * Format data to return to user when have error not found
 * @param {*} res
 * @param {string} message
 * @returns object{
  success: false,
  message,
  data: null,
}
 */
const returnException = (res, message, status) => res.status(status).send({
  success: false,
  message,
});

module.exports = returnException;
