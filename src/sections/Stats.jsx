import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { SectionWrapper } from "../components/SectionWrapper";

const STATS = [
  { num: 20,  suffix: "+", label: "Projects Built",    icon: "🚀", color: "from-cyan-500 to-blue-500"    },
  { num: 10,  suffix: "+", label: "Certifications",    icon: "🏆", color: "from-indigo-500 to-purple-500" },
  { num: 3,   suffix: "+", label: "Years Learning",    icon: "📚", color: "from-green-500 to-teal-500"   },
  { num: 200, suffix: "+", label: "GitHub Commits",    icon: "💻", color: "from-pink-500 to-rose-500"    },
  { num: 50,  suffix: "+", label: "DSA Solved",        icon: "🧩", color: "from-yellow-500 to-orange-500"},
  { num: 2,   suffix: "",  label: "Internships",       icon: "💼", color: "from-blue-500 to-cyan-500"    },
];

/* ── Published products — shown separately below ── */
const PUBLISHED = [
  {
    icon: "🌳",
    name: "JSON Tree Visualizer",
    sub: "VS Code Extension",
    num: 37,
    suffix: "+",
    metric: "Installs",
    color: "from-emerald-400 to-cyan-500",
    glow: "#06b6d4",
    url: "https://marketplace.visualstudio.com/items?itemName=mdange.json-tree-visualizer",
  },
  {
    icon: "🎨",
    name: "Operator Colorizer Pro",
    sub: "VS Code Extension",
    num: 8,
    suffix: "+",
    metric: "Installs",
    color: "from-orange-400 to-pink-500",
    glow: "#f97316",
    url: "https://marketplace.visualstudio.com/items?itemName=mdange.operator-colorizer",
  },
  {
    icon: "⚡",
    name: "DjangoForge",
    sub: "PyPI Library",
    num: 1,
    suffix: " pkg",
    metric: "Published",
    color: "from-blue-400 to-indigo-500",
    glow: "#6366f1",
    url: "https://pypi.org/project/django-forgekit/",
  },
];

function StatCard({ stat, i }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      whileHover={{ scale: 1.06, y: -4 }}
      className="relative group text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] cursor-pointer overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 rounded-2xl`} />
      <div className="text-2xl mb-3">{stat.icon}</div>
      <div className={`text-3xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
        {inView ? <CountUp end={stat.num} duration={2} suffix={stat.suffix} /> : `0${stat.suffix}`}
      </div>
      <p className="text-gray-500 text-xs font-medium">{stat.label}</p>
    </motion.div>
  );
}

function PublishedCard({ p, i }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.a
      ref={ref}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group flex flex-col items-center text-center p-5 rounded-2xl border overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.025)",
        borderColor: `${p.glow}30`,
      }}
    >
      {/* GLOW */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `inset 0 0 30px ${p.glow}15, 0 0 30px ${p.glow}20` }}
      />

      {/* TOP BADGE */}
      <span
        className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-3"
        style={{ background: `${p.glow}20`, color: p.glow, border: `1px solid ${p.glow}35` }}
      >
        {p.sub}
      </span>

      {/* ICON */}
      <motion.div
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="text-3xl mb-3"
      >
        {p.icon}
      </motion.div>

      {/* COUNT */}
      <div className={`text-3xl font-extrabold bg-gradient-to-r ${p.color} bg-clip-text text-transparent mb-1`}>
        {inView ? <CountUp end={p.num} duration={2} suffix={p.suffix} /> : `0${p.suffix}`}
      </div>
      <p className="text-gray-500 text-[10px] font-medium mb-1">{p.metric}</p>

      {/* NAME */}
      <p className="text-white text-xs font-bold leading-tight">{p.name}</p>

      {/* HOVER ARROW */}
      <motion.span
        initial={{ opacity: 0, x: -4 }}
        whileInView={{ opacity: 0 }}
        className="absolute bottom-3 right-3 text-gray-700 group-hover:text-gray-400 text-xs transition-all group-hover:opacity-100 opacity-0"
      >
        ↗
      </motion.span>
    </motion.a>
  );
}

export default function Stats() {
  return (
    <SectionWrapper className="py-16">
      <div className="max-w-6xl mx-auto px-6 space-y-6">

        {/* ── MAIN STATS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {STATS.map((s, i) => <StatCard key={i} stat={s} i={i} />)}
        </div>

        {/* ── PUBLISHED PRODUCTS ── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/60"
            />
            <span className="text-xs font-black text-white uppercase tracking-widest">
              Published & Live
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PUBLISHED.map((p, i) => <PublishedCard key={i} p={p} i={i} />)}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}