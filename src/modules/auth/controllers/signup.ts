import { Request, Response } from "express";
import signupService from "../services/signup";
const signupController = async (req: Request, res: Response): Promise<void> => {
  try {
    req.body.email = req.body.email.trim();
    req.body.username = req.body.username.trim();
    const user = await signupService(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export default signupController;