import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Tweet } from "../models/tweet.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

const createTweet = asyncHandler(async (req, res) => {
  const { tweet } = req.body;

  if (!tweet) {
    throw new ApiError(400, "Tweet is required!");
  }

  const addTweet = await Tweet.create({
    tweet,
    owner: req.user._id,
  });

  if (!addTweet) {
    throw new ApiError(500, "Error while uploading tweet!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet uploaded successfully!"));
});

const getUserTweets = asyncHandler(async (req,res) => {
    
})


export {
    createTweet,
    getUserTweets
}
