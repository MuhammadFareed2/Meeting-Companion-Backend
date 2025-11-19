"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const create_1 = __importDefault(require("../db/create"));
const createTranscriptService = async (data) => {
    const transcriptRes = await axios_1.default.post("https://api.assemblyai.com/v2/transcript", {
        audio_url: data.meetingLink,
        speech_model: "universal",
        language_detection: true,
        speaker_labels: true,
        speakers_expected: 6,
    }, {
        headers: {
            authorization: `${process.env.ASSEMBLYAI_API_KEY}`,
        },
    });
    const transcript = await pollTranscript(transcriptRes.data.id);
    if (transcript.status === "completed") {
        const obj = {
            _id: data._id,
            transcript: transcript,
        };
        const meeting = await (0, create_1.default)(obj);
        return meeting;
    }
    else if (transcript.status === "error") {
        throw new Error(`Transcription failed: ${transcript.error}`);
    }
    else {
        throw new Error(`Unexpected status: ${transcript.status}`);
    }
};
const pollTranscript = async (id) => {
    let status = "";
    let result;
    while (status !== "completed" && status !== "error") {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const res = await axios_1.default.get(`https://api.assemblyai.com/v2/transcript/${id}`, {
            headers: { authorization: `${process.env.ASSEMBLYAI_API_KEY}` },
        });
        result = res.data;
        console.log(result);
        status = result.status;
    }
    return result;
};
exports.default = createTranscriptService;
