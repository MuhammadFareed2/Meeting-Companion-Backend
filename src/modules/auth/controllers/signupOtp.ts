import { Request, Response } from "express";
import signupOtpService from "../services/signupOtp.ts";
const signupOtpController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    req.body.email = req.body.email.trim();
    const response = await signupOtpService(req.body);

    res.send(response);
  } catch (err) {
    res.send(err);
  }
};

export default signupOtpController;
