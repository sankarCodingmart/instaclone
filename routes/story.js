import express from "express";
import { verifyToken } from "../middleware";
import createStory from "../services/stories/createStory";
import deleteStory from "../services/stories/deleteStory";
import viewStory from "../services/stories/viewStory";
const router = express.Router();

router.post("/createStory", verifyToken, createStory);
router.post("/deleteStory", verifyToken, deleteStory);
router.post("/viewStory", verifyToken, viewStory);
export default router;
