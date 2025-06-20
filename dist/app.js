"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("./app/Controller/bookController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
require("dotenv").config();
app.get("/", (req, res) => {
    res.send("Welcome to my Lvl 2 Assignment 3 Server...");
});
app.use("/book", bookController_1.default);
exports.default = app;
