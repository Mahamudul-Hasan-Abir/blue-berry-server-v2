import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";

const dbUrl = process.env.DB_URL;
const port = 5200;

main().catch((err) => console.log(err));

async function main() {
  try {
    if (!dbUrl) {
      throw new Error("Database URL not defined in environment variables");
    }

    await mongoose.connect(dbUrl);
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
