import { Request, Response } from "express";
import signinService from "../services/signin";

const signinController = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await signinService(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export default signinController;
