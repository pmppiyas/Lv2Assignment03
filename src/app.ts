import express, { Application, Request, Response } from "express";
import bookController from "./app/Controller/bookController";

const app: Application = express();
app.use(express.json());
require("dotenv").config();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my Lvl 2 Assignment 3 Server...");
});

app.use("/book", bookController);

export default app;
