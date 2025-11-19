import mongoose, { Schema } from "mongoose";

// Define the sub-schema for utterances inside the same file
const UtteranceSchema = new Schema({
  id: { type: String },
  speaker: { type: String },
  text: { type: String },
  start: { type: Number },
  end: { type: Number },
  confidence: { type: Number },
});

const mom = new Schema({
  chunk: { type: Number },
  title: { type: String },
  timeRange: { type: String },
  summary: { type: String },
  tags: { type: Array },
  highlights: { type: String },
});

// Main schema
const dataSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    meetingName: {
      type: String,
      required: true,
    },
    meetingAudio: {
      type: String,
      required: true,
    },
    transcriptId: {
      type: String,
      default: null,
    },
    utterances: {
      type: [UtteranceSchema],
      default: [],
    },

    minutesOfTheMeeting: {
      type: [mom],
      default: [],
    },
  },
  { timestamps: true }
);

// Create and export model
const meetingModel = mongoose.model("Meeting", dataSchema);
export default meetingModel;
