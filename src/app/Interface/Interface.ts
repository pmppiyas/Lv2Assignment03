import { Types, Model } from "mongoose";

interface IBook {
  title: string;
  author: string;
  genre: string;
  isbn: number;
  description?: string;
  copies: number;
  available: boolean;
}

interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: string;
}

interface borrowModelType extends Model<IBorrow> {
  borrowBook: (
    this: Model<IBorrow>,
    args: { book: Types.ObjectId; quantity: number; dueDate: string }
  ) => Promise<IBorrow>;
}

interface ITask {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  deuDate: string;
  createdAt: string;
}

export type { IBook, IBorrow, borrowModelType, ITask };
