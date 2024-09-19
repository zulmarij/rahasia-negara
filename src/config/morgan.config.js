const morgan = require('morgan');
const loggerConfig = require('./logger.config');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const successResponseFormat = `:method :url :status - :response-time ms`;
const errorResponseFormat = `:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => {
    const isStatic = req.baseUrl.includes('static');
    return res.statusCode >= 400 || isStatic;
  },
  stream: { write: (message) => loggerConfig.info(message.trim()) }
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => {
    const isStatic = req.baseUrl.includes('static');
    return res.statusCode < 400 || isStatic;
  },
  stream: { write: (message) => loggerConfig.error(message.trim()) }
});

module.exports = {
  successHandler,
  errorHandler
};
