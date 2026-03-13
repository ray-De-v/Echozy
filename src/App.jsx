import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

// Lazy load all pages for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const AllFriends = lazy(() => import("./pages/AllFriends"));
const Ai = lazy(() => import("./pages/Ai"));
const About = lazy(() => import("./pages/About"));
const Welcome = lazy(() => import("./pages/Welcome"));
const Message = lazy(() => import("./pages/Message"));

// NotFound page (already light, can stay normal)
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-extrabold text-white tracking-widest">404</h1>
        <div className="h-1 w-20 bg-indigo-500 mx-auto my-6 rounded-full" />
        <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Sorry, the page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back on track.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/home"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all duration-200 shadow-lg"
          >
            Go Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Toaster />
      {/* Suspense handles lazy loading pages */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-friends"
            element={
              <ProtectedRoute>
                <AllFriends />
              </ProtectedRoute>
            }
          />
          <Route
            path="/echo-ai"
            element={
              <ProtectedRoute>
                <Ai />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about-us"
            element={
                <About />
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Message />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
