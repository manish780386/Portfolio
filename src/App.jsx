import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ResumePage from "./pages/ResumePage.jsx";

export default function App() {
  return (
    <Router>
      <div className="bg-[#04050e] text-white overflow-x-hidden cursor-none font-sans min-h-screen">
        <CustomCursor />
        <Navbar />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0d1117",
              color: "#e2e8f0",
              border: "1px solid rgba(0,255,255,0.15)",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#00bcd4", secondary: "#0d1117" } },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
        <BackToTop />
      </div>
    </Router>
  );
}