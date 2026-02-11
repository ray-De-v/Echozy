import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AllFriends from "./pages/AllFriends";
import Ai from "./pages/Ai";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Welcome from "./pages/Welcome";
import Message from "./pages/Message";
import { Link } from "react-router-dom";


const  NotFound = () =>  {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-6">
      <div className="text-center max-w-lg">
        
        {/* Big 404 */}
        <h1 className="text-8xl font-extrabold text-white tracking-widest">
          404
        </h1>

        {/* Divider */}
        <div className="h-1 w-20 bg-indigo-500 mx-auto my-6 rounded-full" />

        {/* Message */}
        <h2 className="text-3xl font-semibold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-400 mb-8 leading-relaxed">
          Sorry, the page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Link
            to="/home"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all duration-200 shadow-lg"
          >
            Go Home
          </Link>

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
}






const App = () => {
  return (
    <>
      <Toaster />
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
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
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
    </>
  );
};

export default App;
