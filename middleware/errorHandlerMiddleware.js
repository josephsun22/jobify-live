import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || 'Something went wrong, try again later';

  res.status(statusCode).json({ msg });
};

export class BadRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = 'BadRequestError';
      this.statusCode = StatusCodes.BAD_REQUEST;
    }
  }
  export class UnauthenticatedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UnauthenticatedError';
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
  }
  export class UnauthorizedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UnauthorizedError';
      this.statusCode = StatusCodes.FORBIDDEN;
    }
  }

export default errorHandlerMiddleware;