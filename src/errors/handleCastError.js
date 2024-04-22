/**
 * Handles cast errors thrown by Mongoose.
 * @param {Error} error - The cast error object.
 * @returns {Object} An object containing status code, message, and error messages.
 */

const handleCastError = error => {
  const errors = [
    {
      path: error?.path,
      message: 'Invalid ' + error?.path,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
