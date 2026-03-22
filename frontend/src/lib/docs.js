import { extractTextFromPDF, extractTextFromDOCS, extractTextFromPPTX } from "./pdf.js";

const readPlainTextFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });

const isTextFile = (file) => {
  const name = file.name?.toLowerCase() ?? "";
  return (
    file.type?.startsWith("text/") ||
    /\.(txt|md|html?|csv)$/i.test(name)
  );
};

export const exportTextFromPPT = async (file) => {
  if (!file) {
    throw new Error("PPT file is required");
  }

  const normalizedName = file.name?.toLowerCase() ?? "";
  if (!normalizedName.endsWith(".pptx")) {
    throw new Error("Only .pptx files are supported for PPT extraction");
  }

  return extractTextFromPPTX(file);
};

export const handleFileChange = async (event, { setFileName, setFileContent }) => {
  if (!event?.target?.files?.length) {
    return null;
  }

  const file = event.target.files[0];
  setFileName?.(file.name);

  try {
    let text = "";

    if (isTextFile(file)) {
      text = await readPlainTextFile(file);
    } else if (file.type === "application/pdf") {
      text = await extractTextFromPDF(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      text = await extractTextFromDOCS(file);
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      file.type === "application/vnd.ms-powerpoint"
    ) {
      text = await exportTextFromPPT(file);
    } else {
      throw new Error(`Unsupported file type: ${file.type || file.name}`);
    }

    setFileContent?.(text);
    return text;
  } catch (error) {
    console.error("Failed to read file content", error);
    throw error;
  }
};
