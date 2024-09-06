import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../../../17_register_user/src/utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../../../17_register_user/src/utils/ApiResponse.js";

export const userRegister = asyncHandler(async (req, res) => {
  // get data from req
  // validation - not empty
  // check user already exists: username or email
  // check for images and avatar
  // upload on cloudinary
  // create field in the database
  // remove password and refreshToken from response
  // check for user creation
  // return response

  const { username, fullName, email, password } = req.body;

  if (
    [username, fullName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  // to check the user if already exists or not using username and email in db
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists.");
  }
  

  // path of the avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(avatarLocalPath)
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required.");
  }

   // cover image path
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }


  // avatar uploaded on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar is required.");
  }

  // coverImage uploaded on cloudinary
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  

  // user field created in db
  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
  });


  // when data get password and refresh token is ignored
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    console.log(createdUser);
    throw new ApiError(500, "Something went wrong while registring the user.");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully!"));
});

const userLongin = asyncHandler(async (req,res) => {
  
})
