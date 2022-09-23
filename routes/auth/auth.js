import { verifySignUp } from "../../middleware";
import express from "express";
import { signIn, signUp } from "../../services/auth/authService";

const router = express.Router();
// router.get("/hello", (req, res) => {
//   res.send("hello");
// });
router.post("/signup", verifySignUp, signUp);
router.post("/signin", signIn);

export default router;
