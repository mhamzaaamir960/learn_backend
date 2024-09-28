import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";
import { isValidObjectId } from "mongoose";

// get all videos controller
const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, sortBy, sortType, userId } = req.query;
  const videos = await Video.aggregatePaginate(search, {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { [sortBy]: sortType },
    userId: isValidObjectId(userId) ? userId : null,
    customLabels: {
      docs: "Videos",
    },
  });

  if (!videos) {
    throw new ApiError(404, "Videos not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { videos }, "Videos fetched successfully!"));
});

// video published controller
const publishVideo = asyncHandler(async (req, res) => {
  // get video title and description from frontnend
  // get video and thumbnail file from frontend
  // upload on cloudinary
  // validation
  // create video field
  // return response

  const { title, description } = req.body;

  if ([title, description].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const thumbnailLocalFile = req.files?.thumbnail[0]?.path;
  const videoLocalFile = req.files?.videoFile[0]?.path;

  if (!thumbnailLocalFile && !videoLocalFile) {
    throw new ApiError("All fields are required");
  }

  const thumbnailFile = await uploadOnCloudinary(thumbnailLocalFile);
  if (!thumbnail) {
    throw new ApiError(500, "Thumbnail error while uploading on cloudinary");
  }

  const videoFile = await uploadOnCloudinary(videoLocalFile);
  if (!video) {
    throw new ApiError(500, "Video error while uploading on cloudinary");
  }

  const video = await Video.create({
    title,
    description,
    video: videoFile.url,
    thumbnail: thumbnailFile.url,
    owner: req.user._id,
    duration: videoFile.duration,
  });

  if (!video) {
    throw new ApiError(500, "Video error while publishing");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { video }, "Video published successfully!"));
});

// getvideo by id controller
const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { video }, "Video fetched successfully"));
});

// updateVideo controller
const updateVideoDetails = asyncHandler(async (req, res) => {
  // get videoid by req.params
  // check id is valid or not
  // find video by id
  // get title and description from req.body
  // add validation on title and description
  // find title and description from db and update it
  // retrun response

  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Video id is invalid");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new (404, "Video not found!")();
  }

  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnail) {
    throw new ApiError(500, "Error while thumbnail uploading!");
  }

  const { title, description } = req.body;

  if ([title, description].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "Title and description both are required");
  }

  const updateDetails = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: thumbnail.url,
      },
    },
    {
      new: true,
    },
  );

  if (!updateDetails) {
    throw new ApiError(500, "Error while updating title and description!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video details updated successfully!"));
});

// delete video controller
const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id!");
  }

  const video = await findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found!");
  }

  await Video.findByIdAndDelete(videoId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video deleted successfully!"));
});

// video publish controller
const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Video id is invalid");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found!");
  }

  video.isPublished = !video.isPublished;
  await video.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { videoPublishStatus: video.isPublished },
        "video publish status toggled successfully",
      ),
    );
});

export {
  getAllVideos,
  publishVideo,
  getVideoById,
  updateVideoDetails,
  deleteVideo,
  togglePublishStatus,
};
