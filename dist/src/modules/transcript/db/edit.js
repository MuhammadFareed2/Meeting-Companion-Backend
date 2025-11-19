"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meetingModel_1 = __importDefault(require("../../../../mongodb/meetingModel"));
const editTranscriptDB = async (data) => {
    try {
        const updateFields = {};
        if (data.speaker !== undefined) {
            updateFields["utterances.$.speaker"] = data.speaker;
        }
        if (data.text !== undefined) {
            updateFields["utterances.$.text"] = data.text;
        }
        const updated = await meetingModel_1.default
            .findOneAndUpdate({
            _id: data._id,
            "utterances._id": data.utteranceId,
        }, {
            $set: updateFields,
        }, {
            new: true,
        })
            .lean();
        return updated;
    }
    catch (err) {
        throw err;
    }
};
exports.default = editTranscriptDB;
