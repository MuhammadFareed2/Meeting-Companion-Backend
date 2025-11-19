import { RequestHandler, Router } from "express";
import createTranscriptController from "./controllers/create";
import authMiddleware from "../../helpers/authMiddleware";
import editTranscriptController from "./controllers/edit";

const router = Router();
router.post(
  "/create",
  authMiddleware as unknown as RequestHandler,
  createTranscriptController
);
router.put(
  "/edit",
  authMiddleware as unknown as RequestHandler,
  editTranscriptController
);

export default router;
