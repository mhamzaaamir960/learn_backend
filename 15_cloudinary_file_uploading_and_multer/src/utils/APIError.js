class APIError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!",
    error = [],
    stack = "",
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
