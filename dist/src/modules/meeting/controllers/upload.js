"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = __importDefault(require("../services/upload"));
const fs_1 = __importDefault(require("fs"));
const uploadMeetingController = async (req, res) => {
    try {
        const filePath = req.file?.path;
        const body = req.body;
        const response = await (0, upload_1.default)(filePath, req.user.userId, body);
        fs_1.default.unlinkSync(filePath);
        res.send(response);
    }
    catch (err) {
        res.send(err);
    }
};
exports.default = uploadMeetingController;
