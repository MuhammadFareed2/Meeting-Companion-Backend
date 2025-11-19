import { Router } from "express";
import signupController from "./controllers/signup.ts";
import signupOtpController from "./controllers/signupOtp.ts";
import signinController from "./controllers/signin.ts";

const router = Router();

router.post("/signup-otp", signupOtpController);
router.post("/signup", signupController);
router.post("/signin", signinController);
export default router;
