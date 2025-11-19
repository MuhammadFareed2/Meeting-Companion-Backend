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
const upload_1 = __importDefault(require("../services/upload"));
const fs_1 = __importDefault(require("fs"));
const uploadMeetingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const body = req.body;
        const response = yield (0, upload_1.default)(filePath, req.user.userId, body);
        fs_1.default.unlinkSync(filePath);
        res.send(response);
    }
    catch (err) {
        res.send(err);
    }
});
exports.default = uploadMeetingController;
