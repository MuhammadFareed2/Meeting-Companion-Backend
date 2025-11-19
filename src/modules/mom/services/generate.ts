import axios from "axios";
import OpenAI from "openai";
import "dotenv/config";
import generateMomDB from "../db/generate.ts";

// Helper to format seconds to mm:ss
function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_DEEPSEEK_API_KEY,
});

const generateMomService = async (data: any) => {
  console.log("Input transcript:", data);

  try {
    // Format the transcript
    const transcriptText = data.transcript
      .map((u: any) => {
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
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an assistant trained to generate structured meeting summaries (Minutes of Meeting). Your goal is to extract important insights from transcripts — especially business decisions, disagreements, rejections, achievements, and significant changes. Assume the transcript is in order, and segment it naturally based on topic or conversation flow. Timestamps may be approximate or missing.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
    });

    const content: any = completion.choices[0].message.content;
    console.log("Raw Output:\n", content);

    const chunkBlocks = content
      .split(/(?:\*\*Chunk \d+\*\*|Chunk \d+)/g)
      .filter((c: any) => c.trim());

    const chunks = chunkBlocks.map((block: any, index: number) => {
      const titleMatch = block.match(/(?:-?\s*Title:)\s*(.+)/i);
      const timeMatch = block.match(/(?:-?\s*Time:)\s*(.+)/i);
      const summaryMatch = block.match(
        /(?:-?\s*Summary:)\s*([\s\S]*?)\n(?:-?\s*Tags:)/i
      );
      const tagsMatch = block.match(/(?:-?\s*Tags:)\s*([^\n]+)/i);
      const highlightsMatch = block.match(/(?:-?\s*Highlights:)\s*([\s\S]*)/i);

      return {
        chunk: index + 1,
        title: titleMatch?.[1]?.trim() || "",
        timeRange: timeMatch?.[1]?.trim() || "",
        summary: summaryMatch?.[1]?.trim() || "",
        tags: tagsMatch?.[1]?.split(",").map((t: any) => t.trim()) || [],
        highlights: highlightsMatch?.[1]?.trim() || "",
      };
    });

    const response = await generateMomDB(chunks, data._id);
    return response;
  } catch (err) {
    console.error("Error in generateMomService:", err);
    throw err;
  }
};

export default generateMomService;
