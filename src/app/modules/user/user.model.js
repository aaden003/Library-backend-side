/**
 * Defines the Mongoose schema and model for user data.
 * Includes fields for email, name, role, password (hashed), and image.
 * Provides methods for password hashing, password matching, and checking user existence.
 */

import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config/config.js';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: 'user',
    },
    password: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
      default: 'https://i.ibb.co/mcHGwPy/dummy.jpg',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.statics.isPasswordMatch = async function (givenPass, savedPass) {
  const isMatch = await bcrypt.compare(givenPass, savedPass);

  return isMatch;
};

userSchema.pre('save', async function (next) {
  // hash password
  if (this.password) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  next();
});

userSchema.statics.isUserExist = async function (email) {
  const user = await User.findOne(
    { email },
    { email: 1, password: 1, role: 1, id: 1 },
  ).lean();

  return user;
};

export const User = model('User', userSchema);
