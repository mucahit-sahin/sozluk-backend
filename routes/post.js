import express from "express";

import { getLastPosts, getPost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getLastPosts);
router.get("/:id", getPost);

export default router;
