import * as pdfjsLib from "pdfjs-dist";
import worker from "pdfjs-dist/build/pdf.worker?url";
import mammoth from "mammoth";
import * as pptxParser from "pptx-parser";

pdfjsLib.GlobalWorkerOptions.workerSrc = worker;
export const extractTextFromPDF = async (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target.result);

        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();

          const strings = content.items.map(item => item.str);
          text += strings.join(" ") + "\n";
        }

        resolve(text);

      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(file);
  });
};



export const extractTextFromDOCS = async(file)=>{
    const arrayBuffer=await file.arrayBuffer();
    const result=await mammoth.extractRawText({
        arrayBuffer:arrayBuffer
    })
    return result.value
}



const resolvePPTXParser = () => {
  if (typeof pptxParser === "function") {
    return pptxParser;
  }

  if (typeof pptxParser.default === "function") {
    return pptxParser.default;
  }

  if (typeof pptxParser.default?.default === "function") {
    return pptxParser.default.default;
  }

  throw new Error("pptx-parser module does not expose a callable parser");
};

export const extractTextFromPPTX = async (file) => {
  const parser = resolvePPTXParser();
  const presentation = await parser(file);
  const textParts = [];

  const stripHtml = (value) =>
    (value ?? "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const collectElementText = (element) => {
    if (!element) {
      return;
    }

    if (typeof element.text === "string" && element.text.trim()) {
      const cleaned = stripHtml(element.text);
      if (cleaned) {
        textParts.push(cleaned);
      }
    }

    if (Array.isArray(element.group?.children)) {
      element.group.children.forEach(collectElementText);
    }
  };

  if (Array.isArray(presentation?.slides)) {
    presentation.slides.forEach((slide, index) => {
      if (Array.isArray(slide.pageElements)) {
        slide.pageElements.forEach((element) => {
          collectElementText(element);
        });
      }

      if (index !== presentation.slides.length - 1) {
        textParts.push(""); // blank line between slides
      }
    });
  }

  return textParts.join("\n").trim();
};
