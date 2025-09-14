import React from "react";

const UserMessage = ({ message }) => {
  return (
    <div className="flex justify-end mb-5">
      <div className="flex items-end gap-2 max-w-xs md:max-w-md lg:max-w-lg">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-none px-4 py-3 shadow-md">
          <p className="text-sm md:text-base">{message.content}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            You
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
