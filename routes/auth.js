import { verifySignUp } from "../middleware";
import express from "express";
import { signIn, signUp } from "../services/auth/authService";
import generateOtp from "../services/auth/generateOtp";
const router = express.Router();
// router.get("/hello", (req, res) => {
//   res.send("hello");
// });
router.post("/generateOtp", generateOtp);
router.post("/signup", signUp);
router.post("/login", signIn);

export default router;
