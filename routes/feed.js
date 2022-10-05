import express from "express";
import { service } from "../services";
import { verifyToken } from "../middleware";
const router = express.Router();

router.get(
  "/:userId/explore/search/:userName",
  verifyToken,
  service.searchProfile
);
router.post("/explore/search", verifyToken, service.searchExplore);
router.get("/:userId/profilePage", verifyToken, service.getProfilePage);
router.get("/messages", verifyToken, service.getMessagePage);
router.get("/:userId/other/:targetId", verifyToken, service.getOtherProfile);
router.get(
  "/:userId/post/:postId/viewComments",
  verifyToken,
  service.viewComments
);
router.get("/:userId/explore/:postId", verifyToken, service.viewPosts);
router.get("/:userId/explore", verifyToken, service.getExploreContent);
router.get("/:userId/notifications", verifyToken, service.getActivities);
router.get("/more/:offset", verifyToken, service.getMorePosts);
router.get("/:userId", verifyToken, service.getFeedContent);
export default router;
