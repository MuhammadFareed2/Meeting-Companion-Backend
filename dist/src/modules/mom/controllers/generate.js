"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = __importDefault(require("../services/generate"));
const generateMomController = async (req, res) => {
    try {
        const mom = await (0, generate_1.default)(req.body);
        res.send(mom);
    }
    catch (err) {
        res.send(err);
    }
};
exports.default = generateMomController;
