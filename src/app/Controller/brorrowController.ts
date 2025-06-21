import express, { Request, Response, Router } from "express";
import Borrow from "../Model/borrowModel";

const borrowController: Router = express.Router();

borrowController.post("/borrow", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const borrowRecord = await Borrow.borrowBook({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default borrowController;
