class Apierror extends Error {
  constructor(
    statuscode,
    message = "Someyhing went wrong",
    error = [],
    stack = ""
  ) {
    super(message);
    this.status = statuscode;
    this.message = message;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.construtor);
    }
  }
}

export { Apierror };
