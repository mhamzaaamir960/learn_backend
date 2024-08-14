class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!",
    error = [],
    stack,
  ) {
    super();
    (this.statusCode = statusCode),
      (this.message = message),
      (this.error = error);
  }
}
