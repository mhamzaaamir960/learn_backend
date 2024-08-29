import { asyncHandler } from "../utils/asyncHandler.js";

export const userRegister = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "success",
  // });
  // get user details from frontend
  // validation - any empty
  // check user exits already: username or email
  // check for images and avatar
  // upload then to cloudinary
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response




  const { username, email, fullName, password } = req.body

  
});
