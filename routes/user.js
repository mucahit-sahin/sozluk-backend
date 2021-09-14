import express from "express";
const router = express.Router();

import { authUser, signin, signup } from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.get("/auth", auth, authUser);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
