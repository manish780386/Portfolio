import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-scroll";
import { Github, ArrowDown, ShieldCheck, Linkedin, Code2 } from "lucide-react";
import StatusChip from "../components/StatusChip";
import manish from "../assets/manish.png";

function Typewriter({ texts, speed = 65 }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let t;
    if (!deleting && charIdx < current.length) {
      t = setTimeout(() => { 
        setCharIdx((c) => c + 1); 
        setDisplayed(current.slice(0, charIdx + 1)); 
      }, speed);
    } else if (!deleting && charIdx === current.length) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => { 
        setCharIdx((c) => c - 1); 
        setDisplayed(current.slice(0, charIdx - 1)); 
      }, speed / 2.5);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, texts, speed]);

  return (
    <span className="font-mono-label text-[#34d399]">
      {displayed}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.9 }}>
        _
      </motion.span>
    </span>
  );
}

const ROLES = ["full-stack developer", "cyber security enthusiast", "react + django builder", "dsa problem solver"];

export default function Hero() {
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0">
      <motion.div 
        style={{ opacity: fade }} 
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center"
      >
        {/* LEFT COLUMN */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-wrap items-center gap-2">
            <StatusChip tone="active" pulse>Available for internships</StatusChip>
          </motion.div>

          <h1
            className="mt-6 font-bold leading-[1.02] text-5xl md:text-6xl lg:text-[4.2rem] tracking-tight text-white"
            style={{ textShadow: "0 0 40px rgba(52,211,153,0.15)" }}
          >
            Manish Dange
          </h1>

          <div className="h-8 mt-4 text-lg md:text-xl">
            <Typewriter texts={ROLES} />
          </div>

          <p className="mt-6 text-[#7c8aa0] leading-relaxed text-[15px] max-w-lg">
            A full-stack developer with a Cyber Security specialization. I build products end-to-end
            with React and Django, then think about how to break them — auth flows, input validation
            and API security aren't an afterthought, they're baked into how I ship.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="projects" smooth offset={-20} duration={600}>
              <motion.button 
                whileHover={{ y: -2 }} 
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#34d399] text-[#060a11] font-semibold text-sm"
              >
                View Work <ArrowDown size={15} />
              </motion.button>
            </Link>
            <Link to="contact" smooth offset={-20} duration={600}>
              <motion.button 
                whileHover={{ y: -2 }} 
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-lg border border-white/15 text-white font-medium text-sm hover:bg-white/[0.04] transition"
              >
                Get In Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — ACCESS CARD */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="hidden lg:flex justify-center"
        >
          <div className="relative w-[280px]">
            {/* Orbiting Ring Background Glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute -inset-3 rounded-[22px] opacity-70 pointer-events-none"
              style={{ 
                background: "conic-gradient(from 0deg, transparent 0deg, #34d399 80deg, transparent 160deg, #60a5fa 260deg, transparent 340deg)" 
              }}
            />
            <div className="absolute -inset-3 rounded-[22px] bg-[#060a11]" />

            <div 
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d131d]"
              style={{ boxShadow: "0 0 60px rgba(52,211,153,0.06)" }}
            >
              {/* SCANLINE */}
              <motion.div
                animate={{ y: [-260, 260] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#34d399]/[0.06] to-transparent pointer-events-none z-10"
              />

              {/* TOP BAR */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="font-mono-label text-[10px] text-[#4b5768] uppercase">Access Card</span>
                <ShieldCheck size={13} className="text-[#34d399]" />
              </div>

              {/* PHOTO & CONTENT */}
              <div className="p-5 flex flex-col items-center">
                <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/10 mb-4">
                  <img 
                    src={manish} 
                    alt="Manish Dange" 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                    decoding="async" 
                  />
                </div>
                
                <p className="text-white font-semibold text-base">Manish Dange</p>

                <div className="w-full h-px bg-white/[0.06] my-4" />

                <div className="w-full space-y-2">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#4b5768]">Status</span>
                    <StatusChip tone="active" pulse>Granted</StatusChip>
                  </div>
                </div>

                {/* SOCIAL LINKS */}
                <div className="flex gap-2 mt-5 w-full">
                  <a 
                    href="https://github.com/manish780386" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#7c8aa0] hover:text-white text-xs transition"
                  >
                    <Github size={13} /> GitHub
                  </a>
                  <a 
                    href="https://leetcode.com/u/dangemanish/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#7c8aa0] hover:text-white text-xs transition"
                  >
                    <Code2 size={13} /> LeetCode
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 8, 0] }} 
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#34d399]/40 to-transparent" />
        <span className="text-[9px] text-[#4b5768] font-mono-label uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}