"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_1 = __importDefault(require("../services/edit"));
const editTranscriptController = async (req, res) => {
    if (typeof req.body.text === "string") {
        req.body.text = req.body.text.replace(/\s+/g, " ").trim();
    }
    if (typeof req.body.speaker === "string") {
        req.body.speaker = req.body.speaker.replace(/\s+/g, " ").trim();
    }
    try {
        const transcript = await (0, edit_1.default)(req.body);
        res.status(200).send(transcript);
    }
    catch (err) {
        res.send(err);
    }
};
exports.default = editTranscriptController;
