import { Schema, model } from 'mongoose';

const borrowSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    borrowedAt: {
      type: String,
    },
    returnedAt: {
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

export const Borrow = model('Borrow', borrowSchema);
