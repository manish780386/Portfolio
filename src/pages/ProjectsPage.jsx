import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Projects from "../sections/Projects";
import Footer from "../components/Footer";

export default function ProjectsPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="pt-24 pb-4 px-6 max-w-7xl mx-auto relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ x: -4 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[#7c8aa0] hover:text-white transition mb-4"
        >
          <ArrowLeft size={16} /> Back
        </motion.button>
      </div>
      <Projects />
      <Footer />
    </>
  );
}