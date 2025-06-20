import express, { Application, Request, Response } from "express";

const app: Application = express();
app.use(express.json());
require("dotenv").config();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my Lvl 2 Assignment 3 Server...");
});

export default app;
