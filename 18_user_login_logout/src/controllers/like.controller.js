import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";
import { Tweet } from "../models/tweet.model.js";

const toogleVideoLike = asyncHandler(async (req, res) => {
  // get video id by req.params
  // validate id is correct
  // find the video in db
  //

  const { videoId } = req.params;

  if (isValidObjectId(videoId)) {
    throw new ApiError(400, "Video id is invalid!");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found!");
  }

  const existedLike = await Like.findOne({
    video: videoId,
    likedBy: req.user._id,
  });

  if (existedLike) {
    await Like.deleteOne({ video: videoId, likedBy: req.user._id });
  } else {
    await Like.create({ video: videoId, likedBy: req.user._id });
  }

  const hasUserLiked = existedLike ? false : true;
  const totalLikes = await Like.countDocuments({ video: videoId });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { hasUserLiked, totalLikes },
        "Toggled video like successfullyI",
      ),
    );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  const existingLike = await Like.findOne({
    comment: commentId,
    likedBy: req.user._id,
  });

  if (existingLike) {
    await Comment.deleteOne({ comment: commentId, likedBy: req.user._id });
  } else {
    await Comment.create({ comment: commentId, likedBy: req.user._id });
  }

  const hasUserLike = existingLike ? false : true;
  const totalLikes = await Like.countDocuments({ comment: commentId });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { hasUserLike, totalLikes },
        "Comment like toggled successfully!",
      ),
    );
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id");
  }

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  const existingLike = await Like.findOne({
    tweet: tweetId,
    likedBy: req.user._id,
  });

  if (existingLike) {
    await Tweet.deleteOne({ tweet: tweetId, likedBy: req.user._id });
  } else {
    await Tweet.create({ tweet: tweetId, likedBy: req.user._id });
  }

  const hasUserLike = existingLike ? false : true;
  const totalLikes = await Like.countDocuments({ tweet: tweetId });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { hasUserLike, totalLikes },
        "Tweet like toggled successfully!",
      ),
    );
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const likedVideos = await Like.find({
    likedBy: req.user._id,
    video: { $exists: true },
  }).populate("video");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { likedVideos },
        "Liked videos fetched successfully!",
      ),
    );
});

export { toogleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos };
