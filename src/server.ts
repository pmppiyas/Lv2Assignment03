import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 3000;

let server: Server;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://L2ass3:LGBmkUXwHKTSZSrK@cluster0.fk8o9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(port);

    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error from server", error);
    process.exit(1);
  }
}

main();
