import express from "express";
import { service } from "../services";
import { verifyToken } from "../middleware";
const router = express.Router();

router.get("/:userId/profilePage", verifyToken, service.getProfilePage);
router.get("/:userId/explore", verifyToken, service.getExploreContent);
router.get("/:userId/explore/:postId", verifyToken, service.viewPosts);
router.get("/:userId/notifications", verifyToken, service.getActivities);
router.get("/:userId", verifyToken, service.getFeedContent);
export default router;
