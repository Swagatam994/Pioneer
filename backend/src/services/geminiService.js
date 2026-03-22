import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY, GEMINI_MODEL } from "../config/env.js";

const aiClient =
  GEMINI_API_KEY?.length > 0 ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

const buildPrompt = (text) => `
Summarize the following text and create 5 flashcards.

Format:
Summary:
...

Flashcards:
Q1: ...
A1: ...

Text:
${text.slice(0, 2000)}
`;

export const hasGeminiKey = () => Boolean(aiClient);

export const generateFlashcardsFromText = async (text) => {
  if (!aiClient) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const prompt = buildPrompt(text);

  const model = aiClient.getGenerativeModel({ model: GEMINI_MODEL });
  const result = await model.generateContent(prompt);
  return await result.response.text();
};
