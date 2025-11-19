import { Router } from "express";
import generateMomController from "./controllers/generate";

const router = Router();
router.post("/generate", generateMomController);

export default router;
