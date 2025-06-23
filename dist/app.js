"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("./app/Controller/bookController"));
const brorrowController_1 = __importDefault(require("./app/Controller/brorrowController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
require("dotenv").config();
app.get("/", (req, res) => {
    res.send("Welcome to my Lvl 2 Assignment 3 Server...");
});
app.use("/api/books", bookController_1.default);
app.use("/api/borrow", brorrowController_1.default);
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
