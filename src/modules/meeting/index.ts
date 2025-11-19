import { RequestHandler, Router } from "express";
import uploadMeetingController from "./controllers/upload";
import upload from "../../helpers/multerMiddleware";
import authMiddleware from "../../helpers/authMiddleware";

const router = Router();
router.post(
  "/upload",
  authMiddleware as unknown as RequestHandler,
  upload.single("video"),
  uploadMeetingController
);

export default router;
