/* eslint-disable no-prototype-builtins */

import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { BookService } from './book.service.js';
import { bookFilterableFields } from './book.constants.js';
import pick from '../../../shared/pick.js';

const createBook = catchAsync(async (req, res) => {
  const result = await BookService.createBook(req.body, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req, res) => {
  const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];

  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Books got!',
    data: result,
  });
});
const getBookById = catchAsync(async (req, res) => {
  const result = await BookService.getBookById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Book got!',
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const id = req.params.id;
  let updatedData = req.body;
  updatedData = JSON.parse(JSON.stringify(updatedData));
  console.log({ updatedData });

  for (let key in updatedData) {
    if (updatedData.hasOwnProperty(key) && updatedData[key] === '') {
      delete updatedData[key];
    }
  }

  const result = await BookService.updateBook(id, updatedData, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully!',
    data: result,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const result = await BookService.deleteBook(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully!',
    data: result,
  });
});

const reviewBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;

  const result = await BookService.reviewBook(req.body, bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book reviewed successfully!',
    data: result,
  });
});

const getReviews = catchAsync(async (req, res) => {
  const { bookId } = req.params;

  const result = await BookService.getReviews(bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book getReviews successfully!',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  deleteBook,
  updateBook,
  getBookById,
  reviewBook,
  getReviews,
};
