"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(403).send({
            status: 403,
            message: "No authorization header provided.",
        });
    }
    const token = authorization.split(" ")[1];
    if (!process.env.JWT_SECRET) {
        throw new Error("❌ DB_URL is not defined in environment variables.");
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({
                status: 403,
                message: "Token verification failed.",
            });
        }
        req.user = user;
        next();
    });
};
exports.default = authMiddleware;
