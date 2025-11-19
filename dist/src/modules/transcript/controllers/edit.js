"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_1 = __importDefault(require("../services/edit"));
const editTranscriptController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.body.text === "string") {
        req.body.text = req.body.text.replace(/\s+/g, " ").trim();
    }
    if (typeof req.body.speaker === "string") {
        req.body.speaker = req.body.speaker.replace(/\s+/g, " ").trim();
    }
    try {
        const transcript = yield (0, edit_1.default)(req.body);
        res.status(200).send(transcript);
    }
    catch (err) {
        res.send(err);
    }
});
exports.default = editTranscriptController;
