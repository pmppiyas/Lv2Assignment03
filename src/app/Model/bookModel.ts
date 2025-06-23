import mongoose, { Schema } from "mongoose";
import { borrowModelType, IBook } from "../Interface/Interface";

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
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.static("borrowBook", async function ({ book, quantity, dueDate }) {
  const Book = mongoose.model("Book");
  const BorrowModel = mongoose.model("Borrow");

  const foundBook = await Book.findById(book);
  if (!foundBook) {
    throw new Error("Book not found");
  }

  if (foundBook.copies < quantity) {
    throw new Error("Not enough copies available to borrow");
  }

  foundBook.copies -= quantity;
  if (foundBook.copies === 0) {
    foundBook.available = false;
  } else {
    foundBook.available = true;
  }

  await foundBook.save();

  const borrowRecord = await BorrowModel.create({
    book,
    quantity,
    dueDate,
  });
  return borrowRecord;
});

bookSchema.pre("save", async function (next) {
  if (this.isNew) {
    console.log(`📚 New book added: ${this.title} by ${this.author}`);
  } else {
    console.log(`📚 Book updated: ${this.title} by ${this.author}`);
  }
  next();
});

bookSchema.post("save", function (doc) {
  console.log(`📚 Book saved: ${doc.title} with ISBN ${doc.isbn}`);
});

export const Book = mongoose.model<IBook, borrowModelType>("Book", bookSchema);
