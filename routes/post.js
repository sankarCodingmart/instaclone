import express from "express";
import { service } from "../services";
import { verifyToken } from "../middleware";
const router = express.Router();

router.get("/:userId/taggedPosts", verifyToken, service.getTaggedPosts);
router.post("/savePost", verifyToken, service.savePosts);
router.post("/unsavePost", verifyToken, service.unSavePost);
router.get("/getSavedGrp", verifyToken, service.getSavedPostGroups);
router.get("/getSavedPosts", verifyToken, service.getSavedPosts);
router.post("/createComment", verifyToken, service.createComment);
router.patch("/updateLikes", verifyToken, service.updateLikes);
router.patch("/unlike", verifyToken, service.unlike);
router.patch("/archivePost", service.archivePost);
router.post("/", verifyToken, service.createPost);
router.delete("/", verifyToken, service.deletePost);
export default router;
