import { z } from "zod";

const allowedGenres = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

export const BookZod = z.object({
  title: z
    .string()
    .min(2, "Title is too short")
    .max(100, "Title is too long"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(50, "Author field is too long"),
  genre: z
    .string()
    .transform((val) => val.toUpperCase())
    .refine(
      (val) => allowedGenres.includes(val as (typeof allowedGenres)[number]),
      {
        message:
          "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      }
    ),

  isbn: z
    .number()
    .int()
    .positive()
    .refine(
      (val) => val.toString().length >= 10 && val.toString().length <= 13,
      {
        message: "ISBN should be 10 to 13 digits long",
      }
    ),
  description: z.string().min(10, "Description is too short").max(500),
  copies: z
    .number()
    .int()
    .nonnegative({ message: "Copies must be a positive number" }),
  available: z.boolean().default(true),
});
