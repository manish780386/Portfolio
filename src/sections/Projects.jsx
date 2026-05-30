import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Github, Star, X, Globe, Code2,
  Package, BadgeCheck, Zap, Download
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
      { label: "Installs", val: "39+",   icon: <Download size={13} /> },
      { label: "Version",  val: "1.0.0", icon: <Zap size={13} /> },
      { label: "Rating",   val: "5.0 ★", icon: <Star size={13} /> },
    ],
    tags: ["TypeScript", "VS Code", "JSON", "API Client", "Visualization"],
    features: ["Interactive Tree", "Graph View", "JSON Diff", "JSONPath Query", "API Client", "Format Converter"],
    liveUrl: "https://marketplace.visualstudio.com/items?itemName=mdange.json-tree-visualizer",
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
      { label: "Installs", val: "8+",    icon: <Download size={13} /> },
      { label: "Version",  val: "1.0.3", icon: <Zap size={13} /> },
      { label: "Rating",   val: "4.0 ★", icon: <Star size={13} /> },
    ],
    tags: ["TypeScript", "VS Code", "Syntax Highlighting", "15+ Languages"],
    features: ["Arithmetic Ops", "Comparison Ops", "Logical Ops", "15+ Languages", "Custom Colors", "Stats Counter"],
    liveUrl: "https://marketplace.visualstudio.com/items?itemName=mdange.operator-colorizer",
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
      { label: "Install",  val: "pip",         icon: <Package size={13} /> },
      { label: "Package",  val: "forgekit",    icon: <Zap size={13} /> },
      { label: "Type",     val: "Open Source", icon: <BadgeCheck size={13} /> },
    ],
    tags: ["Python", "Django", "CLI Tool", "DRF", "CORS", "dotenv"],
    features: ["Auto venv", "DRF configured", "CORS ready", "dotenv", ".gitignore", "Welcome page"],
    liveUrl: "https://pypi.org/project/django-forgekit/",
    githubUrl: "https://github.com/manish780386",
    color: "from-blue-400 to-indigo-500", glow: "rgba(99,102,241,0.3)",
  },
];


const PROJECTS = [
  {
    id: 1, name: "Portfolio Website", emoji: "🖥️",
    desc: "Modern animated portfolio with smooth scroll, dark UI, particle effects, 3D tilt card, and interactive sections.",
    tech: ["React", "Tailwind", "Framer Motion", "React Router"],
    liveUrl: "https://manish-portfolio.vercel.app",
    githubUrl: "https://github.com/manish780386",
    category: "React", featured: true,
    color: "from-cyan-500 to-indigo-500", accentColor: "#06b6d4",
    // ↓ Put your screenshot in public/screenshots/portfolio.png
    screenshot: "/screenshots/portfilo.png", // e.g. "/screenshots/portfolio.png"
  },
  {
    id: 2, name: "SVVV Notes Website", emoji: "📚",
    desc: "Student platform for quality notes access with auth, file management, and admin controls. Used by 100+ students.",
    tech: ["React", "Django", "SQL", "Python"],
    liveUrl: "https://svvv-notes-website-poij.vercel.app/",
    githubUrl: "https://github.com/manish780386",
    category: "Django", featured: true,
    color: "from-indigo-500 to-purple-500", accentColor: "#6366f1",
    screenshot: "/screenshots/svvv.png", // "/screenshots/svvv-notes.png"
  },
  {
    id: 3, name: "E-Commerce Platform", emoji: "🛒",
    desc: "Full-stack shopping platform with product catalog, cart, payment integration, and real-time inventory updates.",
    tech: ["React", "Django", "SQL", "Tailwind"],
    liveUrl: "https://simple-e-commerce-website-beta.vercel.app/",
    githubUrl: "https://github.com/manish780386",
    category: "Django", featured: false,
    color: "from-pink-500 to-rose-500", accentColor: "#ec4899",
    screenshot: null, // "/screenshots/ecommerce.png"
  },
  {
    id: 4, name: "JobSt@ck", emoji: "📋",
    desc: "Full-featured job portal — search, apply, track applications, resume builder, premium services & admin posting.",
    tech: ["React", "Django", "Python", "SQL"],
    liveUrl: "https://github.com/manish780386/JobStack",
    githubUrl: "https://github.com/manish780386/JobStack",
    githubOnly: true, category: "Django", featured: true,
    color: "from-green-500 to-teal-500", accentColor: "#22c55e",
    screenshot: null, // "/screenshots/jobstack.png"
  },
  {
    id: 5, name: "Velvet Brew Café", emoji: "☕",
    desc: "Stunning café website with online ordering, reservation system, 3D elements, and full admin panel.",
    tech: ["React", "Django", "Framer Motion", "Three.js"],
    liveUrl: "https://github.com/manish780386/Velvet-Brew-Cafe-Website",
    githubUrl: "https://github.com/manish780386/Velvet-Brew-Cafe-Website",
    githubOnly: true, category: "React", featured: false,
    color: "from-amber-500 to-orange-500", accentColor: "#f59e0b",
    screenshot: null, // "/screenshots/velvet-brew.png"
  },
  {
    id: 6, name: "KisanMitra", emoji: "🌾",
    desc: "Smart farmer assistant — market prices, produce selling, buyer-farmer connections, and crop advisory.",
    tech: ["React", "TypeScript", "Tailwind"],
    liveUrl: "https://github.com/manish780386/-KisanMitra",
    githubUrl: "https://github.com/manish780386/-KisanMitra",
    githubOnly: true, category: "TypeScript", featured: true,
    color: "from-lime-500 to-green-500", accentColor: "#84cc16",
    screenshot: null, // "/screenshots/kisanmitra.png"
  },
  {
    id: 7, name: "LIC Agent Website", emoji: "🏢",
    desc: "Enterprise CRM for LIC agents — client management, policy tracking, and sales analytics. 6+ months in production.",
    tech: ["React", "Django", "Tailwind", "SQL"],
    liveUrl: "https://santosh-gayakwad-lic.vercel.app/",
    githubUrl: "https://github.com/manish780386",
    category: "Django", featured: false,
    color: "from-blue-500 to-cyan-500", accentColor: "#3b82f6",
    screenshot: null, // "/screenshots/lic-agent.png"
  },
];

const FILTERS = ["All", "Featured", "React", "Django", "TypeScript"];

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
   PROJECT CARD  — uses <img> tag
══════════════════════════════════════ */
function ProjectCard({ p, i }) {
  const open = url => { if (url) window.open(url, "_blank", "noopener,noreferrer"); };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.35, delay: i * 0.06 }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl bg-white/[0.025] border border-white/[0.07] overflow-hidden flex flex-col"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none`} />

      {/* ── SCREENSHOT using <img> tag ── */}
      <div className="relative overflow-hidden" style={{ height: 160 }}>
        {p.screenshot ? (
          /* Image from public/screenshots/ folder */
          <img
            src={p.screenshot}
            alt={`${p.name} screenshot`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder when no screenshot */
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${p.accentColor}10, ${p.accentColor}05)` }}
          >
            <span className="text-4xl opacity-40">{p.emoji}</span>
            <p className="text-[10px] text-gray-700 font-medium">
              Add image: <code className="text-gray-600">public/screenshots/</code>
            </p>
          </div>
        )}

        {/* GRADIENT OVERLAY at bottom */}
        {p.screenshot && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1e]/80 via-transparent to-transparent" />
        )}

        {/* LIVE BADGE */}
        {!p.githubOnly && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 border border-green-500/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] text-green-400 font-bold">LIVE</span>
          </div>
        )}

        {/* FEATURED BADGE */}
        {p.featured && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 border border-yellow-500/30 backdrop-blur-sm">
            <Star size={8} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[9px] text-yellow-400 font-bold">Featured</span>
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-2.5 mb-3">
          <span className="text-xl leading-none mt-0.5">{p.emoji}</span>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">{p.name}</h3>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md mt-1 inline-block"
              style={{ background: `${p.accentColor}18`, color: p.accentColor }}>
              {p.category}
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">{p.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tech.map((t, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-white/[0.04] rounded-lg text-[10px] text-gray-400 border border-white/[0.05]">{t}</span>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          {!p.githubOnly ? (
            <button onClick={() => open(p.liveUrl)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold hover:shadow-lg hover:scale-105 transition-all"
              style={{ background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}88)` }}>
              <ExternalLink size={12} /> Live Demo
            </button>
          ) : (
            <button onClick={() => open(p.githubUrl)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold hover:shadow-lg hover:scale-105 transition-all"
              style={{ background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}88)` }}>
              <Code2 size={12} /> View Code
            </button>
          )}
          <button onClick={() => open(p.githubUrl)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-gray-400 text-xs font-medium hover:text-white hover:border-white/25 transition">
            <Github size={12} /> GitHub
          </button>
        </div>
      </div>
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
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <motion.a href="https://github.com/manish780386" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition">
            <Github size={15} /> View All on GitHub →
          </motion.a>
        </div>
      </div>
    </SectionWrapper>
  );
}