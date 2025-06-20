import express, { Request, Response, Router } from "express";
import { Book } from "../Model/bookModel";
import { BookZod } from "../Zod_validation/Validation";

const bookController: Router = express.Router();

// Create book

bookController.post("/create", async (req: Request, res: Response) => {
  try {
    const body = await BookZod.parseAsync(req.body);
    const book = await Book.create(body);
    res
      .status(201)
      .json({ success: true, message: "Book create successfully", data: book });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Book create failed from server",
      message: error,
    });
  }
});

export default bookController;
