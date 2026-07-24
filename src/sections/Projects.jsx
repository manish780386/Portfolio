import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Github, Star, Code2,
  Package, BadgeCheck, Zap, Download, Globe
} from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

/* ══════════════════════════════════════════════════
   PUBLISHED WORKS
══════════════════════════════════════════════════ */
const PUBLISHED = [
  {
    id: "p1", type: "vscode", badge: "VS Code Extension", badgeColor: "#007ACC",
    name: "JSON Tree Visualizer Pro",
    tagline: "The ultimate JSON visualization tool for VS Code",
    desc: "Instantly turn any JSON into an interactive tree, mind-map graph, diff view, API client, and format converter — all without leaving your editor.",
    icon: "🌳",
    stats: [
      { label: "Installs", val: "100+",  icon: <Download size={13} /> },
      { label: "Version",  val: "1.0.0", icon: <Zap size={13} /> },
      { label: "Rating",   val: "5.0 ★", icon: <Star size={13} /> },
    ],
    tags: ["TypeScript", "VS Code", "JSON", "API Client", "Visualization"],
    features: ["Interactive Tree", "Graph View", "JSON Diff", "JSONPath Query", "API Client", "Format Converter"],
    liveUrl:   "https://marketplace.visualstudio.com/items?itemName=mdange.json-tree-visualizer",
    githubUrl: "https://github.com/manish780386/json-tree-visualizer",
    color: "from-emerald-400 to-cyan-500", glow: "rgba(6,182,212,0.3)",
  },
  {
    id: "p2", type: "vscode", badge: "VS Code Extension", badgeColor: "#007ACC",
    name: "Operator Colorizer Pro",
    tagline: "Colors all operators in every programming language",
    desc: "Highlights arithmetic, comparison, logical, assignment, and bitwise operators with distinct colors across 15+ languages. Toggle on/off from the status bar.",
    icon: "🎨",
    stats: [
      { label: "Installs", val: "13+",   icon: <Download size={13} /> },
      { label: "Version",  val: "1.0.3", icon: <Zap size={13} /> },
      { label: "Rating",   val: "4.0 ★", icon: <Star size={13} /> },
    ],
    tags: ["TypeScript", "VS Code", "Syntax Highlighting", "15+ Languages"],
    features: ["Arithmetic Ops", "Comparison Ops", "Logical Ops", "15+ Languages", "Custom Colors", "Stats Counter"],
    liveUrl:   "https://marketplace.visualstudio.com/items?itemName=mdange.operator-colorizer",
    githubUrl: "https://github.com/manish780386",
    color: "from-orange-400 to-pink-500", glow: "rgba(249,115,22,0.3)",
  },
  {
    id: "p3", type: "pypi", badge: "PyPI Library", badgeColor: "#3B82F6",
    name: "DjangoForge",
    tagline: "One command. Full Django setup. Ready to code.",
    desc: "Sets up a complete Django project in seconds — virtual environment, DRF, CORS, dotenv, .gitignore, requirements.txt, and a branded welcome page. Just one command.",
    icon: "⚡",
    stats: [
      { label: "Install", val: "pip",         icon: <Package size={13} /> },
      { label: "Package", val: "forgekit",    icon: <Zap size={13} /> },
      { label: "Type",    val: "Open Source", icon: <BadgeCheck size={13} /> },
    ],
    tags: ["Python", "Django", "CLI Tool", "DRF", "CORS", "dotenv"],
    features: ["Auto venv", "DRF configured", "CORS ready", "dotenv", ".gitignore", "Welcome page"],
    liveUrl:   "https://pypi.org/project/django-forgekit/",
    githubUrl: "https://github.com/manish780386",
    color: "from-blue-400 to-indigo-500", glow: "rgba(99,102,241,0.3)",
  },
];

/* ══════════════════════════════════════════════════
   WEB PROJECTS — 4 new ones with GitHub only
   emoji backgrounds act as visual when no screenshot
══════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1,
    name: "TripKar",
    subtitle: "AI-Powered Travel Planner",
    emoji: "✈️",
    desc: "Plan your perfect Indian trip with AI. Just say 'Delhi to Goa, 4 days, ₹15k' and TripKar builds your complete itinerary — budget, hotels, routes, weather — all in one place.",
    tech: ["React", "Django", "Claude AI", "PostgreSQL", "Redis", "Razorpay", "Celery"],
    highlights: ["AI Itinerary Generator", "Smart Budget Calculator", "5 Free Trips + Paywall", "English + Hindi (i18next)", "WhatsApp Share"],
    githubUrl: "https://github.com/manish780386/TRIPKAR",
    category: "Full Stack", featured: true,
    gradient: "from-sky-500 via-cyan-500 to-teal-500",
    accentColor: "#06b6d4",
    bgEmoji: "✈️🗺️🌏",
    screenshot: null,
  },
  {
    id: 2,
    name: "NeighborHub",
    subtitle: "Hyperlocal Community Platform",
    emoji: "🏘️",
    desc: "Apni colony, apna network — connects people within 2km radius. Real-time WebSocket chat, interactive Leaflet.js map, community groups, marketplace, and live notifications.",
    tech: ["React", "Django", "WebSocket", "PostgreSQL", "Redis", "Leaflet.js", "Celery"],
    highlights: ["2km Radius Feed", "Real-time WebSocket Chat", "Interactive Map", "Marketplace", "Community Groups"],
    githubUrl: "https://github.com/manish780386/NeighborHub",
    category: "Full Stack", featured: true,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    accentColor: "#22c55e",
    bgEmoji: "🏘️🗺️💬",
    screenshot: null,
  },
  {
    id: 3,
    name: "Mitti Ka Swad",
    subtitle: "Heritage Indian Food Platform",
    emoji: "🍛",
    desc: "Cultural preservation food ordering platform connecting customers to authentic traditional Indian dishes from 28 states. Every dish carries its cultural story, grandma's tip, and festival association.",
    tech: ["React", "Django", "PostgreSQL", "Razorpay", "Tailwind", "Framer Motion"],
    highlights: ["500+ Heritage Dishes", "28 Indian States", "Voice Search (Hindi/English)", "Cultural Storytelling", "Vendor Dashboard"],
    githubUrl: "https://github.com/manish780386/Miiti-Ka-Swwad",
    category: "Full Stack", featured: true,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    accentColor: "#f97316",
    bgEmoji: "🍛🪔🌾",
    screenshot: null,
  },
  {
    id: 4,
    name: "AIPE Platform",
    subtitle: "AI Powered Everything",
    emoji: "🤖",
    desc: "One intelligent platform to accelerate your career — Resume Analyzer (PDF → AI score), Code Analyzer (bugs + security), Live Interview Coach (WebSocket), and AI Study Planner.",
    tech: ["React", "Django", "OpenAI GPT-4o", "WebSocket", "Celery", "JWT", "Razorpay"],
    highlights: ["Resume AI Analyzer", "Code Review AI", "Live Interview Coach", "Study Planner AI", "Real-time Notifications"],
    githubUrl: "https://github.com/manish780386/AIPE-AI-Powered-Everthing",
    category: "AI / ML", featured: true,
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    accentColor: "#8b5cf6",
    bgEmoji: "🤖💻📊",
    screenshot: null,
  },
];

const FILTERS = ["All", "Featured", "Full Stack", "AI / ML", "TypeScript"];

/* ══════════════════════════════════════
   PUBLISHED CARD
══════════════════════════════════════ */
function PublishedCard({ p, i }) {
  const open = url => window.open(url, "_blank", "noopener,noreferrer");
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}
    >
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `0 0 50px ${p.glow}, inset 0 0 40px ${p.glow}` }}
      />
      <div className={`h-1 w-full bg-gradient-to-r ${p.color}`} />
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full z-10"
        style={{ background: `${p.badgeColor}20`, border: `1px solid ${p.badgeColor}40` }}>
        <BadgeCheck size={9} style={{ color: p.badgeColor }} />
        <span className="text-[9px] font-black tracking-wider" style={{ color: p.badgeColor }}>
          {p.badge.toUpperCase()}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-4 pr-20">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {p.icon}
          </motion.div>
          <div>
            <h3 className={`text-base font-black bg-gradient-to-r ${p.color} bg-clip-text text-transparent leading-tight mb-1`}>
              {p.name}
            </h3>
            <p className="text-gray-400 text-xs">{p.tagline}</p>
          </div>
        </div>
        <div className="flex gap-3 mb-4">
          {p.stats.map((s, si) => (
            <div key={si} className="flex-1 flex flex-col items-center py-2 px-1 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="mb-1" style={{ color: p.badgeColor }}>{s.icon}</div>
              <div className="text-white text-xs font-extrabold leading-none mb-0.5">{s.val}</div>
              <div className="text-gray-600 text-[9px] uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-xs leading-relaxed mb-4">{p.desc}</p>
        <div className="mb-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-2">Features</p>
          <div className="flex flex-wrap gap-1.5">
            {p.features.map((f, fi) => (
              <span key={fi} className="px-2 py-0.5 rounded-lg text-[10px] font-medium"
                style={{ background: `${p.badgeColor}12`, border: `1px solid ${p.badgeColor}22`, color: p.badgeColor }}>
                ▸ {f}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.tags.map((t, ti) => (
            <span key={ti} className="px-2.5 py-1 bg-white/[0.04] rounded-lg text-[10px] text-gray-400 border border-white/[0.05]">{t}</span>
          ))}
        </div>
        <div className="flex gap-2 mt-auto">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => open(p.liveUrl)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-bold bg-gradient-to-r ${p.color} shadow-lg transition-all`}>
            {p.type === "pypi" ? <Package size={13} /> : <ExternalLink size={13} />}
            {p.type === "pypi" ? "View on PyPI" : "VS Code Marketplace"}
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => open(p.githubUrl)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 text-xs hover:text-white hover:border-white/25 transition">
            <Github size={13} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   PROJECT CARD — new advanced design
══════════════════════════════════════ */
function ProjectCard({ p, i }) {
  const [hovered, setHovered] = useState(false);
  const open = url => url && window.open(url, "_blank", "noopener,noreferrer");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.4, delay: i * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: hovered ? `1px solid ${p.accentColor}40` : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 0 40px ${p.accentColor}20` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* ── VISUAL HEADER ── */}
      <div className="relative overflow-hidden" style={{ height: 168 }}>

        {/* SCREENSHOT or GRADIENT BG */}
        {p.screenshot ? (
          <img src={p.screenshot} alt={p.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          /* Beautiful gradient with floating emojis */
          <div className="w-full h-full relative flex items-center justify-center overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${p.accentColor}18, ${p.accentColor}06)` }}>

            {/* Animated blob */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute w-48 h-48 rounded-full blur-3xl"
              style={{ background: `${p.accentColor}25` }}
            />

            {/* Floating emojis */}
            {p.bgEmoji.split("").filter(c => c.trim()).map((emoji, ei) => (
              <motion.span
                key={ei}
                className="absolute text-4xl select-none"
                style={{
                  left: `${20 + ei * 30}%`,
                  top: `${25 + (ei % 2) * 30}%`,
                  filter: "drop-shadow(0 0 12px rgba(0,0,0,0.5))",
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, ei % 2 === 0 ? 8 : -8, 0],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{ repeat: Infinity, duration: 3 + ei * 0.8, ease: "easeInOut", delay: ei * 0.4 }}
              >
                {emoji}
              </motion.span>
            ))}

            {/* Main big emoji */}
            <motion.span
              className="relative text-6xl z-10 select-none"
              style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.6))" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              {p.emoji}
            </motion.span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04050e]/90 via-[#04050e]/20 to-transparent" />

        {/* TOP LINE */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${p.gradient}`}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: "left" }}
        />

        {/* FEATURED BADGE */}
        {p.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 border border-yellow-500/30 backdrop-blur-sm">
            <Star size={8} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[9px] text-yellow-400 font-bold">Featured</span>
          </div>
        )}

        {/* CATEGORY BADGE */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm"
          style={{ border: `1px solid ${p.accentColor}40` }}>
          <span className="text-[9px] font-bold" style={{ color: p.accentColor }}>{p.category}</span>
        </div>

        {/* BOTTOM — title over image */}
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-white font-black text-base leading-tight">{p.name}</p>
          <p className="text-xs font-medium" style={{ color: p.accentColor }}>{p.subtitle}</p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-gray-500 text-xs leading-relaxed mb-4">{p.desc}</p>

        {/* HIGHLIGHTS */}
        <div className="mb-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-2">Key Features</p>
          <div className="flex flex-wrap gap-1.5">
            {p.highlights.map((h, hi) => (
              <span key={hi} className="text-[10px] font-medium px-2 py-0.5 rounded-lg"
                style={{ background: `${p.accentColor}12`, border: `1px solid ${p.accentColor}25`, color: p.accentColor }}>
                ▸ {h}
              </span>
            ))}
          </div>
        </div>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.tech.map((t, ti) => (
            <span key={ti} className="px-2 py-0.5 bg-white/[0.04] rounded-md text-[10px] text-gray-500 border border-white/[0.05]">
              {t}
            </span>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-auto">
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => open(p.githubUrl)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-bold transition-all"
            style={{ background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}99)` }}
          >
            <Github size={13} /> View on GitHub
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => open(p.githubUrl)}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 text-xs hover:text-white hover:border-white/25 transition flex items-center gap-1.5"
          >
            <Code2 size={12} /> Code
          </motion.button>
        </div>
      </div>

      {/* BOTTOM ACCENT */}
      <motion.div
        className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r ${p.gradient}`}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"        ? PROJECTS
    : active === "Featured" ? PROJECTS.filter(p => p.featured)
    : PROJECTS.filter(p => p.category === active);

  return (
    <SectionWrapper id="projects" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle pre="What I Build" main="My" accent="Projects" />
        <SectionSubtitle>Published tools, open-source libraries & shipped web products</SectionSubtitle>

        {/* ══ PUBLISHED HIGHLIGHT ══ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}
              className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/60" />
            <span className="text-sm font-black text-white uppercase tracking-widest">Published & Live</span>
            <span className="px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/25 text-green-400 text-[10px] font-bold">3 Products</span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            <span className="text-[11px] text-gray-600 hidden sm:block">VS Code Marketplace · PyPI</span>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PUBLISHED.map((p, i) => <PublishedCard key={p.id} p={p} i={i} />)}
          </div>
        </motion.div>

        {/* ══ WEB PROJECTS ══ */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-black text-white uppercase tracking-widest">Web Projects</span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            <span className="text-[11px] text-gray-600">{PROJECTS.length} projects</span>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map(f => (
              <motion.button key={f} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  active === f
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white hover:border-white/[0.14]"
                }`}>
                {f}{f === "Featured" && <Star size={10} className="inline ml-1 mb-0.5 fill-current" />}
              </motion.button>
            ))}
          </div>

          {/* GRID */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <motion.a href="https://github.com/manish780386" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(6,182,212,0.2)" }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/25 text-sm text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition">
            <Github size={15} /> View All on GitHub →
          </motion.a>
        </div>
      </div>
    </SectionWrapper>
  );
}