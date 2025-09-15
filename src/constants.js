// Use environment variable for API key only (do not hardcode)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Alternative endpoint for pro model:
// export const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;