import express from "express";
import { service } from "../services";
import { verifyToken } from "../middleware";
const router = express.Router();

router.get("/:userId/followers", verifyToken, service.getFollowers);
router.get("/:userId/following", verifyToken, service.getFollowing);
router.post("/acceptRequest", verifyToken, service.acceptRequest);
router.post("/makeRequest", verifyToken, service.makeRequest);
router.post("/addFollower", verifyToken, service.addFollower);
router.post("/makeCloseFriend", verifyToken, service.makeCloseFriends);
router.delete("/unfollow", verifyToken, service.unfollow);
router.delete("/removeCloseFriend", verifyToken, service.removeCloseFriends);

export default router;
