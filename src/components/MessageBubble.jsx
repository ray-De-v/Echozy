import React from "react";
import { useAppContext } from "../Context/Context";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const MessageBubble = ({ message, isOwnMessage, formatTime }) => {
  const { API } = useAppContext();

  const handleDeleteMsg = async () => {
    try {
      const res = await API.post("/api/user/message/delete", {
        msgId: message._id,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.res?.data?.message);
    }
  };

  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-xs flex flex-col ${
          isOwnMessage ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-3 rounded-2xl ${
            isOwnMessage
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-100 border border-gray-200 rounded-bl-none"
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        {isOwnMessage && (
          <button onClick={handleDeleteMsg} className="m-1 text-red-300 hover:text-red-400 cursor-pointer hover:scale-130 transition">
            <FaTrash size={9}/> 
          </button>
        )}
        <span
          className={`text-xs mt-1 ${
            isOwnMessage ? "text-blue-600" : "text-gray-500"
          }`}
        >
          {formatTime(message.createdAt || message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
