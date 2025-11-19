"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup_1 = __importDefault(require("../db/signup"));
require("dotenv/config");
const signupService = async (data) => {
    const password = bcrypt_1.default.hashSync(data.password, 10);
    data.password = password;
    const response = await (0, signup_1.default)(data);
    if (response.success == true) {
        if (!process.env.JWT_SECRET) {
            throw new Error("❌ JWT_SECRET is not defined in environment variables.");
        }
        let token = jsonwebtoken_1.default.sign({ userId: response.user._id, email: response.user.email }, process.env.JWT_SECRET);
        const resObj = {
            ...response,
            token,
        };
        return resObj;
    }
    else if (response.success == false) {
        return { success: false };
    }
    else {
        return response;
    }
};
exports.default = signupService;
