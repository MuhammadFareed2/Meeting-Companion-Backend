"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = __importDefault(require("../services/create"));
const createTranscriptController = async (req, res) => {
    console.log(req.body);
    try {
        const transcript = await (0, create_1.default)(req.body);
        res.status(200).send(transcript);
    }
    catch (err) {
        res.send(err);
    }
};
exports.default = createTranscriptController;
