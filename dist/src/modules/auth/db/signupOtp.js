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
const otpModel_1 = __importDefault(require("../../../../mongodb/otpModel"));
const userModel_1 = __importDefault(require("../../../../mongodb/userModel"));
const signupOtpDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExists = yield userModel_1.default.exists({ email: data.email });
        const { email, otp, otpExpiry } = data;
        if (emailExists == null) {
            const otpRes = yield otpModel_1.default.findOneAndUpdate({ email }, { otp, otpExpiry }, {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            });
            // console.log(emailExists);
            let success = true;
            const resWithStatus = Object.assign(Object.assign({}, otpRes), { success });
            return resWithStatus;
        }
        else {
            return { success: false };
        }
    }
    catch (err) {
        throw err;
    }
});
exports.default = signupOtpDB;
