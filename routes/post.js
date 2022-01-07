import express from "express";

import {
  addCommentToPost,
  addLikeToComment,
  createPost,
  getLastPosts,
  getPost,
  isTherePost,
  removeLikeToComment,
  addDislikeToComment,
  removeDislikeToComment,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getLastPosts);
router.post("/", auth, createPost);
router.post("/:id", auth, addCommentToPost);
router.get("/isthere/:title", isTherePost);
router.get("/:id", getPost);
// like and dislike post
router.post("/:id/like/:commentid", auth, addLikeToComment);
router.post("/:id/unlike/:commentid/", auth, removeLikeToComment);
router.post("/:id/dislike/:commentid/", auth, addDislikeToComment);
router.post("/:id/undislike/:commentid/", auth, removeDislikeToComment);

export default router;
