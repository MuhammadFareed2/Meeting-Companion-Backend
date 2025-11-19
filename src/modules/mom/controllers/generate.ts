import { Request, Response } from "express";
import generateMomService from "../services/generate.ts";

const generateMomController = async (req: Request, res: Response) => {
  try {
    const mom = await generateMomService(req.body);
    res.send(mom);
  } catch (err) {
    res.send(err);
  }
};

export default generateMomController;
