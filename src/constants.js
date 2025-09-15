// Use environment variable for API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyDOu40axyPEbcv7Z0Qi5uQkuao3zyiqlqM";

export const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Alternative endpoint for pro model:
// export const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;