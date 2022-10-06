import { verifySignUp } from "../middleware";
import express from "express";
import { service } from "../services";
const router = express.Router();
// router.get("/hello", (req, res) => {
//   res.send("hello");
// });
router.post("/generateOtp", service.generateOtp);
router.post("/resendOtp", service.resendOtp);
router.post("/signup", verifySignUp, service.signUp);
router.post("/login", service.signIn);

export default router;
