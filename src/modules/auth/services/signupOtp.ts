import signupOtpDB from "../db/signupOtp";
import crypto from "crypto";
import nodemailer from "nodemailer";
import "dotenv/config";

const signupOtpService = async (data: any) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 100000);

  const dataWithOtp = { ...data, otp, otpExpiry };
  const response: any = await signupOtpDB(dataWithOtp);

  if (response.success == true) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.OTP_EMAIL,
        pass: process.env.OTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.OTP_EMAIL,
      to: data.email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } else if (response.success == false) {
    return { success: false };
  } else {
    return response;
  }
};

export default signupOtpService;
