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
      </Routes>
    </>
  );
};

export default App;
