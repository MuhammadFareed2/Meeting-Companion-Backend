"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generate_1 = __importDefault(require("./controllers/generate"));
const router = (0, express_1.Router)();
router.post("/generate", generate_1.default);
exports.default = router;
