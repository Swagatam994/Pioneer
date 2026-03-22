import { buildApiUrl } from "../../config/apiConfig.js";

export const generateStudyMaterial = async (text) => {
  const response = await fetch(buildApiUrl("http://localhost:5000/generate"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with ${response.status}`);
  }

  const data = await response.json();
  return data.result;
};
