import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, ImagePlus, X, Globe, Code2 } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

const INITIAL_PROJECTS = [
  {
    id: 1, name: "Portfolio Website", emoji: "🖥️",
    desc: "Modern animated portfolio with smooth scroll, dark UI, particle effects, 3D tilt card, and interactive sections.",
    tech: ["React", "Tailwind", "Framer Motion", "React Router"],
    liveUrl: "https://manish-portfolio.vercel.app",
    githubUrl: "https://github.com/manish780386",
    category: "React", featured: true, color: "from-cyan-500 to-indigo-500", image: null,
  },
  {
    id: 2, name: "SVVV-Notes-Website", emoji: "📚",
    desc: "Student platform for quality notes access with auth, file management, and admin controls. Used by 100+ students.",
    tech: ["React", "Django", "SQL", "Python"],
    liveUrl: "https://svvv-notes-website-poij.vercel.app/",
    githubUrl: "https://github.com/manish780386",
    category: "Django", featured: true, color: "from-indigo-500 to-purple-500", image: null,
  },
  {
    id: 3, name: "E-Commerce Platform", emoji: "🛒",
    desc: "Full-stack shopping platform with product catalog, cart, payment integration, and real-time inventory updates.",
    tech: ["React", "Django", "SQL", "Tailwind"],
    liveUrl: "https://simple-e-commerce-website-beta.vercel.app/",
    githubUrl: "https://github.com/manish780386",
    category: "Django", featured: false, color: "from-pink-500 to-rose-500", image: null,
  },
  {
    id: 4, name: "JobSt@ck", emoji: "📋",
    desc: "Full-featured job portal — search, apply, track applications, resume builder, premium services & admin posting.",
    tech: ["React", "Django", "Python", "SQL"],
    liveUrl: "https://github.com/manish780386/JobStack",
    githubUrl: "https://github.com/manish780386/JobStack",
    githubOnly: true,
    category: "Django", featured: true, color: "from-green-500 to-teal-500", image: null,
  },
  {
    id: 5, name: "Velvet Brew Café", emoji: "☕",
    desc: "Stunning café website with online ordering, reservation system, 3D elements, and full admin panel.",
    tech: ["React", "Django", "Framer Motion", "Three.js"],
    liveUrl: "https://github.com/manish780386/Velvet-Brew-Cafe-Website",
    githubUrl: "https://github.com/manish780386/Velvet-Brew-Cafe-Website",
    githubOnly: true,
    category: "React", featured: false, color: "from-amber-500 to-orange-500", image: null,
  },
  {
    id: 6, name: "KisanMitra", emoji: "🌾",
    desc: "Smart farmer assistant — market prices, produce selling, buyer-farmer connections, and crop advisory.",
    tech: ["React", "TypeScript", "Tailwind"],
    liveUrl: "https://github.com/manish780386/-KisanMitra",
    githubUrl: "https://github.com/manish780386/-KisanMitra",
    githubOnly: true,
    category: "TypeScript", featured: true, color: "from-lime-500 to-green-500", image: null,
  },
  {
    id: 7, name: "LIC Agent Website", emoji: "🏢",
    desc: "Enterprise platform for LIC agents — client CRM, policy management, and sales analytics dashboard. 6+ months dev.",
    tech: ["React", "Django", "Tailwind", "SQL"],
    liveUrl: "https://santosh-gayakwad-lic.vercel.app/",
    githubUrl: "https://github.com/manish780386",
    category: "Django", featured: false, color: "from-blue-500 to-cyan-500", image: null,
  },
];

const FILTERS = ["All", "Featured", "React", "Django", "TypeScript"];

/* ─── IMAGE UPLOAD ─── */
function ImageUpload({ projectId, currentImage, onImageChange }) {
  const ref = useRef(null);
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onImageChange(projectId, ev.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {currentImage ? (
        <div className="relative group/img">
          <img src={currentImage} alt="Preview" className="w-full h-36 object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition rounded-xl flex items-center justify-center gap-2">
            <button onClick={() => ref.current.click()}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-medium flex items-center gap-1 transition">
              <ImagePlus size={11} /> Change
            </button>
            <button onClick={() => onImageChange(projectId, null)}
              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 text-xs font-medium flex items-center gap-1 transition">
              <X size={11} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => ref.current.click()}
          className="w-full h-28 rounded-xl border border-dashed border-white/10 hover:border-cyan-500/40 bg-white/[0.02] hover:bg-cyan-500/[0.03] transition flex flex-col items-center justify-center gap-1.5 group/up">
          <ImagePlus size={18} className="text-gray-700 group-hover/up:text-cyan-400 transition" />
          <span className="text-[11px] text-gray-700 group-hover/up:text-cyan-400 transition">Add Screenshot</span>
        </button>
      )}
    </div>
  );
}

/* ─── PROJECT CARD ─── */
function ProjectCard({ p, i, onImageChange }) {
  const open = (url) => { if (url) window.open(url, "_blank", "noopener,noreferrer"); };

  return (
    <motion.div layout key={p.id}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.35, delay: i * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl bg-white/[0.025] border border-white/[0.07] overflow-hidden flex flex-col cursor-default">

      <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none`} />

      {/* IMAGE */}
      <div className="px-4 pt-4">
        <ImageUpload projectId={p.id} currentImage={p.image} onImageChange={onImageChange} />
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{p.emoji}</span>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">{p.name}</h3>
              <span className="text-[10px] text-gray-600">{p.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {!p.githubOnly && (
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                <Globe size={8} className="text-green-400" />
                <span className="text-[9px] text-green-400 font-semibold">Live</span>
              </div>
            )}
            {p.featured && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                Featured
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">{p.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tech.map((t, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-white/[0.04] rounded-lg text-[10px] text-gray-400 border border-white/[0.05]">{t}</span>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 mt-auto">
          {/* PRIMARY — always Live Demo if available, else Code */}
          {!p.githubOnly ? (
            <button onClick={() => open(p.liveUrl)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r ${p.color} text-white text-xs font-semibold hover:shadow-lg hover:scale-105 transition-all`}>
              <ExternalLink size={12} /> Live Demo
            </button>
          ) : (
            <button onClick={() => open(p.githubUrl)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r ${p.color} text-white text-xs font-semibold hover:shadow-lg hover:scale-105 transition-all`}>
              <Code2 size={12} /> View Code
            </button>
          )}

          {/* SECONDARY — always GitHub */}
          <button onClick={() => open(p.githubUrl)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-gray-400 text-xs font-medium hover:text-white hover:border-white/20 transition">
            <Github size={12} /> GitHub
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  const handleImageChange = (id, data) =>
    setProjects(prev => prev.map(p => p.id === id ? { ...p, image: data } : p));

  const filtered =
    active === "All"     ? projects :
    active === "Featured"? projects.filter(p => p.featured) :
                           projects.filter(p => p.category === active);

  return (
    <SectionWrapper id="projects" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle pre="What I Build" main="My" accent="Projects" />
        <SectionSubtitle>Products shipped with passion — click to explore</SectionSubtitle>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 mb-8 -mt-6">
          <ImagePlus size={12} className="text-cyan-500/50" />
          <span className="text-[11px] text-gray-600">Hover a card → click the image area to add a screenshot</span>
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
              {f}{f === "Featured" && <Star size={11} className="inline ml-1 mb-0.5 fill-current" />}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} p={p} i={i} onImageChange={handleImageChange} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-10">
          <a href="https://github.com/manish780386" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition">
            <Github size={15} /> View All on GitHub →
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}