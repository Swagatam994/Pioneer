import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const PORT = Number(process.env.PORT) || 5000;
const MONGO_URL = process.env.MONGO_URL;
const GEMINI_API_KEY =
  (process.env.GEMINI_API_KEY ?? process.env.GEMINI_API ?? "")
    .replace(/^"|"$/g, "")
    .trim();
// Default to the model you confirmed works in your setup.
const GEMINI_MODEL = (process.env.GEMINI_MODEL ?? "gemini-2.5-flash").trim();

export { PORT, MONGO_URL, GEMINI_API_KEY, GEMINI_MODEL };
