import express, { Router, Request, Response } from "express";
import Task from "../Model/taskModel";

const taskController: Router = express.Router();

taskController.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();

    res.status(200).send({
      success: true,
      message: "Tasks retrived successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Book create failed from server",
      message: error,
    });
  }
});

taskController.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const task = await Task.create(body);
    console.log(task);
    res.status(201).send({
      success: true,
      message: "Task create successfullys",
      task: task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Book create failed from server",
      message: error,
    });
  }
});

export default taskController;
