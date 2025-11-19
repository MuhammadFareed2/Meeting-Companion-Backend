"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_1 = __importDefault(require("./controllers/create"));
const authMiddleware_1 = __importDefault(require("../../helpers/authMiddleware"));
const edit_1 = __importDefault(require("./controllers/edit"));
const router = (0, express_1.Router)();
router.post("/create", authMiddleware_1.default, create_1.default);
router.put("/edit", authMiddleware_1.default, edit_1.default);
exports.default = router;
