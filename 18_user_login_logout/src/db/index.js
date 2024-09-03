import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );
    console.log(
      `Mongo DB connected successfully! Hosted at ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error(`Mongo DB connetion failed! Error:  ${error}`);
    process.exit(1);
  }
};
