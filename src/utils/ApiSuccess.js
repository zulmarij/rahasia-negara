const httpStatus = require('http-status');

class ApiSuccess {
  constructor(res, data, message = 'Success', statusCode = httpStatus.OK) {
    res.status(statusCode).json({
      code: statusCode,
      status: 'success',
      message,
      data
    });
  }
}

module.exports = ApiSuccess;
