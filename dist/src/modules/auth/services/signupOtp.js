"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signupOtp_1 = __importDefault(require("../db/signupOtp"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const signupOtpService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = crypto_1.default.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 100000);
    const dataWithOtp = Object.assign(Object.assign({}, data), { otp, otpExpiry });
    const response = yield (0, signupOtp_1.default)(dataWithOtp);
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
        yield transporter.sendMail(mailOptions);
        return { success: true };
    }
    else if (response.success == false) {
        return { success: false };
    }
    else {
        return response;
    }
});
exports.default = signupOtpService;
