import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

const ALL_PROJECTS = [
  {
    name: "Portfolio Website",
    emoji: "🖥️",
    desc: "Modern animated portfolio with smooth scroll, dark UI, particle effects, and interactive elements.",
    tech: ["React", "Tailwind", "Framer Motion"],
    url: "#",
    github: "#",
    category: "React",
    featured: true,
    color: "from-cyan-500 to-indigo-500",
  },
  {
    name: "SVVV-Notes-Website",
    emoji: "📚",
    desc: "Student platform for quality notes access with auth, file management, and admin controls.",
    tech: ["React", "Django", "SQL"],
    url: "https://svvv-notes-website-poij.vercel.app/",
    github: "https://github.com/manish780386",
    category: "Django",
    featured: true,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "E-Commerce Platform",
    emoji: "🛒",
    desc: "Full-stack shopping platform with product catalog, cart, payment integration, and real-time inventory.",
    tech: ["React", "Django", "SQL", "Tailwind"],
    url: "https://simple-e-commerce-website-beta.vercel.app/",
    github: "https://github.com/manish780386",
    category: "Django",
    featured: false,
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "JobSt@ck",
    emoji: "📋",
    desc: "Full-featured job portal with search, apply, save, track applications, resume builder, and admin panel.",
    tech: ["React", "Django", "Python"],
    url: "https://github.com/manish780386/JobStack.git",
    github: "https://github.com/manish780386/JobStack.git",
    category: "Django",
    featured: true,
    color: "from-green-500 to-teal-500",
  },
  {
    name: "Velvet Brew Café",
    emoji: "☕",
    desc: "Visually stunning café website with online ordering, reservation system, and full admin panel.",
    tech: ["React", "Django", "Framer Motion", "Three.js"],
    url: "https://github.com/manish780386/Velvet-Brew-Cafe-Website.git",
    github: "https://github.com/manish780386/Velvet-Brew-Cafe-Website.git",
    category: "React",
    featured: false,
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "KisanMitra",
    emoji: "🌾",
    desc: "Smart farmer assistant for market info, produce selling, and buyer-farmer connections with TypeScript.",
    tech: ["React", "TypeScript", "Tailwind"],
    url: "https://github.com/manish780386/-KisanMitra.git",
    github: "https://github.com/manish780386/-KisanMitra.git",
    category: "TypeScript",
    featured: true,
    color: "from-lime-500 to-green-500",
  },
  {
    name: "LIC Agent Website",
    emoji: "🏢",
    desc: "Enterprise platform for LIC agents — client CRM, policy management, and sales analytics. 6+ months in dev.",
    tech: ["React", "Django", "Tailwind"],
    url: "https://santosh-gayakwad-lic.vercel.app/",
    github: "https://github.com/manish780386",
    category: "Django",
    featured: false,
    color: "from-blue-500 to-cyan-500",
  },
];

const FILTERS = ["All", "Featured", "React", "Django", "TypeScript"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? ALL_PROJECTS
      : active === "Featured"
      ? ALL_PROJECTS.filter((p) => p.featured)
      : ALL_PROJECTS.filter((p) => p.category === active);

  return (
    <SectionWrapper id="projects" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle pre="What I Build" main="My" accent="Projects" />
        <SectionSubtitle>Products I've shipped with passion and precision</SectionSubtitle>

        {/* FILTER TABS */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === f
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white hover:border-white/[0.14]"
              }`}
            >
              {f}
              {f === "Featured" && (
                <Star size={11} className="inline ml-1 mb-0.5 fill-current" />
              )}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07] cursor-default overflow-hidden flex flex-col"
              >
                {/* HOVER GLOW */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 rounded-2xl`} />

                {/* TOP */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{p.emoji}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{p.name}</h3>
                      <span className="text-[10px] text-gray-600">{p.category}</span>
                    </div>
                  </div>
                  {p.featured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-400 border border-cyan-500/20 shrink-0">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">{p.desc}</p>

                {/* TECH TAGS */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white/[0.04] rounded-lg text-[10px] text-gray-400 border border-white/[0.05]">{t}</span>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-auto">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r ${p.color} text-white text-xs font-semibold hover:shadow-lg transition-all hover:scale-105`}
                  >
                    <ExternalLink size={12} /> Live
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-gray-400 text-xs font-medium hover:text-white hover:border-white/20 transition"
                  >
                    <Github size={12} /> Code
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}