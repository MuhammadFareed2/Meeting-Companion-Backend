"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signupOtp_1 = __importDefault(require("../services/signupOtp"));
const signupOtpController = async (req, res) => {
    try {
        req.body.email = req.body.email.trim();
        const response = await (0, signupOtp_1.default)(req.body);
        res.send(response);
    }
    catch (err) {
        res.send(err);
    }
};
exports.default = signupOtpController;
