import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  changePassword,
  getCurrentUser,
  getUserProfile,
  getWatchHistory,
  refreshAccessToken,
  udpateUserAvatar,
  updateAccountDetails,
  updateUserCoverImage,
  userLogIn,
  userLogOut,
  userRegister,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  userRegister,
);
router.route("/login").post(userLogIn);

// secured routes
router.route("/logout").post(verifyJwt, userLogOut);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-passsword").patch(verifyJwt, changePassword);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/update-account-details").patch(verifyJwt, updateAccountDetails);
router
  .route("/update-avatar")
  .patch(verifyJwt, upload.single("avatar"), udpateUserAvatar);
router
  .route("/update-cover-image")
  .patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage);
router.route("/c/:username").get(verifyJwt, getUserProfile);
router.route("/watch-history").get(verifyJwt, getWatchHistory);

export default router;
