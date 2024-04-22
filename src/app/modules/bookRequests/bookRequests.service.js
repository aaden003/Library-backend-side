import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import { BookRequest } from './bookRequests.model.js';

const requestBook = async payload => {
  const book = await BookRequest.create(payload);

  return book;
};

const getAllRequests = async () => {
  const result = await BookRequest.find({}).populate('user');

  return result;
};

const getRequestById = async id => {
  const book = await BookRequest.findById(id);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'request not found');
  }
  return book;
};

const updateRequest = async (id, payload) => {
  let isExist = await BookRequest.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'request not found');
  }

  Object.keys(payload).forEach(key => {
    isExist[key] = payload[key];
  });

  const result = await isExist.save();

  return result;
};

const deleteBook = async id => {
  const isExist = await BookRequest.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus[500], 'Request not found!');
  }

  const result = await BookRequest.findByIdAndDelete(id);
  return result;
};

export const BookRequestService = {
  requestBook,
  getAllRequests,
  deleteBook,
  updateRequest,
  getRequestById,
};
