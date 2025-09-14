import Navbar from "./../components/Navbar";
import Sidebar from "../components/Sidebar";
import { assets } from "../assets/assets";
import UserMessage from "../components/UserMessage";
import Reply from "../components/Reply";
import { MdSend, MdLightbulbOutline, MdAutoAwesome } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../Context/Context";
import toast from "react-hot-toast";

const Ai = () => {
  const [color, setColor] = useState(false);
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "reply",
      content:
        "Hello! I'm Echo AI, your intelligent assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const setRef = useRef();
  const { setSideBar, API } = useAppContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    // Add user message to the chat
    const userMessage = {
      type: "user",
      content: content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setContent("");
    setColor(false);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Call your API
      const response = await API.post("/api/ai/chat", { prompt: content });

      if (response.data.success) {
        // Add AI response to the chat
        const aiResponse = {
          type: "reply",
          content: response.data.aiResponse,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to get response");
    } finally {
      // Hide typing indicator
      setIsTyping(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    content.length > 0 ? setColor(true) : setColor(false);
  }, [content]);

  useEffect(() => {
    setSideBar(false);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const promptSuggestions = [
    "What can you help me with?",
    "Tell me about yourself",
    "How does AI work?",
    "Write a poem about technology",
  ];

  const handleSuggestionClick = (suggestion) => {
    setContent(suggestion);
    setRef.current.focus();
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="mt-25 max-w-3xl mx-auto flex flex-col h-[calc(100vh-80px)] sm:h-[calc(100vh-50px)] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Enhanced Header - Responsive */}
        <div className="w-full border-gray-200 border-b h-16 sm:h-20 flex items-center px-4 sm:px-6 gap-3 sm:gap-4 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg border-2 border-white/30">
              <div className="relative">
                <FaRobot className="text-lg sm:text-xl" />
                <div className="absolute  -right-3.5 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-base sm:text-xl text-white">
              Echo AI
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm">
              Your intelligent assistant
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-white/20">
            <MdAutoAwesome className="text-yellow-300 text-sm sm:text-base" />
            <span className="text-xs  text-white font-medium  xs:inline">
              Powered by Gemini
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="space-y-4 sm:space-y-6">
            {messages.map((message, index) =>
              message.type === "user" ? (
                <UserMessage key={index} message={message} />
              ) : (
                <Reply key={index} message={message} />
              )
            )}

            {isTyping && (
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <FaRobot className="text-white text-sm sm:text-base" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 sm:px-5 sm:py-4 shadow-md max-w-xs sm:max-w-md border border-gray-100">
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="mt-6 sm:mt-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 text-gray-600 bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-sm">
                  <MdLightbulbOutline className="text-blue-500 text-base sm:text-lg" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Try asking me something
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {promptSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <p className="text-xs sm:text-sm text-gray-700 group-hover:text-blue-600">
                        {suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 sm:p-5 bg-white">
          <form
            onSubmit={submitHandler}
            className="flex items-center w-full rounded-full bg-gray-100 h-12 sm:h-14 px-4 sm:px-5 relative border-2 border-gray-200 focus-within:border-blue-500 transition-colors shadow-sm"
          >
            <input
              ref={setRef}
              onChange={(e) => setContent(e.target.value)}
              value={content}
              type="text"
              placeholder="Message Echo AI..."
              className="w-full h-full outline-none bg-transparent pr-10 sm:pr-12 text-gray-800 placeholder-gray-500 text-xs sm:text-sm"
            />

            <button
              type="submit"
              disabled={!color}
              className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
                color
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md"
                  : "text-gray-400 bg-gray-200"
              }`}
            >
              <MdSend className="text-lg sm:text-xl" />
            </button>
          </form>
          <p className="text-xs text-center text-gray-500 mt-2 sm:mt-3 px-2">
            Echo AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </>
  );
};

export default Ai;
