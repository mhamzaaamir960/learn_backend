import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  refreshAccessToken,
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
export default router;
