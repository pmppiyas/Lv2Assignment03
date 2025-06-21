import mongoose, { Schema, model } from "mongoose";
import { borrowModelType, IBorrow } from "../Interface/Interface";
const { Types } = mongoose;

const borrowSchema = new Schema<IBorrow, borrowModelType>(
  {
    book: {
      type: Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
      validate: {
        validator: function (v: string) {
          return Types.ObjectId.isValid(v);
        },
        message: (props) => `${props.value} is not a valid book ID`,
      },
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    timestamps: true,
  }
);

borrowSchema.static("borrowBook", async function ({ book, quantity, dueDate }) {
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
  }

  await foundBook.save();

  const borrowRecord = await BorrowModel.create({
    book,
    quantity,
    dueDate,
  });

  return borrowRecord;
});

const Borrow = model("Borrow", borrowSchema);

export default Borrow;
