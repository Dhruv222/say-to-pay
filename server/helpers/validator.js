const apiError = require('./config/apiError'),
  {
    body,
    header,
    query,
    validationResult,
  } = require('express-validator/check'),
  errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `Validation Error: ${location}[${param}]: ${msg}`;
  };

module.exports = {
  validateRequest(req) {
    const result = validationResult(req).formatWith(errorFormatter);
    return result;
  },
};
