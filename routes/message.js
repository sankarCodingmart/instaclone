import express from "express";
import { service } from "../services";
import { verifyToken } from "../middleware";
const router = express.Router();

router.post("/", verifyToken, service.createMessage);
router.delete("/", verifyToken, service.deleteMessage);
export default router;
