import { StrictMode } from "react";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./Context/Context.jsx";
import { AuthProvider } from "./Context/authContext.jsx";

createRoot(document.getElementById("app")).render(
  <BrowserRouter>
    <AppProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppProvider>
  </BrowserRouter>
);
