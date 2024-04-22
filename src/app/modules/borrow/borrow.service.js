import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import { Borrow } from './borrow.model.js';
import { sendMail } from '../../../utils/sendMail.js';

const borrowRequest = async payload => {
  const book = await Borrow.create(payload);

  return book;
};

const getAllBorrowRequests = async (id, status) => {
  let query = {};

  if (id) {
    query = {
      user: id,
    };
  }

  if (status) {
    query = {
      status: status,
    };
  }

  const result = await Borrow.find(query).populate('user').populate('book');
  return result;
};

const getRequestById = async id => {
  const book = await Borrow.findById(id);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'request not found');
  }
  return book;
};

const updateBorrowRequest = async (id, payload) => {
  let isExist = await Borrow.findById(id);

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
  const isExist = await Borrow.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus[500], 'Request not found!');
  }

  const result = await Borrow.findByIdAndDelete(id);
  return result;
};

const sendBorrowMail = async payload => {
  const { name, email } = payload;
  const result = await sendMail(name, email);

  return result;
};

export const BorrowService = {
  borrowRequest,
  getAllBorrowRequests,
  deleteBook,
  updateBorrowRequest,
  getRequestById,
  sendBorrowMail,
};
