import express from "express";

import { getAgenda } from "../controllers/agenda.js";

const router = express.Router();

router.get("/", getAgenda);

export default router;
