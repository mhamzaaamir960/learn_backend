import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true,
  },
});
