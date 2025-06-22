import express, { Request, Response, Router } from "express";
import Borrow from "../Model/borrowModel";
import { Book } from "../Model/bookModel";

const borrowController: Router = express.Router();

borrowController.post("/", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;
    const borrowRecord = await Book.borrowBook({ book, quantity, dueDate });
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

borrowController.get("/", async (req: Request, res: Response) => {
  try {
    const borrowRecords = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowRecords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default borrowController;
