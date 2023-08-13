import { CustomAPIError } from 'errors';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error } from 'mongoose';

interface ErrorHandlerOptions {
  stack?: boolean;
  watchError?: boolean;
}
export const errorHandler = (options: ErrorHandlerOptions = { stack: false, watchError: true }) => {
  console.log('ERROR HANDLER PARAMETERS: ', options);
  return (
    err: CustomAPIError,
    req: Request,
    res: Response<{ message?: string; stack?: string }>,
    next: NextFunction,
  ) => {
    if (options.watchError) {
      console.error(err);
    }
    const customError = {
      // default state
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || 'Something went wrong, try again later',
      stack: err.stack,
    };

    if (err instanceof Error.ValidationError) {
      customError.statusCode = StatusCodes.BAD_REQUEST;
      customError.message = 'Validation error';
    }

    return res.status(customError.statusCode).json({
      message: customError.message,
      stack: customError.stack && err.stack,
    });
  };
};
