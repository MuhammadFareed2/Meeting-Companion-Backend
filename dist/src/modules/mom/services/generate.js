"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
require("dotenv/config");
const generate_1 = __importDefault(require("../db/generate"));
// Helper to format seconds to mm:ss
function formatSeconds(seconds) {
    const m = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
    const s = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${s}`;
}
const openai = new openai_1.default({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_DEEPSEEK_API_KEY,
});
const generateMomService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Input transcript:", data);
    try {
        // Format the transcript
        const transcriptText = data.transcript
            .map((u) => {
            const start = u.start ? formatSeconds(u.start / 1000) : "??:??";
            const end = u.end ? formatSeconds(u.end / 1000) : "??:??";
            return `[${start}–${end}] ${u.speaker || "Unknown"}: ${u.text}`;
        })
            .join("\n");
        // Prepare the prompt
        const prompt = `
Segment the transcript into meaningful chunks based on topic, speaker shifts, or significant transitions in the conversation (not by fixed time).

For each chunk:
- Title: (2–5 words)
- Time: (range from first to last utterance, format: mm:ss–mm:ss)
- Summary: (2–4 lines)
- Tags: (5–10 relevant tags like hot, fight, profits, celebration, losses, success, failure, concern, technical issue, team conflict, deadline)
- Highlights: (important quotes, moves, or moments) and each highlight must have time in this format --> *[00:00-00:00]*, then add highlight text, then add "\n" after highlight text

Example text of perfect highlight : *[01:16-01:28]* A: Okay, you know, what does that mean? Well, you know what? Not every change is bad. So, Elon, what type of changes are you thinking of?\n*[01:36-01:39]* D: Well, guess what, Joy. You is fired. F: You're fired.\n*[01:54-01:58]* B: Joy isn't gonna be alone, because you're.

⚠️ DO NOT include any introduction, explanation, or reasoning.
Respond with ONLY the structured output, starting directly with **Chunk 1**.

Transcript:
${transcriptText}
`;
        // Get completion from DeepSeek
        const completion = yield openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an assistant trained to generate structured meeting summaries (Minutes of Meeting). Your goal is to extract important insights from transcripts — especially business decisions, disagreements, rejections, achievements, and significant changes. Assume the transcript is in order, and segment it naturally based on topic or conversation flow. Timestamps may be approximate or missing.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        });
        const content = completion.choices[0].message.content;
        console.log("Raw Output:\n", content);
        const chunkBlocks = content
            .split(/(?:\*\*Chunk \d+\*\*|Chunk \d+)/g)
            .filter((c) => c.trim());
        const chunks = chunkBlocks.map((block, index) => {
            var _a, _b, _c, _d, _e;
            const titleMatch = block.match(/(?:-?\s*Title:)\s*(.+)/i);
            const timeMatch = block.match(/(?:-?\s*Time:)\s*(.+)/i);
            const summaryMatch = block.match(/(?:-?\s*Summary:)\s*([\s\S]*?)\n(?:-?\s*Tags:)/i);
            const tagsMatch = block.match(/(?:-?\s*Tags:)\s*([^\n]+)/i);
            const highlightsMatch = block.match(/(?:-?\s*Highlights:)\s*([\s\S]*)/i);
            return {
                chunk: index + 1,
                title: ((_a = titleMatch === null || titleMatch === void 0 ? void 0 : titleMatch[1]) === null || _a === void 0 ? void 0 : _a.trim()) || "",
                timeRange: ((_b = timeMatch === null || timeMatch === void 0 ? void 0 : timeMatch[1]) === null || _b === void 0 ? void 0 : _b.trim()) || "",
                summary: ((_c = summaryMatch === null || summaryMatch === void 0 ? void 0 : summaryMatch[1]) === null || _c === void 0 ? void 0 : _c.trim()) || "",
                tags: ((_d = tagsMatch === null || tagsMatch === void 0 ? void 0 : tagsMatch[1]) === null || _d === void 0 ? void 0 : _d.split(",").map((t) => t.trim())) || [],
                highlights: ((_e = highlightsMatch === null || highlightsMatch === void 0 ? void 0 : highlightsMatch[1]) === null || _e === void 0 ? void 0 : _e.trim()) || "",
            };
        });
        const response = yield (0, generate_1.default)(chunks, data._id);
        return response;
    }
    catch (err) {
        console.error("Error in generateMomService:", err);
        throw err;
    }
});
exports.default = generateMomService;
