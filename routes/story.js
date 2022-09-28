import express from "express";
import { verifyToken } from "../middleware";
import { service } from "../services";
const router = express.Router();

router.get(
  "/:userId/highlight/:highlightId",
  verifyToken,
  service.viewHighlight
);
router.post("/:userId/highlight", verifyToken, service.createHighlight);
router.get("/:userId", verifyToken, service.viewStory);
router.post("/", verifyToken, service.createStory);
router.delete("/", verifyToken, service.deleteStory);
export default router;
