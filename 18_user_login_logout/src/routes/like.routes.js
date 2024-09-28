import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware";
import {
  getLikedVideos,
  toggleCommentLike,
  toggleTweetLike,
  toogleVideoLike,
} from "../controllers/like.controller";

const router = Router();
router.use(verifyJwt);

router.route("/toggle/v/:videoId").post(toogleVideoLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/videos").get(getLikedVideos);

export default router;
