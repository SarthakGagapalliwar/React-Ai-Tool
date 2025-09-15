import React from "react";

const Heading = ({ darkMode }) => {
  return (
    <>
      <div
        className={`text-center mb-8 pb-4 border-b ${
          darkMode ? "border-white" : "border-gray-300"
        }`}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-3 leading-tight">
          Hello Dost!
        </h1>
        <p
          className={`text-lg font-medium ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Ask me anything and I'll help you out 🚀
        </p>
      </div>
    </>
  );
};

export default Heading;
