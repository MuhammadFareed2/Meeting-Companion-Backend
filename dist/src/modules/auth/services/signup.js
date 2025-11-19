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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup_1 = __importDefault(require("../db/signup"));
require("dotenv/config");
const signupService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const password = bcrypt_1.default.hashSync(data.password, 10);
    data.password = password;
    const response = yield (0, signup_1.default)(data);
    if (response.success == true) {
        if (!process.env.JWT_SECRET) {
            throw new Error("❌ JWT_SECRET is not defined in environment variables.");
        }
        let token = jsonwebtoken_1.default.sign({ userId: response.user._id, email: response.user.email }, process.env.JWT_SECRET);
        const resObj = Object.assign(Object.assign({}, response), { token });
        return resObj;
    }
    else if (response.success == false) {
        return { success: false };
    }
    else {
        return response;
    }
});
exports.default = signupService;
