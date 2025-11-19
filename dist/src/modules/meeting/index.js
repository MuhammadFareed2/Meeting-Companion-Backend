"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = __importDefault(require("./controllers/upload"));
const multerMiddleware_1 = __importDefault(require("../../helpers/multerMiddleware"));
const authMiddleware_1 = __importDefault(require("../../helpers/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/upload", authMiddleware_1.default, multerMiddleware_1.default.single("video"), upload_1.default);
exports.default = router;
