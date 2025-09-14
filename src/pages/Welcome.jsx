import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start animations after a brief delay
    const initialDelay = setTimeout(() => {
      setVisible(true);
    }, 100);

    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 1000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          >
            <div className="w-3 h-3 bg-blue-400 rounded-full opacity-20"></div>
          </div>
        ))}
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500 rounded-full opacity-15 blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 text-center max-w-md mx-auto w-full">
        {/* Animated welcome icon */}
        <div className="mb-8 flex justify-center">
          <div
            className={`relative transition-all duration-1000 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
              <svg
                className="text-white w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Welcome message with animation */}
        <div
          className={`mb-2 transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Echozy
            </span>
          </h1>
        </div>

        <div
          className={`mb-6 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-2xl font-medium text-blue-200">
            Hello, <span className="text-white">{user.firstName}</span>!
          </h2>
        </div>

        <div
          className={`mb-8 transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-blue-100">
            We're preparing your personalized experience...
          </p>
        </div>

        {/* Progress bar */}
        <div
          className={`mb-6 transition-all duration-700 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-full bg-blue-800/30 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out shadow-lg shadow-blue-500/30"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-blue-300">
              Loading your dashboard
            </span>
            <span className="text-xs font-medium text-white">{progress}%</span>
          </div>
        </div>

        {/* Countdown */}
        <div
          className={`text-blue-200 text-sm transition-all duration-700 delay-900 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Redirecting in{" "}
          <span className="font-mono font-medium text-white">
            {Math.ceil((5000 - progress * 50) / 1000)}
          </span>{" "}
          seconds
        </div>
      </div>

      {/* Footer branding */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-blue-300/60 text-sm">
          Echozy • Connect • Share • Inspire
        </p>
      </div>

      {/* Floating animation style */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.2;
          }
          33% {
            transform: translateY(-10px) rotate(2deg);
            opacity: 0.4;
          }
          66% {
            transform: translateY(5px) rotate(-2deg);
            opacity: 0.3;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Welcome;
