export const parseStudyResult = (rawResult) => {
  const parts = rawResult.split("Flashcards:");
  const summary = parts[0]?.replace(/^Summary:\s*/i, "").trim() || "";
  const flashText = parts[1] || "";
  const lines = flashText.split("\n");

  const flashcards = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("Q")) {
      flashcards.push({
        question: lines[i],
        answer: lines[i + 1] || "",
      });
    }
  }

  return { summary, flashcards };
};
