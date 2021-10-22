const generateVerifyCode = (numberOfDigits) => {
  const n = parseInt(numberOfDigits, 10);
  const number = Math.floor(Math.random() * 10 ** n) + 1;
  return number.toString();
};

module.exports = generateVerifyCode;
