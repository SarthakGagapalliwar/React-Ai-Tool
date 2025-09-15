import React, { useEffect, useRef, useState } from "react";
import { URL } from "./constants";

import RecentSeach from "./components/RecentSeach";
import QuationAns from "./components/QuationAns";
import Heading from "./components/Heading";

const App = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();

  const askQuestion = async () => {
    if (!question.trim() && !selectedHistory) return false;

    setLoading(true);
    setError(null);

    // Save question in localStorage history
    if (question) {
      let history = JSON.parse(localStorage.getItem("history")) || [];
      history = [question, ...history];
      localStorage.setItem("history", JSON.stringify(history));
      setRecentHistory(history);
    }

    const payloadData = question ? question : selectedHistory;

    const payload = {
      contents: [
        {
          parts: [{ text: payloadData }],
        },
      ],
    };

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 503) {
          throw new Error(
            "Service temporarily unavailable. Please try again later."
          );
        } else if (res.status === 401) {
          throw new Error("Invalid API key. Please check your API key.");
        } else if (res.status === 429) {
          throw new Error("Rate limit exceeded. Please wait and try again.");
        } else {
          throw new Error(`Service error: ${res.status} ${res.statusText}`);
        }
      }

      const data = await res.json();

      if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("No valid response from API");
      }

      const text = data.candidates[0].content.parts[0].text;

      setResult((prev) => [
        ...prev,
        { type: "q", text: question ? question : selectedHistory },
        { type: "a", text: text },
      ]);
    } catch (err) {
      console.error("Request failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setQuestion(""); // clear input after asking
    }
    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    if (selectedHistory && selectedHistory.trim()) {
      askQuestion();
      setSelectedHistory(""); // Clear selected history after using it
    }
  }, [selectedHistory]);

  // Dark/Light mode with localStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? savedMode === "true" : true; // Default to dark mode
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          darkMode
            ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
            : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
        }`}
        title={`Switch to ${darkMode ? "light" : "dark"} mode`}
      >
        {darkMode ? (
          // Sun icon for light mode
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      <div
        className={`grid grid-cols-5 h-screen text-center overflow-hidden ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        {/* Sidebar with history */}
        <RecentSeach
          recentHistory={recentHistory}
          setRecentHistory={setRecentHistory}
          setSelectedHistory={setSelectedHistory}
          darkMode={darkMode}
        />

        {/* Chat section */}
        <div
          className={`col-span-4 p-10 flex flex-col overflow-hidden ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <Heading darkMode={darkMode} />

          <div
            ref={scrollToAns}
            className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide mb-6 p-3 bg-transparent max-h-full"
          >
            {loading && (
              <div
                className={`text-center p-4 ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              >
                <div
                  className={`animate-spin rounded-full h-8 w-8 border-b-2 mx-auto ${
                    darkMode ? "border-white" : "border-gray-700"
                  }`}
                ></div>
                <p className="mt-2">Loading...</p>
              </div>
            )}

            {error && (
              <div
                className={`p-4 rounded-lg mb-4 break-words ${
                  darkMode
                    ? "bg-red-600 text-white"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                <strong>Error:</strong> {error}
              </div>
            )}

            {result.length > 0 && (
              <div
                className={`mt-5 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                <div className="space-y-4 max-w-full">
                  {result.map((item, index) => (
                    <QuationAns
                      key={index}
                      item={item}
                      index={index}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div
            className={`w-full max-w-2xl p-1 pr-5 mx-auto rounded-full border flex h-16 ${
              darkMode
                ? "bg-zinc-800 text-white border-zinc-700"
                : "bg-white text-gray-900 border-gray-300 shadow-lg"
            }`}
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 h-full px-4 outline-none bg-transparent ${
                darkMode
                  ? "text-white placeholder-gray-400"
                  : "text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Ask me anything..."
              disabled={loading}
            />
            <button
              className={`cursor-pointer px-4 rounded transition-colors disabled:opacity-50 whitespace-nowrap ${
                darkMode
                  ? "hover:bg-zinc-700 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={askQuestion}
              disabled={loading || (!question.trim() && !selectedHistory)}
            >
              {loading ? "Asking..." : "Ask"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
