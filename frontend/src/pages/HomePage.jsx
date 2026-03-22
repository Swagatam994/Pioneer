import React, { useRef, useState } from "react";

import Navigation from "../components/Navigation";
import Button from "../components/Button";
import Flashcard from "../components/Flashcard";
import { generateStudyMaterial } from "../services/api/generateStudy.js";
import { parseStudyResult } from "../services/parse/flashcardParser.js";
import { ensureBackendRunningMsg } from "../config/apiConfig.js";

import { handleFileChange as handleDocsFileChange } from "../lib/docs.js";


const HomePage = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [summary, setSummary] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // open file picker
    }
  };

  const handleFileChange = (event) =>
    handleDocsFileChange(event, { setFileName, setFileContent });

  const generateAI = async () => {
    if (!fileContent) {
      alert("Upload a file first!");
      return;
    }
    if (loading) return;

    setLoading(true);
    setIsGenerating(true);

    try {
      const result = await generateStudyMaterial(fileContent);
      const { summary: parsedSummary, flashcards: parsedCards } =
        parseStudyResult(result);

      setSummary(parsedSummary);
      setFlashcards(parsedCards);
    } catch (err) {
      console.error(err);
      alert(err.message || ensureBackendRunningMsg);
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-gray-100 to-purple-200">
      {/* Navbar */}
      <Navigation />

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-16 px-4">
        <h1 className="text-5xl font-bold text-red-600">
          AI <span className="text-blue-500">learning</span> assistant.
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          Complete Quizzes and Smart Study Tools
        </p>

        <p className="mt-6 text-gray-600">
          Upload MP4/MP3/PDF/DOCX/TXT/HTML/MD/PPTX File
        </p>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          accept=".txt,.pdf,.docx,.pptx"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload button */}
        <button
          onClick={handleButtonClick}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg"
        >
          Upload File
        </button>

        {/* Show file name */}
        {fileName && (
          <p className="mt-4 text-green-600">Selected: {fileName}</p>
        )}

        <Button onClick={generateAI} disabled={!fileContent || isGenerating}>
          {isGenerating ? "Generating…" : "Generate AI Study सामग्री"}
        </Button>

        {summary && (
          <div className="mt-8 max-w-3xl text-left bg-white/80 backdrop-blur rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
            <p className="mt-3 text-gray-700 whitespace-pre-wrap">{summary}</p>
          </div>
        )}

        <Flashcard flashcards={flashcards} />

        {/* Features Section */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <div className="text-3xl mb-2">🧠</div>
            <h2 className="font-bold text-lg">Customized Study Tools</h2>
            <p className="text-gray-600 mt-2">
              AI creates summaries, flashcards and quizzes instantly
            </p>
          </div>

          <div>
            <div className="text-3xl mb-2">🔗</div>
            <h2 className="font-bold text-lg">Share Knowledge</h2>
            <p className="text-gray-600 mt-2">
              Share via link or export as document
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
