import { Request, Response } from "express";
import signinService from "../services/signin";

const signinController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Signin request body:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await signinService({ email, password });

    if (!user.success) {
      res.status(400).json(user);
      return;
    }

    res.status(200).json(user);
  } catch (err: any) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default signinController;
