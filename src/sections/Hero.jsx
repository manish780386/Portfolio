import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-scroll";
import { Github, ArrowDown, Sparkles, Code2, Shield, Star, GitFork } from "lucide-react";
// ── REPLACE THIS with your real photo import:
// import myPhoto from "../assets/photo.jpg";

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

  const TECH = [
    { name: "React",          color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/20" },
    { name: "Django",         color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
    { name: "Python",         color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20" },
    { name: "TypeScript",     color: "text-blue-300",   bg: "bg-blue-400/10 border-blue-400/20" },
    { name: "Tailwind",       color: "text-teal-400",   bg: "bg-teal-500/10 border-teal-500/20" },
    { name: "Cyber Security", color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20" },
  ];

  const STATS = [
    { icon: <Code2 size={14} className="text-cyan-400" />,   val: "20+",  label: "Projects" },
    { icon: <Star size={14} className="text-yellow-400" />,  val: "13+",  label: "Stars" },
    { icon: <GitFork size={14} className="text-indigo-400" />, val: "400+", label: "Commits" },
    { icon: <Shield size={14} className="text-green-400" />, val: "100+",  label: "DSA" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* BACKGROUND */}
      <motion.div style={{ y: blobY }} className="absolute inset-0 z-0 pointer-events-none">
        <motion.div animate={{ scale: [1,1.12,1], opacity: [0.4,0.65,0.4] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute w-[900px] h-[900px] bg-cyan-500/[0.055] rounded-full blur-[250px] top-[-20%] left-[10%]" />
        <motion.div animate={{ scale: [1,1.18,1], opacity: [0.3,0.55,0.3] }}
          transition={{ repeat: Infinity, duration: 11, ease: "easeInOut", delay: 2 }}
          className="absolute w-[700px] h-[700px] bg-indigo-500/[0.07] rounded-full blur-[220px] bottom-[-10%] right-[5%]" />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: "linear-gradient(rgba(0,220,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,1) 1px,transparent 1px)", backgroundSize: "70px 70px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_50%,#04050e_100%)]" />
      </motion.div>

      {/* CONTENT */}
      <motion.div style={{ y: contentY, opacity: fade }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-10 pt-16">

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 text-left min-w-0 max-w-xl">

          {/* BADGE */}
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
              <motion.button whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(6,182,212,0.35)" }} whileTap={{ scale: 0.95 }}
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

        {/* RIGHT — 3D CARD (no cut-off badges) */}
        <motion.div initial={{ opacity: 0, x: 60, scale: 0.88 }} animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex flex-shrink-0 items-center justify-center p-12"
          style={{ perspective: 1200 }}>

          <TiltCard className="relative w-[280px] h-[360px]">
            {/* BADGES — positioned inside the padding area, not cut off */}
            {[
              { icon: "🚀", label: "Projects", value: "20+", pos: "absolute -top-10 left-0" },
              { icon: "🏆", label: "Certs",    value: "10+", pos: "absolute -top-10 right-0" },
              { icon: "🧩", label: "DSA",      value: "50+", pos: "absolute -bottom-10 left-0" },
              { icon: "⭐", label: "Stars",    value: "13+", pos: "absolute -bottom-10 right-0" },
            ].map((b, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.6, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.1, type: "spring", stiffness: 220, damping: 18 }}
                className={`${b.pos} z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0d1117]/90 border border-white/10 backdrop-blur-xl shadow-2xl`}>
                <span className="text-base">{b.icon}</span>
                <div>
                  <div className="text-white font-bold text-sm leading-none">{b.value}</div>
                  <div className="text-gray-500 text-[10px] mt-0.5">{b.label}</div>
                </div>
              </motion.div>
            ))}

            {/* MAIN CARD */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/[0.08]
              bg-gradient-to-br from-[#0d1b2a] via-[#0a0e1a] to-[#060812] shadow-2xl shadow-cyan-500/10"
              style={{ transform: "translateZ(20px)" }}>

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.09),transparent_60%)]" />

              {/* AVATAR — swap emoji div with <img> tag below when you have your photo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4">

                {/* ╔══════════════════════════════════╗
                    ║  YOUR PHOTO GOES HERE             ║
                    ║  Replace this div with:           ║
                    ║  <img                             ║
                    ║    src={myPhoto}                  ║
                    ║    alt="Manish"                   ║
                    ║    className="w-24 h-24           ║
                    ║      rounded-2xl object-cover     ║
                    ║      border border-white/10       ║
                    ║      shadow-xl"                   ║
                    ║  />                               ║
                    ╚══════════════════════════════════╝ */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20
                  border border-white/10 flex items-center justify-center shadow-xl text-5xl">
                  👨‍💻
                </div>

                <div className="text-center">
                  <p className="text-white font-black text-lg tracking-tight mb-0.5">Manish Dange</p>
                  <p className="text-cyan-400 text-xs font-semibold mb-3">Full Stack Dev · SVVV Indore</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {["React", "Django", "Python", "TS"].map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-[11px] font-semibold">Available for work</span>
                </div>
              </div>

              {/* SCANLINE */}
              <motion.div animate={{ y: [-360, 360] }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-cyan-400/[0.04] to-transparent pointer-events-none" />

              {/* CORNERS */}
              {["top-3 left-3 border-t border-l rounded-tl-lg","top-3 right-3 border-t border-r rounded-tr-lg",
                "bottom-3 left-3 border-b border-l rounded-bl-lg","bottom-3 right-3 border-b border-r rounded-br-lg"].map((c, i) => (
                <div key={i} className={`absolute w-5 h-5 border-cyan-400/30 ${c}`} />
              ))}
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>

      {/* TECH PILLS */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
        className="relative z-10 flex flex-wrap justify-center gap-2 mt-10 px-6">
        {TECH.map((t, i) => (
          <motion.span key={i} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 + i * 0.07 }} whileHover={{ scale: 1.1, y: -3 }}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${t.color} ${t.bg} cursor-default`}>
            {t.name}
          </motion.span>
        ))}
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
        <span className="text-[9px] text-gray-600 tracking-[0.3em] uppercase">Scroll Down</span>
      </motion.div>
    </section>
  );
}