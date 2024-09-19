const authLimiterMiddleware = require('./auth-limiter.middleware');
const authMiddleware = require('./auth.middleware');
const errorMiddleware = require('./error.middleware');
const validateMiddleware = require('./validate.middleware');
const versionMiddleware = require('./version.middleware');
const xssMiddleware = require('./xss.middleware');

module.exports = {
  authLimiterMiddleware,
  authMiddleware,
  errorMiddleware,
  validateMiddleware,
  versionMiddleware,
  xssMiddleware
};
