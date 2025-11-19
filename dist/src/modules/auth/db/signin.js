"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../../../mongodb/userModel"));
const signinDB = async (data) => {
    try {
        const user = await userModel_1.default.findOne({ email: data.email });
        console.log(user);
        return user;
    }
    catch (err) {
        throw err;
    }
};
exports.default = signinDB;
