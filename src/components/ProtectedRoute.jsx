import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user, authChecked } = useAuth();

  if (!authChecked) return <EchozyLoader />;
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Elegant loading component
const EchozyLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated logo/icon */}
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <svg
              className="w-8 h-8 text-white animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>

          {/* Pulsing animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-400 rounded-xl opacity-0 animate-ping"></div>
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          Securing your connection
        </h2>
        <p className="text-gray-500 text-sm">Just a moment...</p>

        {/* Progress indicator */}
        <div className="mt-6 w-48 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-[loadingBar_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style>
        {`
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}
      </style>
    </div>
  );
};

export default ProtectedRoute;
