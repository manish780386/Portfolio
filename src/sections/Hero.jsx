import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowDown, Shield, Database, Code, Lock, Server, Cpu, Brain, Sparkles, Key, Zap } from "lucide-react";
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
    <span className="font-mono text-[#34d399]">
      {displayed}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.9 }}>
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

// Nodes structured like the visual mesh diagram
const MESH_NODES = [
  // Primary Central Nodes
  { id: "core_sec", label: "Security Shield", icon: Shield, x: 50, y: 50, size: "lg", color: "#34d399", main: true },
  { id: "aiml", label: "AI / ML Integration", icon: Brain, x: 30, y: 28, size: "lg", color: "#a855f7", main: true },
  { id: "django", label: "Django", icon: Server, x: 74, y: 28, size: "lg", color: "#34d399", main: true },
  { id: "database", label: "Database", icon: Database, x: 72, y: 70, size: "lg", color: "#38bdf8", main: true },

  // Surrounding Linked Nodes & Sub-nodes
  { id: "react", label: "React", icon: Code, x: 54, y: 20, size: "md", color: "#60a5fa" },
  { id: "python", label: "Python", icon: Zap, x: 86, y: 40, size: "md", color: "#facc15" },
  { id: "api_sec", label: "API Security", icon: Lock, x: 50, y: 78, size: "md", color: "#34d399" },
  { id: "auth_flow", label: "Auth Flow", icon: Key, x: 34, y: 64, size: "md", color: "#f472b6" },
  { id: "dsa", label: "DSA", icon: Cpu, x: 18, y: 72, size: "md", color: "#818cf8" },

  // Satellite Micro-nodes (Decorations like in diagram)
  { id: "dot_1", label: "", icon: Sparkles, x: 20, y: 40, size: "sm", color: "#34d399" },
  { id: "dot_2", label: "", icon: null, x: 68, y: 14, size: "sm", color: "#34d399" },
  { id: "dot_3", label: "", icon: null, x: 90, y: 64, size: "sm", color: "#34d399" },
  { id: "dot_4", label: "", icon: null, x: 14, y: 55, size: "sm", color: "#34d399" },
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

  return (
    <div className="relative w-full max-w-[500px] aspect-[1.15] rounded-3xl border border-white/10 bg-[#060b13]/90 p-4 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(52,211,153,0.06)]">
      {/* Subtle Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="absolute top-4 left-5 text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-2 z-20">
        <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
        Hover to explore connections
      </div>

      <svg className="w-full h-full relative z-10 pointer-events-none">
        <defs>
          <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" />
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
                stroke={isHighlighted ? "url(#lineGlow)" : "rgba(52, 211, 153, 0.25)"}
                strokeWidth={isHighlighted ? 2.5 : 1.2}
                className="transition-all duration-300"
              />
              {/* Particle flow dots */}
              <circle
                cx={`${(fromNode.x + toNode.x) / 2}%`}
                cy={`${(fromNode.y + toNode.y) / 2}%`}
                r={isHighlighted ? 3 : 1.5}
                fill={isHighlighted ? "#34d399" : "rgba(52, 211, 153, 0.5)"}
              />
            </g>
          );
        })}
      </svg>

      {/* Rendering Nodes */}
      {MESH_NODES.map((node) => {
        const Icon = node.icon;
        const isHovered = hoveredNode === node.id;

        if (node.size === "sm") {
          return (
            <motion.div
              key={node.id}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: Math.random() * 2 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#34d399]/40 border border-[#34d399] shadow-[0_0_10px_#34d399]"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            />
          );
        }

        return (
          <motion.div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            animate={{ scale: isHovered ? 1.15 : 1 }}
            transition={{ duration: 0.2 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center z-20"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {/* Inner Ring Glow */}
            <div 
              className={`relative flex items-center justify-center rounded-full border transition-all duration-300 ${
                node.size === "lg" ? "w-14 h-14" : "w-10 h-10"
              } ${
                isHovered 
                  ? "bg-[#0c1624] border-[#34d399] shadow-[0_0_25px_rgba(52,211,153,0.6)] ring-2 ring-[#34d399]/30" 
                  : "bg-[#09111e]/90 border-[#34d399]/40 hover:border-[#34d399]"
              }`}
            >
              {Icon && (
                <Icon 
                  size={node.size === "lg" ? 22 : 16} 
                  style={{ color: node.color }} 
                />
              )}
            </div>
            
            {/* Label pill */}
            {node.label && (
              <span 
                className={`mt-1.5 text-[11px] font-mono whitespace-nowrap px-2.5 py-0.5 rounded-full transition-all duration-300 ${
                  isHovered 
                    ? "bg-[#34d399] text-[#060a11] font-semibold shadow-[0_0_12px_rgba(52,211,153,0.4)]" 
                    : "bg-[#0d1626]/90 text-gray-200 border border-white/10"
                }`}
              >
                {node.label}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 lg:py-0">
      {/* BACKGROUND GLOW ACCENTS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-[#34d399]/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-10 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div 
        style={{ opacity: fade }} 
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center"
      >
        {/* LEFT COLUMN */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-wrap items-center gap-2">
            <StatusChip tone="active" pulse>Available for internships</StatusChip>
          </motion.div>

          <h1
            className="mt-6 font-bold leading-[1.05] text-4xl sm:text-5xl lg:text-[4rem] tracking-tight text-white"
            style={{ textShadow: "0 0 40px rgba(52,211,153,0.15)" }}
          >
            Manish Dange
          </h1>

          <div className="h-8 mt-4 text-lg md:text-xl font-mono">
            <Typewriter texts={ROLES} />
          </div>

          <p className="mt-6 text-[#7c8aa0] leading-relaxed text-[15px] max-w-lg">
            A full-stack developer with a Cyber Security specialization. I build products end-to-end
            with React, Django, and AI/ML capabilities (Anthropic Claude API), then ensure auth flows,
            input validation, and API security are baked into production.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <ScrollLink to="projects" smooth offset={-20} duration={600}>
              <motion.button 
                whileHover={{ y: -2 }} 
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#34d399] text-[#060a11] font-semibold text-sm shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] transition cursor-pointer"
              >
                View Work <ArrowDown size={15} />
              </motion.button>
            </ScrollLink>
            <ScrollLink to="contact" smooth offset={-20} duration={600}>
              <motion.button 
                whileHover={{ y: -2 }} 
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-lg border border-white/15 text-white font-medium text-sm hover:bg-white/[0.04] transition cursor-pointer"
              >
                Get In Touch
              </motion.button>
            </ScrollLink>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — ORGANIC MESH GRAPH WITH AI/ML NODE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="w-full flex justify-center lg:justify-end"
        >
          <OrganicMeshNetwork />
        </motion.div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10 pointer-events-none"
        animate={{ y: [0, 8, 0] }} 
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#34d399]/40 to-transparent" />
        <span className="text-[9px] text-[#4b5768] font-mono uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}