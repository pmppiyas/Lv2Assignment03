"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book" },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
        type: String,
        required: [true, "Due date is required"],
        validate: {
            validator: function (v) {
                return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(v);
            },
            message: (props) => `${props.value} is not a valid date format! Use YYYY-MM-DD with international format like "2025-07-18T00:00:00.000Z".`,
        },
    },
}, {
    timestamps: true,
    versionKey: false,
});
borrowSchema.pre("save", function (next) {
    console.log(this.dueDate);
    console.log(`Borrowing ${this.quantity} copy/copies of Book ID: ${this.book}`);
    next();
});
borrowSchema.post("save", function (doc) {
    console.log(`📚 Borrow record created for Book ID ${doc.book} with due date ${doc.dueDate}`);
});
const Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
exports.default = Borrow;
