import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

import generateRouter from "./routes/generate.js";
import { PORT, MONGO_URL } from "./config/env.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use(generateRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Connected to mongo");
    })
    .catch((err) => {
      console.error("Mongo connection failed:", err.message);
    });
} else {
  console.warn("MONGO_URL is missing. Continuing without MongoDB.");
}
