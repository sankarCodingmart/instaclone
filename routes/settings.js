import express from "express";
import editProfile from "../services/settings/editProfile";
import { verifyToken } from "../middleware";
const router = express.Router();

router.post("/editProfile", verifyToken, editProfile);

export default router;
