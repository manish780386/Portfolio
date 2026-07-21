import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import StarField from "./components/StarField";
import Sidebar from "./components/Sidebar";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ResumePage from "./pages/ResumePage";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";

function Layout() {
  const { collapsed } = useSidebar();

  return (
    <div className="bg-[#060a11] text-white overflow-x-hidden font-sans flex min-h-screen">
      {/*
        Rendered once here (not inside Home.jsx) so it stays behind every
        route — /projects and /resume used to lose the space background
        entirely on navigation since only Home.jsx mounted it before.
      */}
      <StarField />
      <Sidebar />

      {/*
        THE FIX: this margin now animates off the exact same `collapsed`
        boolean the rail's width uses (via SidebarContext), instead of a
        static Tailwind breakpoint class that never changed. Mobile keeps
        its fixed top padding since the rail becomes a topbar there.
      */}
      <motion.main
        animate={{ marginLeft: typeof window !== "undefined" && window.innerWidth >= 768 ? (collapsed ? 76 : 232) : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex-1 min-w-0 pt-14 md:pt-0"
      >
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: "#0d131d", color: "#e7ecf2", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "10px", fontSize: "14px" },
            success: { iconTheme: { primary: "#34d399", secondary: "#0d131d" } },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </motion.main>
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <SidebarProvider>
        <Layout />
      </SidebarProvider>
    </Router>
  );
}