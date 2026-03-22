import { Router } from "express";
import {
  generateFlashcardsFromText,
  hasGeminiKey,
} from "../services/geminiService.js";

const router = Router();

router.post("/generate", async (req, res) => {
  const { text } = req.body ?? {};

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Text is required" });
  }

  if (!hasGeminiKey()) {
    return res
      .status(500)
      .json({ error: "Missing GEMINI_API_KEY in backend/.env" });
  }

  try {
    const result = await generateFlashcardsFromText(text);
    return res.json({ result });
  } catch (err) {
    console.error("Gemini generation failed:", err);
    const status = Number(err?.status) || 500;
    const message =
      err?.message ||
      (status === 429
        ? "Quota exceeded / rate limited by Gemini API"
        : "AI error");

    // Surface useful debugging info (without leaking secrets)
    return res.status(status).json({
      error: message,
      status,
      provider: "gemini",
      details: err?.errorDetails ?? undefined,
    });
  }
});

export default router;
