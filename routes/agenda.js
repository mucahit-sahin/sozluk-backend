import express from "express";

import { getAgenda, getYesterdayLikedPosts } from "../controllers/agenda.js";

const router = express.Router();

router.get("/", getAgenda);
router.get("/mostliked", getYesterdayLikedPosts);

export default router;
