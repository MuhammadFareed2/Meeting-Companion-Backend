"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ffmpeg_1 = __importDefault(require("@ffmpeg-installer/ffmpeg"));
const cloudinary_1 = __importDefault(require("../../../config/cloudinary"));
const upload_1 = __importDefault(require("../db/upload"));
const uploadMeetingService = async (filePath, userId, body) => {
    fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_1.default.path);
    const outputDir = path_1.default.join(__dirname, "../../../outputs");
    const outputFilename = `${Date.now()}.mp3`;
    const outputPath = path_1.default.join(outputDir, outputFilename);
    return new Promise((resolve, reject) => {
        fs_1.default.mkdirSync(outputDir, { recursive: true });
        (0, fluent_ffmpeg_1.default)(filePath)
            .toFormat("mp3")
            .on("start", (cmd) => console.log("FFmpeg command:", cmd))
            .on("end", async () => {
            try {
                const result = await cloudinary_1.default.uploader.upload(outputPath, {
                    resource_type: "video",
                    folder: "converted-audio",
                    public_id: path_1.default.parse(outputFilename).name,
                });
                fs_1.default.unlinkSync(outputPath);
                const dbResult = await (0, upload_1.default)(result.secure_url, userId, body);
                resolve(dbResult);
            }
            catch (err) {
                throw new Error("Cloudinary upload failed: " + err.message);
            }
        })
            .on("error", (err) => reject(new Error("FFmpeg conversion failed: " + err.message)))
            .save(outputPath);
    });
};
exports.default = uploadMeetingService;
