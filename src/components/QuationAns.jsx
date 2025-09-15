import React from "react";
import Answer from "./Answer";

const QuationAns = ({ item, index, darkMode }) => {
  return (
    <>
      <div
        className={`${
          item.type === "q" ? "flex justify-end" : "flex justify-start"
        } w-full`}
        key={index}
      >
        {item.type === "q" ? (
          <div
            className={`text-right font-bold p-4 mb-4 rounded-tl-3xl w-fit max-w-[80%] rounded-br-3xl rounded-bl-3xl break-words overflow-hidden ${
              darkMode
                ? "bg-zinc-700 text-white"
                : "bg-blue-100 text-gray-900 border border-blue-200"
            }`}
          >
            <Answer ans={item.text} type={item.type} darkMode={darkMode} />
          </div>
        ) : (
          <div
            className={`text-left p-4 mb-4 rounded-lg w-full max-w-[95%] break-words overflow-hidden ${
              darkMode
                ? "bg-zinc-800 text-gray-100"
                : "bg-white text-gray-900 border border-gray-200 shadow-sm"
            }`}
          >
            <Answer ans={item.text} type={item.type} darkMode={darkMode} />
          </div>
        )}
      </div>
    </>
  );
};

export default QuationAns;
