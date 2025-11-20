import { Request, Response } from "express";
import signinService from "../services/signin";

const signinController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Log the request body to debug empty/malformed requests
    console.log("Signin request body:", req.body);

    // Validate required fields
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Call service
    const user = await signinService({ email, password });
    res.status(200).json(user);
  } catch (err: any) {
    console.error("Signin error:", err); // log for debugging
    res.status(500).json({ error: "Internal server error" });
  }
};

export default signinController;
