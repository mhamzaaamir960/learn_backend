import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subTodos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTodos",
    },
  ],
});

export const Todo = mongoose.model("Todo", todoSchema);
