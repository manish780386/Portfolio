import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { Github, ArrowDown, Sparkles, Code2, Shield, Star, GitFork, ExternalLink } from "lucide-react";
import manish from "../assets/manish.png";

/* ─── TYPEWRITER ─── */
function Typewriter({ texts, speed = 75 }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => { setCharIdx(c => c + 1); setDisplayed(current.slice(0, charIdx + 1)); }, speed);
      return () => clearTimeout(t);
    } else if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    } else if (deleting && charIdx > 0) {
      const t = setTimeout(() => { setCharIdx(c => c - 1); setDisplayed(current.slice(0, charIdx - 1)); }, speed / 2.5);
      return () => clearTimeout(t);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % texts.length);
    }
  }, [charIdx, deleting, idx, texts, speed]);

  return (
    <span>
      <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-black">{displayed}</span>
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.85 }} className="text-cyan-400">|</motion.span>
    </span>
  );
}

/* ─── GLITCH TEXT ─── */
function GlitchText({ text }) {
  const [g, setG] = useState(false);
  useEffect(() => {
    const id = setInterval(() => { setG(true); setTimeout(() => setG(false), 180); }, 3800);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block">
      <span className={g ? "text-transparent" : ""}>{text}</span>
      {g && (<>
        <span className="absolute inset-0 text-cyan-400 translate-x-[3px] -translate-y-[1px] opacity-80 pointer-events-none">{text}</span>
        <span className="absolute inset-0 text-pink-400 -translate-x-[3px] translate-y-[1px] opacity-80 pointer-events-none">{text}</span>
      </>)}
    </span>
  );
}

/* ─── 3D TILT ─── */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 260, damping: 26 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 260, damping: 26 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── ANIMATED COUNTER ─── */
function AnimCounter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = { ref: useRef(null), inView: true };
  useEffect(() => {
    let cur = 0;
    const step = Math.ceil(to / 40);
    const id = setInterval(() => {
      cur += step;
      if (cur >= to) { setVal(to); clearInterval(id); }
      else setVal(cur);
    }, 30);
    return () => clearInterval(id);
  }, [to]);
  return <span>{val}{suffix}</span>;
}

/* ─── HERO ─── */
export default function Hero() {
  const { scrollY } = useScroll();
  const blobY    = useTransform(scrollY, [0, 800], [0, 150]);
  const contentY = useTransform(scrollY, [0, 600], [0, 40]);
  const fade     = useTransform(scrollY, [0, 500], [1, 0]);

  const ROLES = [
    "Full Stack Developer",
    "Cyber Security Enthusiast",
    "AI / ML Explorer",
    "React & Django Dev",
    "Problem Solver 🧩",
  ];

  

  const STATS = [
    { icon: <Code2 size={14} className="text-cyan-400" />,    val: "20+",  label: "Projects" },
    { icon: <Star size={14} className="text-yellow-400" />,   val: "13+",  label: "Stars"    },
    { icon: <GitFork size={14} className="text-indigo-400" />, val: "400+", label: "Commits"  },
    { icon: <Shield size={14} className="text-green-400" />,  val: "300+", label: "DSA"      },
  ];

  /* Rotating social links inside card */
  const SOCIALS = [
    { label: "GitHub",   url: "https://github.com/manish780386",                       icon: <Github size={13} />       },
    { label: "LeetCode", url: "https://leetcode.com/u/dangemanish/",                  icon: <Code2 size={13} />        },
    { label: "LinkedIn", url: "https://linkedin.com/in/manish-dange-2a03b6312",       icon: <ExternalLink size={13} /> },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── BACKGROUND ── */}
      <motion.div style={{ y: blobY }} className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1,1.12,1], opacity: [0.4,0.65,0.4] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute w-[900px] h-[900px] bg-cyan-500/[0.055] rounded-full blur-[250px] top-[-20%] left-[10%]"
        />
        <motion.div
          animate={{ scale: [1,1.18,1], opacity: [0.3,0.55,0.3] }}
          transition={{ repeat: Infinity, duration: 11, ease: "easeInOut", delay: 2 }}
          className="absolute w-[700px] h-[700px] bg-indigo-500/[0.07] rounded-full blur-[220px] bottom-[-10%] right-[5%]"
        />
        {/* subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(0,220,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_50%,#04050e_100%)]" />
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div style={{ y: contentY, opacity: fade }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 pt-16">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 text-left min-w-0 max-w-xl"
        >
          {/* STATUS BADGE */}
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.06] text-cyan-400 text-xs font-semibold mb-8 tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Available for Internship & Freelance
            <Sparkles size={11} />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-gray-500 text-base font-medium mb-2">Hello, World! 👋</motion.p>

          {/* NAME */}
          <h1 className="font-black leading-[0.9] mb-5 overflow-visible" style={{ wordBreak: "keep-all" }}>
            <motion.span initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="block text-white text-5xl md:text-6xl lg:text-7xl tracking-tight">
              I'm <GlitchText text="Manish" />
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="block text-5xl md:text-6xl lg:text-7xl tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent pb-2">
              Dange.
            </motion.span>
          </h1>

          {/* TYPEWRITER */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="text-xl md:text-2xl font-bold text-gray-300 mb-6 h-9 flex items-center">
            <Typewriter texts={ROLES} />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="text-gray-500 leading-relaxed mb-8 text-sm max-w-md">
            CS undergraduate at <span className="text-white font-semibold">SVVV Indore</span> specializing in Cyber Security.
            Building full-stack apps with AI, real-time features, and pixel-perfect UI.
          </motion.p>

          {/* BUTTONS */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }} className="flex flex-wrap gap-3 mb-10">
            <Link to="projects" smooth offset={-20} duration={700}>
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(6,182,212,0.35)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 font-bold text-white text-sm tracking-wide shadow-lg shadow-cyan-500/25 overflow-hidden">
                <span className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 skew-x-12" />
                View My Work <ArrowDown size={15} className="group-hover:translate-y-1 transition-transform" />
              </motion.button>
            </Link>
            <Link to="contact" smooth offset={-20} duration={700}>
              <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                className="px-7 py-3.5 rounded-xl border border-white/15 text-white font-semibold text-sm hover:bg-white/[0.05] transition-all">
                Get In Touch
              </motion.button>
            </Link>
            <motion.a href="https://github.com/manish780386" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.06)" }}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:text-white transition-all">
              <Github size={18} />
            </motion.a>
          </motion.div>

          {/* QUICK STATS */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center gap-6">
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.07 }}
                className="flex items-center gap-1.5 cursor-default group">
                {s.icon}
                <span className="text-white font-bold text-sm">{s.val}</span>
                <span className="text-gray-600 text-xs group-hover:text-gray-400 transition">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: AESTHETIC PROFILE CARD ── */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.88 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex flex-shrink-0 items-center justify-center"
          style={{ perspective: 1200 }}
        >
          <TiltCard className="relative w-[300px] h-[400px]">

            {/* MAIN CARD */}
            <div
              className="relative w-full h-full rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl shadow-cyan-500/10"
              style={{
                background: "linear-gradient(145deg, #0d1b2a 0%, #0a0f1e 50%, #060812 100%)",
                transform: "translateZ(20px)",
              }}
            >
              {/* BG GLOW INSIDE CARD */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10" />
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cyan-500/[0.08] to-transparent" />

              {/* TOP ACCENT LINE */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              {/* CORNER BRACKETS */}
              {[
                "top-3 left-3 border-t border-l rounded-tl-xl",
                "top-3 right-3 border-t border-r rounded-tr-xl",
                "bottom-3 left-3 border-b border-l rounded-bl-xl",
                "bottom-3 right-3 border-b border-r rounded-br-xl",
              ].map((c, i) => (
                <div key={i} className={`absolute w-5 h-5 border-cyan-400/25 ${c}`} />
              ))}

              {/* PHOTO SECTION */}
              <div className="absolute inset-0 flex flex-col items-center pt-8 px-5">

                {/* PHOTO with ring */}
                <div className="relative mb-4">
                  {/* Animated ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute -inset-[3px] rounded-2xl"
                    style={{
                      background: "conic-gradient(from 0deg, transparent 0deg, #06b6d4 90deg, transparent 180deg, #6366f1 270deg, transparent 360deg)",
                      borderRadius: "18px",
                    }}
                  />
                  {/* Static background ring */}
                  <div className="absolute -inset-[3px] rounded-2xl bg-[#0a0f1e]" style={{ borderRadius: "17px" }} />
                  {/* Photo */}
                  <img
                    src={manish}
                    alt="Manish Dange"
                    className="relative w-28 h-28 object-cover shadow-xl"
                    style={{ borderRadius: "14px" }}
                  />
                  {/* Online dot */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0a0f1e] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-400">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75" />
                    </div>
                  </div>
                </div>

                {/* NAME */}
                <p className="text-white font-black text-xl tracking-tight mb-0.5">Manish Dange</p>
               

                {/* DIVIDER */}
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />

               

                {/* SOCIAL LINKS ROW */}
                <div className="flex gap-2 mb-5">
                  {SOCIALS.map((s, i) => (
                    <motion.a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + i * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition text-[10px] font-medium"
                    >
                      {s.icon}
                      {s.label}
                    </motion.a>
                  ))}
                </div>

                {/* AVAILABILITY BADGE */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/[0.08] border border-green-500/25"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                  </span>
                  <span className="text-green-400 text-[11px] font-semibold">Available for work</span>
                </motion.div>
              </div>

              {/* SCANLINE */}
              <motion.div
                animate={{ y: [-400, 400] }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/[0.03] to-transparent pointer-events-none"
              />

              {/* BOTTOM ACCENT */}
              <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>

      {/* ── TECH PILLS ── */}
      

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
        <span className="text-[9px] text-gray-600 tracking-[0.3em] uppercase">Scroll Down</span>
      </motion.div>
    </section>
  );
}