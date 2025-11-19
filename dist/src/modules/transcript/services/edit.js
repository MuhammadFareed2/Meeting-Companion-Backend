"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_1 = __importDefault(require("../db/edit"));
const editTranscriptService = async (data) => {
    const meeting = await (0, edit_1.default)(data);
    return meeting;
};
exports.default = editTranscriptService;
