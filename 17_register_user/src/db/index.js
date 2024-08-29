import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstanse = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );
    console.log(
      `MongoDB connected successfully! || Hosted at: ${connectionInstanse.connection.host}`,
    );
  } catch (error) {
    console.log(`MongoDB connection failed! || Error: ${error}`);
    process.exit(1);
  }
};
