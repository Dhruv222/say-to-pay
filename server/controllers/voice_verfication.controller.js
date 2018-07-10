const logger = require('../../config/winston');

module.exports = function(req, res, next) {
  logger.info('Hello World');
  res.send({ message: 'Hello from Voice Verification' });
};
