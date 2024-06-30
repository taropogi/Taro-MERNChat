import express from "express";
const router = express.Router();

import protectRoute from "../middleware/protectRoute.js";

import { sendMessage } from "../controllers/message.js";

router.post("/send/:id", protectRoute, sendMessage);

export default router;
