import { Router } from "express";
import authRoutes from "../modules/auth/routes.ts";
import transcriptRoutes from "../modules/transcript/routes.ts";
import meetingRoutes from "../modules/meeting/index.ts";
import minutesOfTheMeetingRoutes from "../modules/mom/index.ts";

const router = Router();

router.use("/auth", authRoutes);
router.use("/transcript", transcriptRoutes);
router.use("/meeting", meetingRoutes);
router.use("/mom", minutesOfTheMeetingRoutes);

export default router;
