"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signup_1 = __importDefault(require("../services/signup"));
const signupController = async (req, res) => {
    try {
        req.body.email = req.body.email.trim();
        req.body.username = req.body.username.trim();
        const user = await (0, signup_1.default)(req.body);
        res.status(201).send(user);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.default = signupController;
