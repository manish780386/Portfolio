import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Github, Star, ImagePlus, X,
  Globe, Code2, Eye, Upload, Camera, Maximize2
} from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

/* ══════════════════════════════════════
   PROJECT DATA
══════════════════════════════════════ */
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={src} alt={name} className="w-full object-contain max-h-[80vh]" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
            <p className="text-white font-semibold text-sm">{name}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════
   UPLOAD ZONE — prominent, always visible
══════════════════════════════════════ */
function UploadZone({ projectId, currentImage, onImageChange, accentColor, projectName }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const processFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => onImageChange(projectId, ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleFile = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  if (currentImage) {
    return (
      <>
        {showPreview && (
          <ImageModal src={currentImage} name={projectName} onClose={() => setShowPreview(false)} />
        )}
        <div className="relative group/img rounded-xl overflow-hidden" style={{ height: "160px" }}>
          <img
            src={currentImage}
            alt={`${projectName} screenshot`}
            className="w-full h-full object-cover"
          />
          {/* OVERLAY on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/55 transition-all duration-200 flex items-center justify-center gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              onClick={() => setShowPreview(true)}
              className="opacity-0 group-hover/img:opacity-100 flex items-center gap-1.5 px-3 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl text-white text-xs font-semibold transition-all"
            >
              <Maximize2 size={12} /> Full View
            </motion.button>
            <button
              onClick={() => ref.current.click()}
              className="opacity-0 group-hover/img:opacity-100 flex items-center gap-1.5 px-3 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl text-white text-xs font-semibold transition-all"
            >
              <Camera size={12} /> Change
            </button>
            <button
              onClick={() => onImageChange(projectId, null)}
              className="opacity-0 group-hover/img:opacity-100 flex items-center gap-1.5 px-3 py-2 bg-red-500/30 hover:bg-red-500/50 backdrop-blur-sm rounded-xl text-red-300 text-xs font-semibold transition-all"
            >
              <X size={12} /> Remove
            </button>
          </div>
          {/* SCREENSHOT BADGE */}
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
            <Camera size={9} className="text-green-400" />
            <span className="text-[9px] text-green-400 font-semibold">Screenshot Added</span>
          </div>
        </div>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => ref.current.click()}
      className={`relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer group/upload overflow-hidden`}
      style={{
        height: "160px",
        borderColor: dragging ? accentColor : "rgba(255,255,255,0.1)",
        background: dragging
          ? `${accentColor}10`
          : "rgba(255,255,255,0.02)",
      }}
    >
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      {/* HOVER BG */}
      <div
        className="absolute inset-0 opacity-0 group-hover/upload:opacity-100 transition-opacity duration-200"
        style={{ background: `${accentColor}08` }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-4">
        {/* ICON */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover/upload:scale-110"
          style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
        >
          <Upload
            size={20}
            className="transition-colors duration-200"
            style={{ color: dragging ? accentColor : "#6b7280" }}
          />
        </div>

        <div className="text-center">
          <p
            className="text-xs font-semibold transition-colors duration-200 group-hover/upload:text-white"
            style={{ color: dragging ? accentColor : "#4b5563" }}
          >
            {dragging ? "Drop screenshot here!" : "Add Project Screenshot"}
          </p>
          <p className="text-[10px] text-gray-700 mt-0.5 group-hover/upload:text-gray-500 transition-colors">
            Click or drag & drop · PNG, JPG, WebP
          </p>
        </div>

        {/* DASHED CORNERS */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl-lg transition-colors duration-200"
          style={{ borderColor: dragging ? accentColor : "rgba(255,255,255,0.08)" }} />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr-lg transition-colors duration-200"
          style={{ borderColor: dragging ? accentColor : "rgba(255,255,255,0.08)" }} />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl-lg transition-colors duration-200"
          style={{ borderColor: dragging ? accentColor : "rgba(255,255,255,0.08)" }} />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 rounded-br-lg transition-colors duration-200"
          style={{ borderColor: dragging ? accentColor : "rgba(255,255,255,0.08)" }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════ */
function ProjectCard({ p, i, onImageChange }) {
  const open = (url) => { if (url) window.open(url, "_blank", "noopener,noreferrer"); };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.35, delay: i * 0.06 }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl bg-white/[0.025] border border-white/[0.07] overflow-hidden flex flex-col cursor-default"
      style={{ "--accent": p.accentColor }}
    >
      {/* HOVER GLOW */}
      <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none`} />

      {/* ── SCREENSHOT ZONE ── */}
      <div className="px-4 pt-4">
        <UploadZone
          projectId={p.id}
          currentImage={p.image}
          onImageChange={onImageChange}
          accentColor={p.accentColor}
          projectName={p.name}
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="p-5 flex flex-col flex-1">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2.5">
            <span className="text-2xl leading-none mt-0.5">{p.emoji}</span>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">{p.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                  style={{ background: `${p.accentColor}18`, color: p.accentColor }}
                >
                  {p.category}
                </span>
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

        {/* TECH TAGS */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tech.map((t, idx) => (
            <span key={idx}
              className="px-2.5 py-1 bg-white/[0.04] rounded-lg text-[10px] text-gray-400 border border-white/[0.05]">
              {t}
            </span>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 mt-auto">
          {!p.githubOnly ? (
            <button
              onClick={() => open(p.liveUrl)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold hover:shadow-lg hover:scale-105 transition-all"
              style={{ background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}99)` }}
            >
              <ExternalLink size={12} /> Live Demo
            </button>
          ) : (
            <button
              onClick={() => open(p.githubUrl)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold hover:shadow-lg hover:scale-105 transition-all"
              style={{ background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}99)` }}
            >
              <Code2 size={12} /> View Code
            </button>
          )}
          <button
            onClick={() => open(p.githubUrl)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-gray-400 text-xs font-medium hover:text-white hover:border-white/25 transition"
          >
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
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  const handleImageChange = (id, data) =>
    setProjects(prev => prev.map(p => p.id === id ? { ...p, image: data } : p));

  const filtered =
    active === "All"      ? projects
    : active === "Featured" ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === active);

  const screenshotCount = projects.filter(p => p.image).length;

  return (
    <SectionWrapper id="projects" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle pre="What I Build" main="My" accent="Projects" />
        <SectionSubtitle>Products shipped with passion — add screenshots to bring them to life</SectionSubtitle>

        {/* SCREENSHOT PROGRESS BAR */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-sm mx-auto mb-10 -mt-6 p-4 rounded-2xl bg-white/[0.025] border border-white/[0.07]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Camera size={13} className="text-cyan-400" />
              <span className="text-xs text-gray-400 font-medium">Screenshots Added</span>
            </div>
            <span className="text-xs font-bold text-cyan-400">{screenshotCount} / {projects.length}</span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${(screenshotCount / projects.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
            />
          </div>
          <p className="text-[10px] text-gray-600 mt-2 text-center">
            Click the upload area on any card · Drag & drop supported
          </p>
        </motion.div>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map(f => (
            <motion.button key={f} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === f
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white hover:border-white/[0.14]"
              }`}>
              {f}
              {f === "Featured" && <Star size={10} className="inline ml-1 mb-0.5 fill-current" />}
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

        {/* VIEW ALL */}
        <div className="text-center mt-12">
          <motion.a
            href="https://github.com/manish780386"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition"
          >
            <Github size={15} /> View All on GitHub →
          </motion.a>
        </div>
      </div>
    </SectionWrapper>
  );
}