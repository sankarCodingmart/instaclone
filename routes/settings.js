import express from "express";
import { service } from "../services";
import { verifyToken } from "../middleware";
const router = express.Router();

router.patch("/editProfile", verifyToken, service.editProfile);
router.patch("/changeAccountType", verifyToken, service.changeAccountType);
router.patch(
  "/changeAccountPrivacy",
  verifyToken,
  service.changeAccountPrivacy
);
export default router;
