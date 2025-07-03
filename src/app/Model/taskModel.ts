import mongoose, { Schema } from "mongoose";
import { ITask } from "../Interface/Interface";

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
      required: true,
    },
    deuDate: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
