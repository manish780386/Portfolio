import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-scroll";
import { Github, Download, ArrowDown, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

function Typewriter({ texts, speed = 75 }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => { setCharIdx((c) => c + 1); setDisplayed(current.slice(0, charIdx + 1)); }, speed);
      return () => clearTimeout(t);
    } else if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    } else if (deleting && charIdx > 0) {
      const t = setTimeout(() => { setCharIdx((c) => c - 1); setDisplayed(current.slice(0, charIdx - 1)); }, speed / 2.2);
      return () => clearTimeout(t);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
  }, [charIdx, deleting, idx, texts, speed]);

  return (
    <span>
      <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">{displayed}</span>
      <span className="text-cyan-400 animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 700], [0, 120]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* BG BLOBS */}
      <motion.div style={{ y: blobY }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-cyan-500/[0.06] rounded-full blur-[200px] top-0 left-1/3 -translate-x-1/2" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/[0.08] rounded-full blur-[180px] bottom-0 right-1/4" />
        <div className="absolute w-[300px] h-[300px] bg-pink-500/[0.05] rounded-full blur-[150px] top-1/3 left-10" />
      </motion.div>

      {/* GRID LINES */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,220,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        {/* STATUS BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-10 tracking-wide"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
          Available for Internship & Freelance Projects
          <Sparkles size={12} />
        </motion.div>

        {/* NAME */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-6">
            <span className="block text-white">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Manish
            </span>
            <span className="block text-white/80 text-4xl md:text-5xl lg:text-6xl font-bold mt-2 tracking-tight">
              Dange
            </span>
          </h1>
        </motion.div>

        {/* TYPEWRITER */}
        <div className="text-xl md:text-2xl font-semibold text-gray-300 mb-4 h-9 flex items-center justify-center">
          <Typewriter
            texts={[
              "Full Stack Developer",
              "Cyber Security Enthusiast",
              "AI / ML Explorer",
              "React & Django Developer",
              "Problem Solver 🧩",
            ]}
          />
        </div>

        <motion.p
          className="text-gray-500 max-w-xl mx-auto leading-relaxed mb-12 text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          CS undergraduate at <span className="text-white font-medium">SVVV Indore</span> specializing in Cyber Security.
          Building full-stack apps with AI integration and intuitive UX.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <Link to="projects" smooth offset={-70} duration={600}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,200,255,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 font-bold text-white text-sm tracking-wide shadow-lg shadow-cyan-500/20"
            >
              View My Work
              <ArrowDown size={15} className="group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </Link>

          <Link to="contact" smooth offset={-70} duration={600}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white font-semibold text-sm hover:bg-white/[0.04] hover:border-white/25 transition"
            >
              Get In Touch
            </motion.button>
          </Link>

          <motion.a
            href="https://github.com/manish780386"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:text-white hover:border-white/20 transition"
          >
            <Github size={16} />
          </motion.a>
        </motion.div>

        {/* TECH PILLS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-2 mt-12"
        >
          {["React", "Django", "Python", "TypeScript", "Tailwind", "Cyber Security"].map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-gray-500 text-xs"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
        <span className="text-[10px] text-gray-600 tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}