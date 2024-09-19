const httpStatus = require('http-status');
const apiError = require('./api-error.util');

const validateData = (data, schema) => {
  const { value, error } = schema
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(data);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    throw new apiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  return value;
};

module.exports = validateData;
