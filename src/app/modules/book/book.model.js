import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const bookSchema = new Schema(
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
    page: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },

    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Update avgRating middleware
bookSchema.pre('save', function (next) {
  const totalRating = this.reviews.reduce(
    (acc, review) => acc + review.rating,
    0,
  );
  this.rating = totalRating / this.reviews.length || 0;
  next();
});

export const Book = model('Book', bookSchema);
