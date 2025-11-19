"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meetingModel_1 = __importDefault(require("../../../../mongodb/meetingModel"));
const generateMomDB = async (data, id) => {
    try {
        const meeting = await meetingModel_1.default
            .findByIdAndUpdate(id, {
            minutesOfTheMeeting: data,
        }, { new: true })
            .lean();
        return meeting;
    }
    catch (err) {
        throw err;
    }
};
exports.default = generateMomDB;
