"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meetingModel_1 = __importDefault(require("../../../../mongodb/meetingModel"));
const uploadMeetingDB = async (data, id, body) => {
    try {
        const obj = {
            user: id,
            meetingAudio: data,
            meetingName: body.meetingName,
        };
        const meeting = await meetingModel_1.default.create(obj);
        return meeting;
    }
    catch (err) {
        throw err;
    }
};
exports.default = uploadMeetingDB;
