"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meetingModel_1 = __importDefault(require("../../../../mongodb/meetingModel"));
const createTranscriptDB = async (data) => {
    console.log(data);
    try {
        const updated = await meetingModel_1.default
            .findByIdAndUpdate(data._id, {
            transcriptId: data.transcript.id,
            utterances: data.transcript.utterances,
        }, { new: true } // to return the updated document
        )
            .lean();
        return updated;
    }
    catch (err) {
        throw err;
    }
};
exports.default = createTranscriptDB;
