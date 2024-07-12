import express from "express";
const router = express.Router();
import protectRoute from "../middleware/protectRoute.js";
import { reset } from "../controllers/cleanup.js";

router.get("/cleanup", protectRoute, reset);

export default router;
