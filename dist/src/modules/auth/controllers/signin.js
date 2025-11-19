"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signin_1 = __importDefault(require("../services/signin"));
const signinController = async (req, res) => {
    try {
        const user = await (0, signin_1.default)(req.body);
        res.status(201).send(user);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.default = signinController;
