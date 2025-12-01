class ResponseError extends Error {
  constructor(status, message, success) {
    super(message);
    this.status = status;
    this.success = success || false;
  }
}

module.exports = ResponseError;
