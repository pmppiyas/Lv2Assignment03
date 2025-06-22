import express, { Application, Request, Response } from "express";
import bookController from "./app/Controller/bookController";
import borrowController from "./app/Controller/brorrowController";

const app: Application = express();
app.use(express.json());
require("dotenv").config();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my Lvl 2 Assignment 3 Server...");
});

app.use("/api/books", bookController);
app.use("/api/borrow", borrowController);

app.use((err: any, req: Request, res: Response, next: Function) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
export default app;
