const { Prisma } = require('@prisma/client');
const httpStatus = require('http-status');
const { apiError } = require('../utils');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof apiError)) {
    const statusCode =
      error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new apiErrorr(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (envConfig.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    success: false,
    message,
    ...(envConfig.env === 'development' && { stack: err.stack })
  };

  if (envConfig.env === 'development') {
    loggerConfig.error(err);
  }
  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler
};
