"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookModel_1 = require("../Model/bookModel");
const Validation_1 = require("../Zod_validation/Validation");
const bookController = express_1.default.Router();
bookController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield Validation_1.BookZod.parseAsync(req.body);
        const book = yield bookModel_1.Book.create(body);
        res
            .status(201)
            .json({ success: true, message: "Book create successfully", data: book });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Book create failed from server",
            message: error,
        });
    }
}));
bookController.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort = "asc", limit = "10", page = "1", } = req.query;
        let filterObj = {};
        if (filter) {
            try {
                if (typeof filter === "string") {
                    try {
                        filterObj = JSON.parse(filter);
                    }
                    catch (_a) {
                        filterObj = { genre: filter.toUpperCase() };
                    }
                }
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    error: "Invalid filter format",
                    message: "Filter parameter must be valid JSON or a genre string",
                });
            }
        }
        let sortObj = {};
        if (sortBy) {
            sortObj[sortBy] = sort === "desc" ? -1 : 1;
        }
        const limitNum = parseInt(limit) || 10;
        const pageNum = parseInt(page) || 1;
        const skip = (pageNum - 1) * limitNum;
        let query = bookModel_1.Book.find(filterObj);
        if (Object.keys(sortObj).length > 0) {
            query = query.sort(sortObj);
        }
        const books = yield query.limit(limitNum).skip(skip);
        const totalBooks = yield bookModel_1.Book.countDocuments(filterObj);
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
    }
    catch (error) {
        console.log(error);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                error: "Book fetch failed from server",
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}));
bookController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const book = yield bookModel_1.Book.findById(bookId);
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Book fetch failed from server",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
bookController.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const updateBody = req.body;
        const updateBook = yield bookModel_1.Book.findByIdAndUpdate(bookId, updateBody, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            student: updateBook,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update book" });
    }
}));
bookController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        yield bookModel_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Book delete failed from server",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
exports.default = bookController;
