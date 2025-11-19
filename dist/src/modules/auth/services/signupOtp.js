"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signupOtp_1 = __importDefault(require("../db/signupOtp"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const signupOtpService = async (data) => {
    const otp = crypto_1.default.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 100000);
    const dataWithOtp = { ...data, otp, otpExpiry };
    const response = await (0, signupOtp_1.default)(dataWithOtp);
    if (response.success == true) {
        const transporter = nodemailer_1.default.createTransport({
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
    }
    else if (response.success == false) {
        return { success: false };
    }
    else {
        return response;
    }
};
exports.default = signupOtpService;
