import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Github, Star, ImagePlus, X,
  Globe, Code2, Camera, Maximize2, Upload,
  Package, Download, Zap, Award, BadgeCheck
} from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

/* ══════════════════════════════════════════════════
   PUBLISHED WORKS — VS Code Extensions + PyPI
══════════════════════════════════════════════════ */
const PUBLISHED = [
  {
    id: "p1",
    type: "vscode",
    badge: "VS Code Extension",
    badgeColor: "#007ACC",
    name: "JSON Tree Visualizer Pro",
    tagline: "The ultimate JSON visualization tool for VS Code",
    desc: "Instantly turn any JSON into an interactive tree, mind-map graph, diff view, and more — without leaving your editor. Features inline editing, JSONPath queries, API client, and format converter.",
    icon: "🌳",
    stats: [
      { label: "Installs", val: "37+", icon: <Download size={13} /> },
      { label: "Version",  val: "1.0.0", icon: <Zap size={13} /> },
      { label: "Rating",   val: "5.0 ★", icon: <Star size={13} /> },
    ],
    tags: ["TypeScript", "VS Code", "JSON", "Visualization", "API Client"],
    liveUrl: "https://marketplace.visualstudio.com/items?itemName=mdange.json-tree-visualizer",
    githubUrl: "https://github.com/manish780386/json-tree-visualizer",
    color: "from-emerald-400 to-cyan-500",
    glow: "rgba(6,182,212,0.35)",
    features: ["Interactive Tree View", "Graph / Mind-Map", "JSON Diff Tool", "JSONPath Query", "API Client", "Format Converter"],
  },
  {
    id: "p2",
    type: "vscode",
    badge: "VS Code Extension",
    badgeColor: "#007ACC",
    name: "Operator Colorizer Pro",
    tagline: "Colors all operators in every programming language",
    desc: "Highlights arithmetic, comparison, logical, assignment, and bitwise operators with distinct colors across 15+ languages. Includes a stats counter, custom color support, and a status bar toggle.",
    icon: "🎨",
    stats: [
      { label: "Installs", val: "8+",   icon: <Download size={13} /> },
      { label: "Version",  val: "1.0.0", icon: <Zap size={13} /> },
      { label: "Rating",   val: "4.0 ★", icon: <Star size={13} /> },
    ],
    tags: ["TypeScript", "VS Code", "Syntax Highlighting", "Developer Tools"],
    liveUrl: "https://marketplace.visualstudio.com/items?itemName=mdange.operator-colorizer",
    githubUrl: "https://github.com/manish780386",
    color: "from-orange-400 to-pink-500",
    glow: "rgba(249,115,22,0.35)",
    features: ["Arithmetic Operators", "Comparison Operators", "Logical Operators", "15+ Languages", "Custom Colors", "Stats Counter"],
  },
  {
    id: "p3",
    type: "pypi",
    badge: "PyPI Library",
    badgeColor: "#3B82F6",
    name: "DjangoForge",
    tagline: "One command. Full Django setup. Ready to code.",
    desc: "Sets up a complete Django project in seconds — virtual environment, DRF, CORS, dotenv, .gitignore, requirements.txt, and a beautiful welcome page. All automatically with one command.",
    icon: "⚡",
    stats: [
      { label: "Install",  val: "pip install", icon: <Package size={13} /> },
      { label: "Package",  val: "django-forgekit", icon: <Zap size={13} /> },
      { label: "Type",     val: "Open Source", icon: <BadgeCheck size={13} /> },
    ],
    tags: ["Python", "Django", "CLI Tool", "DRF", "Developer Tools"],
    liveUrl: "https://pypi.org/project/django-forgekit/",
    githubUrl: "https://github.com/manish780386",
    color: "from-blue-400 to-indigo-500",
    glow: "rgba(99,102,241,0.35)",
    features: ["Auto venv setup", "DRF configured", "CORS ready", "dotenv support", ".gitignore", "Welcome page"],
  },
];

/* ══════════════════════════════════════════════════
   REGULAR PROJECTS
══════════════════════════════════════════════════ */
const INITIAL_PROJECTS = [
  {
    id: 1, name: "Portfolio Website", emoji: "🖥️",
    desc: "Modern animated portfolio with smooth scroll, dark UI, particle effects, 3D tilt card, and interactive sections.",
    tech: ["React", "Tailwind", "Framer Motion", "React Router"],
    liveUrl: "https://manish-portfolio.vercel.app",
    githubUrl: "https://github.com/manish780386",
    category: "React", featured: true, color: "from-cyan-500 to-indigo-500",
    accentColor: "#06b6d4", image: null,
  },
  {
    id: 2, name: "SVVV Notes Website", emoji: "📚",
    desc: "Student platform for quality notes access with auth, file management, and admin controls. Used by 100+ students.",
    tech: ["React", "Django", "SQL", "Python"],
    liveUrl: "https://svvv-notes-website-poij.vercel.app/",
    githubUrl: "https://github.com/manish780386",
    category: "Django", featured: true, color: "from-indigo-500 to-purple-500",
    accentColor: "#6366f1", image: null,
  },
  {
    id: 3, name: "E-Commerce Platform", emoji: "🛒",
    desc: "Full-stack shopping platform with product catalog, cart, payment integration, and real-time inventory updates.",
    tech: ["React", "Django", "SQL", "Tailwind"],
    liveUrl: "https://simple-e-commerce-website-beta.vercel.app/",
    githubUrl: "https://github.com/manish780386",
    category: "Django", featured: false, color: "from-pink-500 to-rose-500",
    accentColor: "#ec4899", image: null,
  },
  {
    id: 4, name: "JobSt@ck", emoji: "📋",
    desc: "Full-featured job portal — search, apply, track applications, resume builder, premium services & admin posting.",
    tech: ["React", "Django", "Python", "SQL"],
    liveUrl: "https://github.com/manish780386/JobStack",
    githubUrl: "https://github.com/manish780386/JobStack",
    githubOnly: true, category: "Django", featured: true,
    color: "from-green-500 to-teal-500", accentColor: "#22c55e", image: null,
  },
  {
    id: 5, name: "Velvet Brew Café", emoji: "☕",
    desc: "Stunning café website with online ordering, reservation system, 3D elements, and full admin panel.",
    tech: ["React", "Django", "Framer Motion", "Three.js"],
    liveUrl: "https://github.com/manish780386/Velvet-Brew-Cafe-Website",
    githubUrl: "https://github.com/manish780386/Velvet-Brew-Cafe-Website",
    githubOnly: true, category: "React", featured: false,
    color: "from-amber-500 to-orange-500", accentColor: "#f59e0b", image: null,
  },
  {
    id: 6, name: "KisanMitra", emoji: "🌾",
    desc: "Smart farmer assistant — market prices, produce selling, buyer-farmer connections, and crop advisory.",
    tech: ["React", "TypeScript", "Tailwind"],
    liveUrl: "https://github.com/manish780386/-KisanMitra",
    githubUrl: "https://github.com/manish780386/-KisanMitra",
    githubOnly: true, category: "TypeScript", featured: true,
    color: "from-lime-500 to-green-500", accentColor: "#84cc16", image: null,
  },
  {
    id: 7, name: "LIC Agent Website", emoji: "🏢",
    desc: "Enterprise CRM for LIC agents — client management, policy tracking, and sales analytics. 6+ months in production.",
    tech: ["React", "Django", "Tailwind", "SQL"],
    liveUrl: "https://santosh-gayakwad-lic.vercel.app/",
    githubUrl: "https://github.com/manish780386",
    category: "Django", featured: false,
    color: "from-blue-500 to-cyan-500", accentColor: "#3b82f6", image: null,
  },
];

const FILTERS = ["All", "Featured", "React", "Django", "TypeScript"];

/* ══════════════════════════════════════
   IMAGE PREVIEW MODAL
══════════════════════════════════════ */
function ImageModal({ src, name, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <img src={src} alt={name} className="w-full object-contain max-h-[80vh]" />
        <button onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition">
          <X size={16} />
        </button>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
          <p className="text-white font-semibold text-sm">{name}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   UPLOAD ZONE
══════════════════════════════════════ */
function UploadZone({ projectId, currentImage, onImageChange, accentColor, projectName }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const processFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = ev => onImageChange(projectId, ev.target.result);
    reader.readAsDataURL(file);
  };

  if (currentImage) {
    return (
      <>
        {showPreview && <ImageModal src={currentImage} name={projectName} onClose={() => setShowPreview(false)} />}
        <div className="relative group/img rounded-xl overflow-hidden" style={{ height: 160 }}>
          <img src={currentImage} alt={`${projectName} screenshot`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/55 transition-all duration-200 flex items-center justify-center gap-2">
            <button onClick={() => setShowPreview(true)}
              className="opacity-0 group-hover/img:opacity-100 flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl text-white text-xs font-semibold transition-all">
              <Maximize2 size={11} /> Preview
            </button>
            <button onClick={() => ref.current.click()}
              className="opacity-0 group-hover/img:opacity-100 flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl text-white text-xs font-semibold transition-all">
              <Camera size={11} /> Change
            </button>
            <button onClick={() => onImageChange(projectId, null)}
              className="opacity-0 group-hover/img:opacity-100 flex items-center gap-1.5 px-3 py-1.5 bg-red-500/30 hover:bg-red-500/50 backdrop-blur-sm rounded-xl text-red-300 text-xs font-semibold transition-all">
              <X size={11} /> Remove
            </button>
          </div>
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
            <Camera size={8} className="text-green-400" />
            <span className="text-[9px] text-green-400 font-semibold">Screenshot</span>
          </div>
        </div>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => processFile(e.target.files[0])} />
      </>
    );
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); processFile(e.dataTransfer.files[0]); }}
      onClick={() => ref.current.click()}
      className="relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer group/up overflow-hidden"
      style={{
        height: 160,
        borderColor: dragging ? accentColor : "rgba(255,255,255,0.09)",
        background: dragging ? `${accentColor}10` : "rgba(255,255,255,0.02)",
      }}
    >
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => processFile(e.target.files[0])} />
      <div className="absolute inset-0 opacity-0 group-hover/up:opacity-100 transition-opacity duration-200"
        style={{ background: `${accentColor}08` }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-4">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover/up:scale-110"
          style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}35` }}>
          <Upload size={18} style={{ color: dragging ? accentColor : "#4b5563" }} className="transition-colors duration-200" />
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold transition-colors duration-200 group-hover/up:text-white"
            style={{ color: dragging ? accentColor : "#4b5563" }}>
            {dragging ? "Drop it!" : "Add Screenshot"}
          </p>
          <p className="text-[10px] text-gray-700 mt-0.5 group-hover/up:text-gray-500 transition-colors">
            Click or drag & drop
          </p>
        </div>
        {/* Corner accents */}
        {["top-2 left-2 border-t-2 border-l-2 rounded-tl-lg", "top-2 right-2 border-t-2 border-r-2 rounded-tr-lg",
          "bottom-2 left-2 border-b-2 border-l-2 rounded-bl-lg", "bottom-2 right-2 border-b-2 border-r-2 rounded-br-lg"].map((c, i) => (
          <div key={i} className={`absolute w-4 h-4 ${c} transition-colors duration-200`}
            style={{ borderColor: dragging ? accentColor : "rgba(255,255,255,0.07)" }} />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PUBLISHED HIGHLIGHT CARD
══════════════════════════════════════ */
function PublishedCard({ p, i }) {
  const open = url => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative rounded-2xl overflow-hidden flex flex-col cursor-default group"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* ANIMATED GLOW BORDER */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `0 0 40px ${p.glow}, inset 0 0 40px ${p.glow}20` }}
      />

      {/* TOP GRADIENT BAR */}
      <div className={`h-1 w-full bg-gradient-to-r ${p.color}`} />

      {/* PUBLISHED BADGE — absolute top right */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border z-10"
        style={{ background: `${p.badgeColor}20`, borderColor: `${p.badgeColor}40` }}>
        <BadgeCheck size={10} style={{ color: p.badgeColor }} />
        <span className="text-[9px] font-black tracking-wider" style={{ color: p.badgeColor }}>
          {p.badge.toUpperCase()}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* ICON + NAME */}
        <div className="flex items-start gap-4 mb-4 pr-24">
          {/* BIG ICON */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg"
            style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))`, border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {p.icon}
          </motion.div>
          <div>
            <h3 className={`text-lg font-black text-white leading-tight mb-1 bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>
              {p.name}
            </h3>
            <p className="text-gray-400 text-xs font-medium">{p.tagline}</p>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="flex gap-3 mb-4">
          {p.stats.map((s, si) => (
            <div key={si} className="flex-1 flex flex-col items-center py-2.5 px-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="mb-1" style={{ color: p.badgeColor }}>{s.icon}</div>
              <div className="text-white text-xs font-extrabold leading-none mb-0.5">{s.val}</div>
              <div className="text-gray-600 text-[9px] uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* DESC */}
        <p className="text-gray-500 text-xs leading-relaxed mb-4">{p.desc}</p>

        {/* FEATURES */}
        <div className="mb-5">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-2">Key Features</p>
          <div className="flex flex-wrap gap-1.5">
            {p.features.map((f, fi) => (
              <span key={fi} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium"
                style={{ background: `${p.badgeColor}12`, border: `1px solid ${p.badgeColor}25`, color: p.badgeColor }}>
                <span className="w-1 h-1 rounded-full inline-block" style={{ background: p.badgeColor }} />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* TECH TAGS */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.tags.map((t, ti) => (
            <span key={ti} className="px-2.5 py-1 bg-white/[0.04] rounded-lg text-[10px] text-gray-400 border border-white/[0.05]">{t}</span>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 mt-auto">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 24px ${p.glow}` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => open(p.liveUrl)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-bold bg-gradient-to-r ${p.color} shadow-lg transition-all`}
          >
            {p.type === "pypi"   ? <Package size={13} /> : <ExternalLink size={13} />}
            {p.type === "pypi"   ? "View on PyPI" : "VS Code Marketplace"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => open(p.githubUrl)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 text-xs font-medium hover:text-white hover:border-white/25 transition"
          >
            <Github size={12} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   REGULAR PROJECT CARD
══════════════════════════════════════ */
function ProjectCard({ p, i, onImageChange }) {
  const open = url => { if (url) window.open(url, "_blank", "noopener,noreferrer"); };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.35, delay: i * 0.06 }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl bg-white/[0.025] border border-white/[0.07] overflow-hidden flex flex-col cursor-default"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none`} />

      {/* SCREENSHOT ZONE */}
      <div className="px-4 pt-4">
        <UploadZone
          projectId={p.id}
          currentImage={p.image}
          onImageChange={onImageChange}
          accentColor={p.accentColor}
          projectName={p.name}
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2.5">
            <span className="text-2xl leading-none mt-0.5">{p.emoji}</span>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">{p.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                  style={{ background: `${p.accentColor}18`, color: p.accentColor }}>{p.category}</span>
                {!p.githubOnly && (
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <Globe size={8} className="text-green-400" />
                    <span className="text-[9px] text-green-400 font-bold">LIVE</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {p.featured && (
            <span className="shrink-0 flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              <Star size={8} className="fill-yellow-400" /> Featured
            </span>
          )}
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
  const [active, setActive]   = useState("All");
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  const handleImageChange = (id, data) =>
    setProjects(prev => prev.map(p => p.id === id ? { ...p, image: data } : p));

  const filtered =
    active === "All"       ? projects
    : active === "Featured" ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === active);

  const screenshotCount = projects.filter(p => p.image).length;

  return (
    <SectionWrapper id="projects" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle pre="What I Build" main="My" accent="Projects" />
        <SectionSubtitle>Published tools, open-source work & shipped products</SectionSubtitle>

        {/* ══════ PUBLISHED HIGHLIGHT SECTION ══════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {/* SECTION LABEL */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
              />
              <span className="text-sm font-black text-white uppercase tracking-widest">
                Published & Live
              </span>
              <span className="px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/25 text-green-400 text-[10px] font-bold">
                3 Products
              </span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            <span className="text-[11px] text-gray-600">VS Code Marketplace + PyPI</span>
          </div>

          {/* PUBLISHED CARDS GRID */}
          <div className="grid md:grid-cols-3 gap-5">
            {PUBLISHED.map((p, i) => (
              <PublishedCard key={p.id} p={p} i={i} />
            ))}
          </div>
        </motion.div>

        {/* ══════ REGULAR PROJECTS ══════ */}
        <div>
          {/* SECTION LABEL */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-black text-white uppercase tracking-widest">Web Projects</span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          {/* SCREENSHOT PROGRESS */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="max-w-xs mb-8 p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.07] flex items-center gap-4"
          >
            <Camera size={14} className="text-cyan-400 shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-gray-500">Screenshots</span>
                <span className="text-cyan-400 font-bold">{screenshotCount}/{projects.length}</span>
              </div>
              <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${(screenshotCount / projects.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                />
              </div>
            </div>
            <span className="text-[10px] text-gray-600 shrink-0">Drag & drop</span>
          </motion.div>

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
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} p={p} i={i} onImageChange={handleImageChange} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* VIEW ALL */}
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