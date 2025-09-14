import React from "react";
import { FaRobot } from "react-icons/fa";

const Reply = ({ message }) => {
  // Inline function to clean markdown and unnecessary symbols
  const cleanMessage = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")     // bold: **text**
      .replace(/\*(.*?)\*/g, "$1")         // italic: *text*
      .replace(/_(.*?)_/g, "$1")           // underscore
      .replace(/`(.*?)`/g, "$1")           // inline code
      .replace(/~~(.*?)~~/g, "$1")         // strikethrough: ~~text~~
      .replace(/^[>#-]\s?/gm, "")          // blockquotes, headers, bullets
      .replace(/[^\x00-\x7F]+/g, "")       // emojis or non-ASCII
      .replace(/\n{2,}/g, "\n")            // collapse multiple newlines
      .trim();
  };

  const cleanedMessage = cleanMessage(message.content);

  return (
    <div className="flex justify-start mb-6">
      <div className="flex items-start gap-3 max-w-xs md:max-w-md lg:max-w-lg">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white shadow-md">
            <FaRobot className="text-lg" />
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-purple-600">
              Echo AI
            </span>
            <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-full">
              AI
            </span>
          </div>
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">
            {cleanedMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
