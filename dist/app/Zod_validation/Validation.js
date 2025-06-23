"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookZod = void 0;
const zod_1 = require("zod");
const allowedGenres = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
];
exports.BookZod = zod_1.z.object({
    title: zod_1.z.string().min(1, "Author is required").max(100, "Title is too long"),
    author: zod_1.z
        .string()
        .min(1, "Author is required")
        .max(50, "Author field is too long"),
    genre: zod_1.z
        .string()
        .transform((val) => val.toUpperCase())
        .refine((val) => allowedGenres.includes(val), {
        message: "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
    }),
    isbn: zod_1.z
        .number()
        .int()
        .positive()
        .refine((val) => val.toString().length >= 10 && val.toString().length <= 13, {
        message: "ISBN should be 10 to 13 digits long",
    }),
    description: zod_1.z.string().min(10, "Description is too short").max(500),
    copies: zod_1.z
        .number()
        .int()
        .nonnegative({ message: "Copies must be a positive number" }),
    available: zod_1.z.boolean().default(true),
});
