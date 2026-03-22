export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const buildApiUrl = (path) => `${API_BASE_URL}${path}`;

export const ensureBackendRunningMsg =
  "Error generating AI response. Make sure the backend server is running.";
