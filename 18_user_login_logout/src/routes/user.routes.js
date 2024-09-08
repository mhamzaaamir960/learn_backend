import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
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

router.route("/logout").post(verifyJwt, userLogOut);
export default router;
