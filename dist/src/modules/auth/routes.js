"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_1 = __importDefault(require("./controllers/signup"));
const signupOtp_1 = __importDefault(require("./controllers/signupOtp"));
const signin_1 = __importDefault(require("./controllers/signin"));
const router = (0, express_1.Router)();
router.post("/signup-otp", signupOtp_1.default);
router.post("/signup", signup_1.default);
router.post("/signin", signin_1.default);
exports.default = router;
