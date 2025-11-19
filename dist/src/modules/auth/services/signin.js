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
const signin_1 = __importDefault(require("../db/signin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const signinService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, signin_1.default)(data);
    const isPasswordCorrect = bcrypt_1.default.compareSync(data.password, user === null || user === void 0 ? void 0 : user.password);
    if (isPasswordCorrect) {
        if (!process.env.JWT_SECRET) {
            throw new Error("❌ JWT_SECRET is not defined in environment variables.");
        }
        let token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);
        return {
            user,
            token: token,
            success: true,
        };
    }
    else {
        return { success: false };
    }
});
exports.default = signinService;
