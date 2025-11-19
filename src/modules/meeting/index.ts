import { RequestHandler, Router } from "express";
import uploadMeetingController from "./controllers/upload.ts";
import upload from "../../helpers/multerMiddleware.ts";
import authMiddleware from "../../helpers/authMiddleware.ts";

const router = Router();
router.post(
  "/upload",
  authMiddleware as unknown as RequestHandler,
  upload.single("video"),
  uploadMeetingController
);

export default router;
