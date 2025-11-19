import { Request, Response } from "express";
import createTranscriptService from "../services/create.ts";

const createTranscriptController = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const transcript = await createTranscriptService(req.body);
    res.status(200).send(transcript);
  } catch (err) {
    res.send(err);
  }
};

export default createTranscriptController;
