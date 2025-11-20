import axios from "axios";
import "dotenv/config";
import createTranscriptDB from "../db/create";

const createTranscriptService = async (data: any) => {
  const transcriptRes = await axios.post(
    "https://api.assemblyai.com/v2/transcript",
    {
      audio_url: data.meetingLink,
      speech_model: "universal",
      language_detection: true,
      speaker_labels: true,
      speakers_expected: 6,
    },
    {
      headers: {
        authorization: `${process.env.ASSEMBLYAI_API_KEY}`,
      },
    }
  );

  const transcript = await pollTranscript(transcriptRes.data.id);

  if (transcript.status === "completed") {
    const obj = {
      _id: data._id,
      transcript,
    };
    const meeting: any = await createTranscriptDB(obj);

    return meeting;
  } else if (transcript.status === "error") {
    throw new Error(`Transcription failed: ${transcript.error}`);
  } else {
    throw new Error(`Unexpected status: ${transcript.status}`);
  }
};

const pollTranscript = async (id: any) => {
  let status = "";
  let result;

  while (status !== "completed" && status !== "error") {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const res = await axios.get(
      `https://api.assemblyai.com/v2/transcript/${id}`,
      {
        headers: { authorization: `${process.env.ASSEMBLYAI_API_KEY}` },
      }
    );

    result = res.data;
    status = result.status;

    // ✅ Safe logging
    if (process.env.NODE_ENV !== "production") {
      console.log(`Polling transcript ${id}: status=${status}`);
    }
  }

  return result;
};

export default createTranscriptService;
