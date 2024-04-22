/* eslint-disable no-prototype-builtins */

import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { BorrowService } from './borrow.service.js';

const borrowRequest = catchAsync(async (req, res) => {
  const result = await BorrowService.borrowRequest(req.body, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book requested successfully!',
    data: result,
  });
});

const getAllBorrowRequests = catchAsync(async (req, res) => {
  const id = req.query.id;
  const status = req.query.status;

  const result = await BorrowService.getAllBorrowRequests(id, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All requests got!',
    data: result,
  });
});
const getRequestById = catchAsync(async (req, res) => {
  const result = await BorrowService.getRequestById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Book got!',
    data: result,
  });
});

const updateBorrowRequest = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  for (let key in updatedData) {
    if (updatedData.hasOwnProperty(key) && updatedData[key] === '') {
      delete updatedData[key];
    }
  }

  const result = await BorrowService.updateBorrowRequest(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Request updated successfully!',
    data: result,
  });
});

const deleteRequest = catchAsync(async (req, res) => {
  const result = await BorrowService.deleteRequest(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully!',
    data: result,
  });
});

const sendBorrowMail = catchAsync(async (req, res) => {
  const result = await BorrowService.sendBorrowMail(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Mail sent successfully!',
    data: result,
  });
});

export const BorrowController = {
  borrowRequest,
  getAllBorrowRequests,
  deleteRequest,
  updateBorrowRequest,
  getRequestById,
  sendBorrowMail,
};
