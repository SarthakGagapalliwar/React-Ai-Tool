import { useEffect, useState } from "react";
import { checkHeading } from "../helper";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const Answer = ({ ans, type, darkMode }) => {
  // Format text with proper line breaks and markdown-like formatting
  const formatText = (text) => {
    if (!text) return "";

    // First, process **bold** text inline (anywhere in text)
    const processInlineFormatting = (str) => {
      const parts = [];
      const boldRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(str)) !== null) {
        // Add text before the bold part
        if (match.index > lastIndex) {
          parts.push(str.slice(lastIndex, match.index));
        }
        // Add the bold part with theme-appropriate colors
        parts.push(
          <strong
            key={match.index}
            className={`font-bold ${
              darkMode ? "text-blue-300" : "text-blue-600"
            }`}
          >
            {match[1]}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < str.length) {
        parts.push(str.slice(lastIndex));
      }

      return parts.length > 0 ? parts : str;
    };

    return text.split("\n").map((line, index) => {
      const trimmedLine = line.trim();

      // Check if line starts with * (bullet points) but not **
      if (trimmedLine.startsWith("*") && !trimmedLine.startsWith("**")) {
        const bulletText = trimmedLine.substring(1).trim();
        return (
          <div key={index} className="mb-2 flex items-start">
            <span
              className={`mr-2 mt-1 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              •
            </span>
            <span className="flex-1">
              {processInlineFormatting(bulletText)}
            </span>
          </div>
        );
      }
      // Regular text with inline formatting
      else if (trimmedLine) {
        return (
          <div key={index} className="mb-2 leading-relaxed">
            {processInlineFormatting(trimmedLine)}
          </div>
        );
      }
      // Empty line for spacing
      else {
        return <div key={index} className="mb-2"></div>;
      }
    });
  };

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={darkMode ? dark : oneLight}
          preTag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="text-left max-w-full overflow-hidden">
      {type === "q" ? (
        <div className="break-words word-wrap overflow-wrap-anywhere hyphens-auto">
          {ans}
        </div>
      ) : (
        <div
          className={`break-words word-wrap overflow-wrap-anywhere hyphens-auto ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          <ReactMarkdown components={components}>{ans}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
export default Answer;
