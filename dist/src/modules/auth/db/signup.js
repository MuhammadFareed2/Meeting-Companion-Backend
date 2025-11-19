"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otpModel_1 = __importDefault(require("../../../../mongodb/otpModel"));
const userModel_1 = __importDefault(require("../../../../mongodb/userModel"));
const signupDB = async (data) => {
    try {
        const otpRes = await otpModel_1.default.findOne({ email: data.email });
        if (data.otp == otpRes.otp) {
            const user = await userModel_1.default.create(data);
            const resUser = { user, success: true };
            return resUser;
        }
        else {
            return { success: false };
        }
    }
    catch (err) {
        throw err;
    }
};
exports.default = signupDB;
