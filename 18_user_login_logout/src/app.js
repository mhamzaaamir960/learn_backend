import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentsRouter from "./routes/comment.routes.js";
import likesRouter from "./routes/like.routes.js";
import tweetsRouter from "./routes/tweet.routes.js";
import playlistRouter from "./routes/playlist.routes.js";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/likes", likesRouter);
app.use("/api/v1/tweets", tweetsRouter);
app.use("/api/v1/playlist", playlistRouter);
