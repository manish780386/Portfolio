import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowDown, Shield, Database, Code, Lock, Server, Cpu, Brain, Sparkles, Key, Zap, Terminal } from "lucide-react";
import StatusChip from "../components/StatusChip";

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
      t = setTimeout(() => setDeleting(true), 2000);
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
    <span className="font-mono text-[#34d399] tracking-tight">
      {displayed}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
        _
      </motion.span>
    </span>
  );
}

const ROLES = [
  "full-stack developer",
  "cyber security enthusiast",
  "react + django builder",
  "ai/ml integration developer",
  "dsa problem solver"
];

const MESH_NODES = [
  { id: "core_sec", label: "Security Shield", icon: Shield, x: 50, y: 50, size: "lg", color: "#34d399" },
  { id: "aiml", label: "AI / ML Engine", icon: Brain, x: 28, y: 26, size: "lg", color: "#a855f7" },
  { id: "django", label: "Django", icon: Server, x: 74, y: 28, size: "lg", color: "#34d399" },
  { id: "database", label: "PostgreSQL", icon: Database, x: 72, y: 72, size: "lg", color: "#38bdf8" },

  { id: "react", label: "React.js", icon: Code, x: 52, y: 18, size: "md", color: "#60a5fa" },
  { id: "python", label: "Python", icon: Zap, x: 86, y: 44, size: "md", color: "#facc15" },
  { id: "api_sec", label: "API Security", icon: Lock, x: 50, y: 80, size: "md", color: "#34d399" },
  { id: "auth_flow", label: "JWT / Auth", icon: Key, x: 32, y: 65, size: "md", color: "#f472b6" },
  { id: "dsa", label: "DSA Java", icon: Cpu, x: 18, y: 74, size: "md", color: "#818cf8" },

  { id: "dot_1", label: "", icon: Sparkles, x: 18, y: 42, size: "sm", color: "#34d399" },
  { id: "dot_2", label: "", icon: null, x: 68, y: 12, size: "sm", color: "#34d399" },
  { id: "dot_3", label: "", icon: null, x: 92, y: 64, size: "sm", color: "#34d399" },
  { id: "dot_4", label: "", icon: null, x: 14, y: 58, size: "sm", color: "#34d399" },
  { id: "dot_5", label: "", icon: null, x: 34, y: 88, size: "sm", color: "#34d399" },
  { id: "dot_6", label: "", icon: null, x: 80, y: 88, size: "sm", color: "#34d399" },
  { id: "dot_7", label: "", icon: null, x: 88, y: 20, size: "sm", color: "#34d399" }
];

const MESH_CONNECTIONS = [
  { from: "core_sec", to: "aiml" },
  { from: "core_sec", to: "django" },
  { from: "core_sec", to: "database" },
  { from: "core_sec", to: "auth_flow" },
  { from: "core_sec", to: "api_sec" },
  { from: "aiml", to: "react" },
  { from: "aiml", to: "dot_1" },
  { from: "django", to: "react" },
  { from: "django", to: "python" },
  { from: "django", to: "database" },
  { from: "database", to: "api_sec" },
  { from: "auth_flow", to: "dsa" },
  { from: "auth_flow", to: "dot_4" },
  { from: "dsa", to: "dot_5" },
  { from: "python", to: "dot_3" },
  { from: "python", to: "dot_7" },
  { from: "database", to: "dot_6" },
  { from: "react", to: "dot_2" }
];

function OrganicMeshNetwork() {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Parallax 3D Card Hover Tilt logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [10, -10]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredNode(null);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-[500px] aspect-[1.1] rounded-3xl border border-white/10 bg-[#060b13]/80 p-5 backdrop-blur-2xl shadow-[0_0_60px_rgba(52,211,153,0.08)] cursor-grab active:cursor-grabbing overflow-hidden group transition-all duration-300"
    >
      {/* Dynamic Background Mesh Grid & Glows */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none group-hover:opacity-[0.14] transition-opacity duration-500" 
        style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
      
      {/* Top Banner Tag */}
      <div className="absolute top-4 left-5 text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2 z-20">
        <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping" />
        Interactive Tech Architecture
      </div>

      {/* SVG Connecting Mesh Lines */}
      <svg className="w-full h-full relative z-10 pointer-events-none">
        <defs>
          <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {MESH_CONNECTIONS.map((conn, idx) => {
          const fromNode = MESH_NODES.find((n) => n.id === conn.from);
          const toNode = MESH_NODES.find((n) => n.id === conn.to);
          const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to;

          return (
            <g key={idx}>
              <line
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={isHighlighted ? "url(#lineGlow)" : "rgba(52, 211, 153, 0.2)"}
                strokeWidth={isHighlighted ? 2.5 : 1.2}
                className="transition-all duration-300"
              />

              {/* Data Packet Laser Flow Animation */}
              <motion.circle
                r={isHighlighted ? 3.5 : 2}
                fill={isHighlighted ? "#34d399" : "rgba(52, 211, 153, 0.6)"}
                animate={{
                  cx: [`${fromNode.x}%`, `${toNode.x}%`],
                  cy: [`${fromNode.y}%`, `${toNode.y}%`]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5 + (idx % 3),
                  ease: "easeInOut",
                  delay: (idx * 0.2) % 2
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Rendering Interactive Node Elements */}
      {MESH_NODES.map((node) => {
        const Icon = node.icon;
        const isHovered = hoveredNode === node.id;

        if (node.size === "sm") {
          return (
            <motion.div
              key={node.id}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: Math.random() * 2 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#34d399] shadow-[0_0_12px_#34d399]"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            />
          );
        }

        return (
          <motion.div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            animate={{ scale: isHovered ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center z-20 group/node"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {/* Glowing Inner Ring */}
            <div 
              className={`relative flex items-center justify-center rounded-2xl border transition-all duration-300 ${
                node.size === "lg" ? "w-13 h-13" : "w-10 h-10"
              } ${
                isHovered 
                  ? "bg-[#0c1624] border-[#34d399] shadow-[0_0_30px_rgba(52,211,153,0.7)] ring-2 ring-[#34d399]/40" 
                  : "bg-[#09111e]/90 border-white/10 hover:border-[#34d399]/50"
              }`}
            >
              {Icon && (
                <Icon 
                  size={node.size === "lg" ? 22 : 16} 
                  style={{ color: node.color }} 
                  className="transition-transform duration-300 group-hover/node:rotate-12"
                />
              )}
            </div>
            
            {/* Dynamic Label Pill */}
            {node.label && (
              <span 
                className={`mt-1.5 text-[10px] font-mono whitespace-nowrap px-2.5 py-0.5 rounded-full transition-all duration-300 ${
                  isHovered 
                    ? "bg-[#34d399] text-[#060a11] font-bold shadow-[0_0_15px_rgba(52,211,153,0.5)]" 
                    : "bg-[#0d1626]/90 text-gray-300 border border-white/10"
                }`}
              >
                {node.label}
              </span>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 450], [1, 0]);
  const yTranslate = useTransform(scrollY, [0, 450], [0, -40]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 lg:py-0">
      {/* AMBIENT BACKGROUND GLOW LIGHTS */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#34d399]/10 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <motion.div 
        style={{ opacity: fade, y: yTranslate }} 
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center"
      >
        {/* LEFT HERO TEXT CONTENT */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-block">
            <StatusChip tone="active" pulse>Available for internships & roles</StatusChip>
          </motion.div>

          <h1
            className="mt-6 font-extrabold leading-[1.05] text-4xl sm:text-5xl lg:text-[4rem] tracking-tight text-white"
            style={{ textShadow: "0 0 50px rgba(52,211,153,0.18)" }}
          >
            Manish Dange
          </h1>

          <div className="h-8 mt-4 text-lg md:text-xl font-mono flex items-center gap-2">
            <Terminal size={18} className="text-[#34d399]" />
            <Typewriter texts={ROLES} />
          </div>

          <p className="mt-6 text-[#8e9bb0] leading-relaxed text-[15px] max-w-lg">
            Full-stack developer with a Cyber Security specialization. I build end-to-end applications 
            using React, Django, PostgreSQL, and AI/ML capabilities, backed by JWT token rotation, HMAC verification, and OWASP security standards.
          </p>

          {/* CALL TO ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">
            <ScrollLink to="projects" smooth offset={-20} duration={600}>
              <motion.button 
                whileHover={{ scale: 1.03, y: -2 }} 
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#34d399] text-[#060a11] font-bold text-sm shadow-[0_0_25px_rgba(52,211,153,0.35)] hover:shadow-[0_0_35px_rgba(52,211,153,0.5)] transition-all cursor-pointer overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects <ArrowDown size={16} />
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </ScrollLink>

            <ScrollLink to="contact" smooth offset={-20} duration={600}>
              <motion.button 
                whileHover={{ scale: 1.03, y: -2 }} 
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3.5 rounded-xl border border-white/15 bg-white/[0.02] text-white font-medium text-sm hover:bg-white/[0.08] hover:border-white/30 transition-all cursor-pointer backdrop-blur-md"
              >
                Get In Touch
              </motion.button>
            </ScrollLink>
          </div>
        </motion.div>

        {/* RIGHT HERO INTERACTIVE GRAPHIC */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="w-full flex justify-center lg:justify-end"
        >
          <OrganicMeshNetwork />
        </motion.div>
      </motion.div>

      {/* SCROLL DOWN INDICATOR */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10 pointer-events-none"
        animate={{ y: [0, 8, 0] }} 
        transition={{ repeat: Infinity, duration: 2.2 }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#34d399] to-transparent" />
        <span className="text-[9px] text-[#6b7688] font-mono uppercase tracking-widest">Scroll Down</span>
      </motion.div>
    </section>
  );
}