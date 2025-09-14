import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiChevronLeft, FiRefreshCw } from "react-icons/fi";
import { useAppContext } from "../Context/Context";
import MessageBubble from "./MessageBubble";
import { useAuth } from "../Context/authContext";
import toast from "react-hot-toast";

const SingleChat = ({ singleUser, setSingleUser }) => {
  const { normalApi, API } = useAppContext();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const messagesEndRef = useRef(null);

  const profilePhoto = singleUser?.profilePhoto?.startsWith("https://res.cloudinary")
    ? singleUser.profilePhoto
    : `${normalApi}${singleUser?.profilePhoto || "/public/default_profile.jpeg"}`;

  const fetchMessages = async () => {
    try {
      setIsRefreshing(true);
      const res = await API.get(`/api/user/get/messages/${singleUser._id}`);
      if (res.data.success) {
        setMessages(res.data.messages);
        scrollToBottom();
      }
    } catch (err) {
      toast.err(err?.res?.data?.message)
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (singleUser) {
      fetchMessages();
      
      const pollInterval = setInterval(fetchMessages, 5000);
      
      return () => clearInterval(pollInterval); // Cleanup on unmount
    }
  }, [singleUser]);

  // 📬 Send a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const res = await API.post("/api/user/send/message", {
        receiverId: singleUser._id,
        message: newMessage,
      });

      if (res.data.success) {
        setMessages((prev) => [...prev, res.data.message]);
        setNewMessage("");
        scrollToBottom();
        
        // Immediately refresh messages after sending
        setTimeout(fetchMessages, 500);
      }
    } catch (err) {
      toast.err(err?.res?.data?.message)
    } finally {
      setIsSending(false);
    }
  };

  // ⬇️ Auto scroll to bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // 🕒 Format time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-58px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSingleUser(null)}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <FiChevronLeft size={20} />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {singleUser.firstName + " " + singleUser.lastName}
              </p>
            </div>
          </div>
          <button
            onClick={fetchMessages}
            disabled={isRefreshing}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            title="Refresh messages"
          >
            <FiRefreshCw className={isRefreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              isOwnMessage={msg.sender === user._id}
              formatTime={formatTime}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Box */}
      <div className="w-full bg-white border-t border-gray-200 p-3 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 border-none outline-none px-4 py-3 rounded-full text-sm"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || isSending}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isSending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <FiSend size={18} />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;