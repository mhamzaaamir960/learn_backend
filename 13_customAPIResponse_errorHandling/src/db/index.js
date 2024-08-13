import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`,
    );
    console.log(
      `MongoDB connected successfully!! || Host : ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error(`Error: MongoDB connection Failed!! ${error}`);
    throw error;
  }
};
