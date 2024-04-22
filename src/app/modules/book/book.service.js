import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import { Book } from './book.model.js';
import cloudinary from 'cloudinary';
import config from '../../../config/config.js';
import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { bookSearchableFields } from './book.constants.js';
import mongoose from 'mongoose';

cloudinary.v2.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

const createBook = async (payload, file) => {
  if (!file?.path && !payload.googleImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No image uploaded!');
  }

  if (file?.path) {
    const result = await cloudinary.v2.uploader.upload(file.path);
    const imageUrl = result.secure_url;

    payload.image = imageUrl;
  }

  const book = await Book.create(payload);

  return book;
};

const getAllBooks = async (filters, paginationOptions) => {
  // Extract searchTerm to implement search query
  const { searchTerm, title, userId, genre, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder === 'desc' ? -1 : 1;
  }
  if (userId) {
    andConditions.push({
      user: userId,
    });
  }

  if (genre) {
    andConditions.push({
      genre: genre,
    });
  }

  if (title) {
    andConditions.push({
      title: {
        $regex: title,
        $options: 'i',
      },
    });
  }
  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.aggregate([
    {
      $match: whereConditions,
    },
    {
      $addFields: {
        rating: { $avg: '$reviews.rating' },
      },
    },
    {
      $sort: sortConditions,
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getBookById = async id => {
  const book = await Book.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $addFields: {
        rating: { $avg: '$reviews.rating' },
      },
    },
  ]);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'book not found');
  }
  return book[0];
};

const reviewBook = async (payload, bookId) => {
  const { rating, comment, name, image } = payload;

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'book not found');
  }

  const newReview = {
    name,
    image,
    rating,
    comment,
  };

  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    { $push: { reviews: newReview } },
    { new: true },
  );

  return updatedBook;
};

const getReviews = async bookId => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'book not found');
  }

  const result = book.reviews;

  return result;
};

const updateBook = async (id, payload, file) => {
  let isExist = await Book.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'book not found');
  }

  Object.keys(payload).forEach(key => {
    isExist[key] = payload[key];
  });

  if (file?.path) {
    const result = await cloudinary.v2.uploader.upload(file.path);
    const imageUrl = result.secure_url;

    isExist.image = imageUrl;
  }

  const result = await isExist.save();

  return result;
};

const deleteBook = async id => {
  const isExist = await Book.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus[500], 'Book not found!');
  }

  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  deleteBook,
  updateBook,
  getBookById,
  reviewBook,
  getReviews,
};
