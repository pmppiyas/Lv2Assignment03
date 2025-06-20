import mongoose, { Schema } from "mongoose";
import IBook from "../Interface/Interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: Number,
      required: [true, "Isbn number is must be insert"],
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    copies: {
      type: Number,
      required: [true, "Copies field is required"],
      min: [0, "Copies must be a positive number"],
    },
    avaiable: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = mongoose.model<IBook>("book", bookSchema);
