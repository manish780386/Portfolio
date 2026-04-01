import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import Footer from "../components/Footer";

const RESUME_SECTIONS = [
  {
    title: "Education",
    color: "from-green-500 to-teal-500",
    dot: "#22c55e",
    items: [
      { heading: "B.Tech CSE — Cyber Security", sub: "SVVV Indore | 2023 – 2027", desc: "Specializing in Information & Cyber Security, AI/ML, Full Stack Development" },
      { heading: "Higher Secondary (PCM)", sub: "Govt. Excellence Higher Secondary School | 2020 – 2023", desc: "Mathematics, Physics, Computer Science" },
    ],
  },
  {
    title: "Experience",
    color: "from-cyan-500 to-indigo-500",
    dot: "#06b6d4",
    items: [
      { heading: "Full Stack Developer Intern", sub: "The Prime Step | 2023 – Present", desc: "React, Django, SQL, REST APIs — admin dashboards, real-time features" },
      { heading: "Web Development Intern", sub: "Cod Soft | 2023 – 2024", desc: "React, JavaScript — reusable components, performance optimization" },
    ],
  },
  {
    title: "Key Projects",
    color: "from-purple-500 to-pink-500",
    dot: "#a855f7",
    items: [
      { heading: "JobSt@ck", sub: "Job Portal | React + Django", desc: "Full-featured job portal with resume builder, admin panel, application tracking" },
      { heading: "SVVV Notes Website", sub: "EdTech | React + Django + SQL", desc: "Student notes platform with auth, file mgmt, and admin controls" },
      { heading: "KisanMitra", sub: "AgriTech | React + TypeScript", desc: "Smart farmer assistant for market info and buyer-farmer connections" },
    ],
  },
  {
    title: "Skills",
    color: "from-yellow-500 to-orange-500",
    dot: "#eab308",
    items: [
      { heading: "Frontend", sub: "", desc: "React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion, React Native" },
      { heading: "Backend & Database", sub: "", desc: "Python, Django, REST APIs, MySQL, PostgreSQL, Firebase" },
      { heading: "Tools & DevOps", sub: "", desc: "Git, Docker, Linux, Postman, VS Code" },
    ],
  },
];

export default function ResumePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="pt-24 max-w-4xl mx-auto px-6 relative z-10 pb-16">
        <div className="flex items-center justify-between mb-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition"
          >
            <ArrowLeft size={16} /> Back
          </motion.button>
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-bold shadow-lg shadow-cyan-500/20"
          >
            <Download size={15} /> Download PDF
          </motion.a>
        </div>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.07] mb-6 text-center"
        >
          <h1 className="text-4xl font-black text-white mb-2">Manish Dange</h1>
          <p className="text-cyan-400 font-semibold mb-3">Full Stack Developer & Cyber Security Enthusiast</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>📍 Indore, MP, India</span>
            <span>✉️ dangemanish780386@gmail.com</span>
            <a href="https://github.com/manish780386" target="_blank" className="hover:text-cyan-400 transition">🐙 github.com/manish780386</a>
            <a href="https://leetcode.com/u/dangemanish/" target="_blank" className="hover:text-cyan-400 transition">🧩 LeetCode</a>
          </div>
        </motion.div>

        {/* SECTIONS */}
        {RESUME_SECTIONS.map((sec, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`h-0.5 w-8 bg-gradient-to-r ${sec.color} rounded`} />
              <h2 className={`text-sm font-bold uppercase tracking-widest bg-gradient-to-r ${sec.color} bg-clip-text text-transparent`}>
                {sec.title}
              </h2>
            </div>
            <div className="relative pl-4 space-y-4">
              <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${sec.dot}60, transparent)` }} />
              {sec.items.map((item, ii) => (
                <div key={ii} className="relative">
                  <div className="absolute -left-[17px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#04050e]" style={{ backgroundColor: sec.dot }} />
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white">{item.heading}</h3>
                    </div>
                    {item.sub && <p className="text-xs text-gray-500 mb-1">{item.sub}</p>}
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <Footer />
    </>
  );
}