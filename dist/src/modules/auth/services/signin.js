"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signin_1 = __importDefault(require("../db/signin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const signinService = async (data) => {
    const user = await (0, signin_1.default)(data);
    const isPasswordCorrect = bcrypt_1.default.compareSync(data.password, user?.password);
    if (isPasswordCorrect) {
        if (!process.env.JWT_SECRET) {
            throw new Error("❌ JWT_SECRET is not defined in environment variables.");
        }
        let token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);
        return {
            user,
            token: token,
            success: true,
        };
    }
    else {
        return { success: false };
    }
};
exports.default = signinService;
