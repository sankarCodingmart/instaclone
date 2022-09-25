import express from "express";
import createPost from "../services/posts/createPost";
import { verifyToken } from "../middleware";
const router = express.Router();

router.post("/createPost", verifyToken, createPost);

export default router;
