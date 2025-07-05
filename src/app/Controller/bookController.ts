import express from "express";
import type { Request, Response } from "express";
import { Book } from "../Model/bookModel";
import { BookZod } from "../Zod_validation/Validation";

const bookController = express.Router();

bookController.post("/", async (req: Request, res: Response) => {
  try {
    const body = await BookZod.parseAsync(req.body);
    body.available = body.copies > 0;

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

bookController.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy,
      sort = "asc",
      limit = "10",
      page = "1",
    } = req.query;

    let filterObj: any = {};

    if (filter && typeof filter === "string") {
      try {
        const parsedFilter = JSON.parse(filter);

        if (parsedFilter.genre) {
          filterObj.genre = parsedFilter.genre.toUpperCase();
        }

        if (parsedFilter.search) {
          const searchTerm = parsedFilter.search.trim();

          if (/^\d+$/.test(searchTerm)) {
            filterObj.isbn = searchTerm;
          } else {
            const searchRegex = new RegExp(searchTerm, "i");
            filterObj.$or = [{ title: searchRegex }, { author: searchRegex }];
          }
        }
      } catch (err) {
        res.status(400).json({
          success: false,
          error: "Invalid filter format",
          message: "Filter must be a valid JSON string",
        });
      }
    }

    const sortObj: any = {};
    if (sortBy) {
      sortObj[sortBy as string] = sort === "desc" ? -1 : 1;
    }

    const limitNum = parseInt(limit as string) || 10;
    const pageNum = parseInt(page as string) || 1;
    const skip = (pageNum - 1) * limitNum;

    let query = Book.find(filterObj);

    if (Object.keys(sortObj).length > 0) {
      query = query.sort(sortObj);
    }

    const books = await query.limit(limitNum).skip(skip);
    const totalBooks = await Book.countDocuments(filterObj);
    const totalPages = Math.ceil(totalBooks / limitNum);

    res.status(200).json({
      success: true,
      message: filter
        ? "Filtered books retrieved successfully"
        : "Books retrieved successfully",
      data: books,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalBooks,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: "Book fetch failed from server",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
});

bookController.get("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Book fetch failed from server",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

bookController.put("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const updateBody = req.body;
    updateBody.available = updateBody.copies > 0;

    const foundBook = await Book.findById(bookId);

    if (!foundBook) {
      res.status(404).json({ error: "Book not found" });
    }

    const updateBook = await Book.findByIdAndUpdate(bookId, updateBody, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      student: updateBook,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update book" });
  }
});

bookController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Book delete failed from server",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default bookController;
