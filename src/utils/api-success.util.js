class apiSuccess {
  constructor(data, message = 'Success', statusCode = 200) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }

  static send(res, data, message = 'Success', statusCode = 200) {
    const response = new apiSuccess(data, message, statusCode);
    return response.send(res);
  }

  send(res) {
    return res.status(this.statusCode).json({
      code: this.statusCode,
      success: true,
      message: this.message,
      data: this.data
    });
  }
}

module.exports = apiSuccess;
