// To create consistent and structured error responses in the app.
class AppException extends Error {
  /**
   * Creates a new instance of AppException.
   *
   * @param {number} httpStatus - The HTTP status code associated with the error.
   * @param {string} errorCode - A unique error code for identifying the error type.
   * @param {string} message - A human-readable error message describing the issue.
   */

  constructor(httpStatus, errorCode, message) {
    super();
    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
    this.message = message;
  }
}

module.exports = AppException;
