/**
 * Sends a standardized response with status code, success status, message, metadata, and data.
 * @param {import('express').Response} res - The Express response object.
 * @param {Object} data - The data object containing response details.
 * @param {number} data.statusCode - The status code of the response.
 * @param {boolean} data.success - The success status of the response.
 * @param {string|null} [data.message] - The message of the response (optional).
 * @param {Object|null} [data.meta] - Additional metadata of the response (optional).
 * @param {any|null} [data.data] - The data payload of the response (optional).
 * @returns {void}
 */

const sendResponse = (res, data) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
