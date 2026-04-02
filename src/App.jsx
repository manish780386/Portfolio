import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import CustomCursor from "./components/CustomCursor";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ResumePage from "./pages/ResumePage";

export default function App() {
  return (
    <Router>
      <div className="bg-[#04050e] text-white overflow-x-hidden cursor-none font-sans flex min-h-screen">
        <CustomCursor />
        <Sidebar />
        {/* MAIN CONTENT — offset by sidebar */}
        <main className="flex-1 ml-0 md:ml-[72px] lg:ml-[240px] transition-all duration-300">
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
        </main>
        <BackToTop />
      </div>
    </Router>
  );
}