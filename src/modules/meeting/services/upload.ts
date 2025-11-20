import Ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import cloudinary from "../../../config/cloudinary";
import uploadMeetingDB from "../db/upload";

const uploadMeetingService = async (filePath: any, userId: any, body: any) => {
  Ffmpeg.setFfmpegPath(ffmpegInstaller.path);
  const outputDir = path.join(__dirname, "../../../outputs");
  const outputFilename = `${Date.now()}.mp3`;
  const outputPath = path.join(outputDir, outputFilename);
  return new Promise((resolve, reject) => {
    fs.mkdirSync(outputDir, { recursive: true });

    Ffmpeg(filePath)
      .toFormat("mp3")
      .on("start", (cmd) => console.log("FFmpeg command:", cmd))
      .on("end", async () => {
        try {
          const result = await cloudinary.uploader.upload(outputPath, {
            resource_type: "video",
            folder: "converted-audio",
            public_id: path.parse(outputFilename).name,
          });
          fs.unlinkSync(outputPath);
          const dbResult = await uploadMeetingDB(
            result.secure_url,
            userId,
            body
          );
          resolve(dbResult);
        } catch (err: any) {
          throw new Error("Cloudinary upload failed: " + err.message);
        }
      })
      .on("error", (err) =>
        reject(new Error("FFmpeg conversion failed: " + err.message))
      )
      .save(outputPath);
  });
};

export default uploadMeetingService;
