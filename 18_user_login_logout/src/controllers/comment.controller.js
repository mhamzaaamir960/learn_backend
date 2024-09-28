import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Comment } from "../models/comment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

// get all comments controller
const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const comments = await Comment.aggregatePaginate(
    { video: videoId },
    {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: "desc" },
      customLabels: {
        docs: "comments",
      },
    },
  );

  if (!comments) {
    throw new ApiError(404, "Comments not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { comments }, "Comments are fetched successfully!"),
    );
});

// add new comment controller
const addComment = asyncHandler(async (req, res) => {
  // get data from frontnend
  // validation
  // create field in db
  // find and check the commnet field is created or not
  // return res

  // get data from frontend
  const { videoId } = req.params;
  const { content } = req.body;

  // validate the commnet is existed
  if (!content || content.trim() === "") {
    throw new ApiError("Comment is required");
  }

  // create field for comment in the db
  const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id,
  });

  if (!comment) {
    throw new ApiError(500, "Error while posting comment!");
  }

  // return the 200 response if all upper done
  return res
    .status(200)
    .json(new ApiResponse(200, { comment }, "Comment posted successfully!"));
});

// updatecomment controller
const updateComment = asyncHandler(async (req, res) => {
  // get updated comment from frontend
  // check validation
  // compare the updated comment with db previous comment is any change

  const { commentId } = req.params;
  const { content } = req.body;

  if (isValidObjectId(commentId)) {
    throw new ApiError(400, "Comment id is invalid");
  }

  if (!content || !content.trim() === "") {
    throw new ApiError("Comment is required");
  }

  const compareComment = await Comment.content(content);

  if (!compareComment) {
    throw new ApiError("Comment is not updated");
  }

  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    },
  );

  if (!comment) {
    throw new ApiError(500, "Error while updating comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment updated successfully"));
});

// delete comment controller
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (isValidObjectId(commentId)) {
    throw new ApiError(400, "Comment id is invalid");
  }

  const comment = await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment is deleted successfully!"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
