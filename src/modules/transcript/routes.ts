import { RequestHandler, Router } from "express";
import createTranscriptController from "./controllers/create.ts";
import authMiddleware from "../../helpers/authMiddleware.ts";
import editTranscriptController from "./controllers/edit.ts";

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
