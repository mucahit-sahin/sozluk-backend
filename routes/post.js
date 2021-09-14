import express from "express";

import {
  addCommentToPost,
  createPost,
  getLastPosts,
  getPost,
  isTherePost,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getLastPosts);
router.post("/", auth, createPost);
router.post("/:id", auth, addCommentToPost);
router.get("/isthere/:title", isTherePost);
router.get("/:id", getPost);

export default router;
