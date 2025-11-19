import { Router } from "express";
import signupController from "./controllers/signup";
import signupOtpController from "./controllers/signupOtp";
import signinController from "./controllers/signin";

const router = Router();

router.post("/signup-otp", signupOtpController);
router.post("/signup", signupController);
router.post("/signin", signinController);
export default router;
