import { Schema, model } from 'mongoose';

const bookReqSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export const BookRequest = model('BookRequest', bookReqSchema);
