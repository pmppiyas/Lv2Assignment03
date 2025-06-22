import { Schema, model } from "mongoose";
import { borrowModelType, IBorrow } from "../Interface/Interface";

const borrowSchema = new Schema<IBorrow, borrowModelType>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book" },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },

    dueDate: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Borrow = model<IBorrow, borrowModelType>("Borrow", borrowSchema);

export default Borrow;
