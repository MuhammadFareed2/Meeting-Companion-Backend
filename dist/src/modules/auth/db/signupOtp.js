"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otpModel_1 = __importDefault(require("../../../../mongodb/otpModel"));
const userModel_1 = __importDefault(require("../../../../mongodb/userModel"));
const signupOtpDB = async (data) => {
    try {
        const emailExists = await userModel_1.default.exists({ email: data.email });
        const { email, otp, otpExpiry } = data;
        if (emailExists == null) {
            const otpRes = await otpModel_1.default.findOneAndUpdate({ email }, { otp, otpExpiry }, {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            });
            // console.log(emailExists);
            let success = true;
            const resWithStatus = { ...otpRes, success };
            return resWithStatus;
        }
        else {
            return { success: false };
        }
    }
    catch (err) {
        throw err;
    }
};
exports.default = signupOtpDB;
