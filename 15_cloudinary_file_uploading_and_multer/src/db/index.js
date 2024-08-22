import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`,
    );
    console.log(
      `MONGODB connected successfully || Hosted at ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log(`MONGODB connection failed!!! Error: ${error}`);
    process.exit(1);
  }
};
