const logger = require('../../config/winston');

module.exports = function(req, res, next) {
  logger.info('Hello Everyone');
  res.send({ message: 'Hello from Face Scanning' });
};
