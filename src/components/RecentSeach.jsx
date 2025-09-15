import React from "react";

const RecentSeach = ({
  recentHistory,
  setRecentHistory,
  setSelectedHistory,
  darkMode,
}) => {
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };
  return (
    <>
      <div
        className={`col-span-1 p-4 overflow-y-auto overflow-x-hidden ${
          darkMode ? "bg-zinc-800" : "bg-gray-200 border-r border-gray-300"
        }`}
      >
        <h2
          className={`font-bold mb-4 flex justify-center items-center gap-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          <span>History</span>
          <button
            className={`cursor-pointer p-1 rounded hover:bg-opacity-20 transition-colors ${
              darkMode ? "hover:bg-white" : "hover:bg-gray-800"
            }`}
            onClick={clearHistory}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill={darkMode ? "#e3e3e3" : "#374151"}
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </h2>
        <ul>
          {recentHistory.map((item, index) => (
            <li
              key={index}
              className={`p-2 border-b cursor-pointer rounded text-sm break-words overflow-hidden transition-colors ${
                darkMode
                  ? "text-white border-zinc-700 hover:bg-zinc-700"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedHistory(item)}
              title={item} // Show full text on hover
            >
              {item.length > 50 ? `${item.substring(0, 50)}...` : item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RecentSeach;
