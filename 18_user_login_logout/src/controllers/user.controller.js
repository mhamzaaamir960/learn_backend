import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../../../17_register_user/src/utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token!",
    );
  }
};

// register controller

const userRegister = asyncHandler(async (req, res) => {
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
  console.log(avatarLocalPath);
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
  if (!coverImage) {
    throw new ApiError(400, "cover Image is required.");
  }

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

// Login in controller

const userLogIn = asyncHandler(async (req, res) => {
  // get username or email from frontend
  // find user in db using username or email
  // compare password
  // generate access and refresh token
  // send cookies

  const { username, email, password } = req.body;
  console.log(email);

  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  console.log(user);

  if (!user) {
    throw new ApiError(404, "User not exist!");
  }

  const isPasswordValid = user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const logedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: logedInUser,
          accessToken,
          refreshToken,
        },
        "User logedIn successfully!",
      ),
    );
});

// logout controller
const userLogOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      refreshToken: undefined,
    },
  }),
    {
      new: true,
    };

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User LogedOut Succesfully!"));
});

// refresh token controller

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incommingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incommingRefreshToken) {
    throw new ApiError(401, "Un-authorized Request");
  }

  try {
    const decodedToken = jwt.verify(
      incommingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh Token");
    }

    if (incommingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id,
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { userRegister, userLogIn, userLogOut, refreshAccessToken };
