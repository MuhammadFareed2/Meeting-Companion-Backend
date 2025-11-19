import { Request, Response } from "express";
import uploadMeetingService from "../services/upload.ts";
import fs from "fs";

interface AuthenticatedRequest extends Request {
  user?: any;
}
const uploadMeetingController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const filePath: any = req.file?.path;
    const body: any = req.body;
    const response = await uploadMeetingService(
      filePath,
      req.user.userId,
      body
    );
    fs.unlinkSync(filePath);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
};

export default uploadMeetingController;
