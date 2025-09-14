import React from "react";

const AIProfilePicture = ({ size = "md", className = "" }) => {
  // Size variants
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  // Icon sizes relative to container
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10"
  };

  return (
    <div className={`${sizeClasses[size]} ${className} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm border-2 border-white`}>
      <svg 
        className={`${iconSizes[size]} text-white`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
        />
      </svg>
    </div>
  );
};

export default AIProfilePicture;