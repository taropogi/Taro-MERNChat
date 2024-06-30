import express from "express";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
import { getUsersForSidebar } from "../controllers/user.js";

router.get("/", protectRoute, getUsersForSidebar);

export default router;
