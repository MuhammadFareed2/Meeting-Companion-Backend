import { Router } from "express";
import authRoutes from "../modules/auth/routes";
import transcriptRoutes from "../modules/transcript/routes";
import meetingRoutes from "../modules/meeting/index";
import minutesOfTheMeetingRoutes from "../modules/mom/index";

const router = Router();

router.use("/auth", authRoutes);
router.use("/transcript", transcriptRoutes);
router.use("/meeting", meetingRoutes);
router.use("/mom", minutesOfTheMeetingRoutes);

export default router;
