import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
    },
    watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
