import { Request, Response } from "express";
import editTranscriptService from "../services/edit.ts";

const editTranscriptController = async (req: Request, res: Response) => {
  if (typeof req.body.text === "string") {
    req.body.text = req.body.text.replace(/\s+/g, " ").trim();
  }
  if (typeof req.body.speaker === "string") {
    req.body.speaker = req.body.speaker.replace(/\s+/g, " ").trim();
  }
  try {
    const transcript = await editTranscriptService(req.body);
    res.status(200).send(transcript);
  } catch (err) {
    res.send(err);
  }
};

export default editTranscriptController;
