import { Types, Model } from "mongoose";

interface IBook {
  title: string;
  author: string;
  genre: string;
  isbn: number;
  description: string;
  copies: number;
  avaiable: boolean;
}

interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

interface borrowModelType extends Model<IBorrow> {
  borrowBook: (
    this: Model<IBorrow>,
    args: { book: Types.ObjectId; quantity: number; dueDate: Date }
  ) => Promise<IBorrow>;
}
export type { IBook, IBorrow, borrowModelType };
