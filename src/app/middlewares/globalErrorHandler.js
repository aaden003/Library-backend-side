/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import ApiError from '../../errors/ApiError.js';
import handleCastError from '../../errors/handleCastError.js';
import handleValidationError from '../../errors/handleValidationError.js';

/**
 * Global error handling middleware for Express applications.
 * Handles various types of errors including validation errors, API errors, cast errors, and general errors.
 * @param {Error} error - The error object passed to the middleware.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 * @returns {void}
 */

const globalErrorHandler = (error, req, res, next) => {
  console.log('From global error handler: ', error);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages = [];

  if (error?.name === 'ValidationError') {
    const simplifyError = handleValidationError(error);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessages = simplifyError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: 'error', message: error?.message }]
      : [];
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: 'error', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: error?.stack,
  });
};

export default globalErrorHandler;
