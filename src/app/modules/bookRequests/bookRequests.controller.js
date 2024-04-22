/* eslint-disable no-prototype-builtins */

import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { BookRequestService } from './bookRequests.service.js';

const requestBook = catchAsync(async (req, res) => {
  const result = await BookRequestService.requestBook(req.body, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book requested successfully!',
    data: result,
  });
});

const getAllRequests = catchAsync(async (req, res) => {
  const result = await BookRequestService.getAllRequests();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All requests got!',
    data: result,
  });
});
const getRequestById = catchAsync(async (req, res) => {
  const result = await BookRequestService.getRequestById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Book got!',
    data: result,
  });
});

const updateRequest = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  for (let key in updatedData) {
    if (updatedData.hasOwnProperty(key) && updatedData[key] === '') {
      delete updatedData[key];
    }
  }

  const result = await BookRequestService.updateRequest(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Request updated successfully!',
    data: result,
  });
});

const deleteRequest = catchAsync(async (req, res) => {
  const result = await BookRequestService.deleteRequest(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully!',
    data: result,
  });
});

export const BookRequestController = {
  requestBook,
  getAllRequests,
  deleteRequest,
  updateRequest,
  getRequestById,
};
