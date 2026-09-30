import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Tag,
  CheckCircle2,
  Award,
  ArrowUpRight,
  Sparkles,
  X,
  Layers
} from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const TIMELINE_DATA = [
  {
    id: "exp-1",
    category: "experience",
    title: "Full Stack Developer Intern",
    org: "The Prime Step",
    time: "Nov 2023 – 2025",
    status: "Completed",
    location: "Indore, Madhya Pradesh",
    desc: "Worked across the full stack to design, develop and maintain educational software applications. Contributed to feature planning, implementation, and quality improvements in a collaborative product environment.",
    points: [
      "Built and maintained React-based UI components used across the platform",
      "Developed REST APIs with Django REST Framework for core product features",
      "Collaborated with cross-functional teams in agile sprints with daily standups",
      "Optimized database queries and improved platform performance measurably",
      "Delivered features reliably while meeting tight project deadlines",
    ],
    tags: ["React", "Django", "DRF", "Python", "REST API", "PostgreSQL", "Tailwind CSS"],
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.15)",
    icon: Briefcase,
  },
  {
    id: "edu-1",
    category: "education",
    title: "B.Tech — Computer Science & Engg.",
    spec: "Cyber Security",
    org: "Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV)",
    location: "Indore, Madhya Pradesh",
    time: "2023 – 2027",
    status: "In Progress",
    score: "8.60 CGPA",
    desc: "Specializing in Information & Cyber Security. Coursework spans network security, cryptography, data structures & algorithms, operating systems, and full-stack web development.",
    points: [
      "Core focus on Network Security & Cryptographic Protocols",
      "Hands-on practice in Data Structures & Algorithmic Problem Solving",
      "Building full-stack secure web architectures",
    ],
    tags: ["Network Security", "Cryptography", "DSA", "Operating Systems", "DBMS", "Web Dev"],
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.15)",
    icon: GraduationCap,
  },
  {
    id: "edu-2",
    category: "education",
    title: "Class 12th — PCM + Computer Science",
    spec: null,
    org: "Govt. Excellence Higher Secondary School",
    location: "Indore, Madhya Pradesh",
    time: "2021 – 2023",
    status: "Completed",
    score: "76.2%",
    desc: "Completed higher secondary education with a strong focus on Physics, Chemistry, Mathematics, and Computer Science fundamentals.",
    points: [
      "Developed early programming fundamentals in C++ & Computer Science concepts",
      "Built strong analytical skills through advanced mathematics",
    ],
    tags: ["Mathematics", "Physics", "Chemistry", "Computer Science"],
    color: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.15)",
    icon: GraduationCap,
  },
  {
    id: "edu-3",
    category: "education",
    title: "Class 10th — Secondary Education",
    spec: null,
    org: "Govt. Excellence Higher Secondary School",
    location: "Indore, Madhya Pradesh",
    time: "2019 – 2021",
    status: "Completed",
    score: "89.0%",
    desc: "Completed secondary education with high distinction, building core knowledge in Mathematics and General Sciences.",
    points: ["Scored 89% with high distinction in core science subjects"],
    tags: ["Mathematics", "Science", "English"],
    color: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.15)",
    icon: GraduationCap,
  },
];

/* ── STATUS BADGE ── */
function StatusBadge({ status, color }) {
  const isActive = status === "In Progress";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}35`,
        color: color,
      }}
    >
      {isActive ? (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ background: color }}
          />
          <span
            className="relative inline-flex rounded-full h-1.5 w-1.5"
            style={{ background: color }}
          />
        </span>
      ) : (
        <CheckCircle2 size={10} />
      )}
      {status}
    </span>
  );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function Experience() {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    filter === "all"
      ? TIMELINE_DATA
      : TIMELINE_DATA.filter((item) => item.category === filter);

  return (
    <SectionWrapper id="experience" className="py-24 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionTitle label="My Career Path" main="Experience &" accent="Education" />
        <SectionSubtitle>
          A timeline of my professional journey, academic background, and hands-on achievements.
        </SectionSubtitle>

        {/* ── FILTER TABS ── */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {[
              { id: "all", label: "All Milestones", icon: Layers },
              { id: "experience", label: "Work Experience", icon: Briefcase },
              { id: "education", label: "Education", icon: GraduationCap },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    active ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-xl border border-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <TabIcon size={14} className={active ? "text-emerald-400" : ""} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TIMELINE CONTAINER ── */}
        <div className="relative pl-6 md:pl-8 space-y-8">
          {/* Vertical Glowing Line */}
          <div className="absolute left-[11px] md:left-[15px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-emerald-400/80 via-sky-400/50 to-purple-500/20 rounded-full" />

          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="relative group"
                >
                  {/* Timeline Point */}
                  <div
                    className="absolute -left-[27px] md:-left-[31px] top-6 w-5 h-5 rounded-full border-2 border-[#030712] flex items-center justify-center transition-transform duration-300 group-hover:scale-125 z-10"
                    style={{
                      background: item.color,
                      boxShadow: `0 0 12px ${item.color}`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-black/80" />
                  </div>

                  {/* Card View */}
                  <div
                    onClick={() => setSelectedItem(item)}
                    className="p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden backdrop-blur-sm"
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      borderColor: "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {/* Hover Glow Accent */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(600px circle at fill, ${item.glow}, transparent 60%)`,
                      }}
                    />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                      {/* Left Side Info */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <StatusBadge status={item.status} color={item.color} />
                          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-mono">
                            <Calendar size={12} />
                            <span>{item.time}</span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                            {item.title}
                            <ArrowUpRight
                              size={16}
                              className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-emerald-400"
                            />
                          </h3>
                          <p className="text-sm font-semibold" style={{ color: item.color }}>
                            {item.org}
                          </p>
                        </div>

                        {item.spec && (
                          <p className="text-xs text-gray-400">
                            Specialization: <span className="text-gray-200">{item.spec}</span>
                          </p>
                        )}

                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <MapPin size={12} />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Right Side Stats / Badges */}
                      <div className="flex md:flex-col items-end justify-between md:justify-center gap-3 border-t md:border-t-0 border-white/5 pt-3 md:pt-0 shrink-0">
                        {item.score && (
                          <span
                            className="px-3 py-1 rounded-lg text-xs font-black tracking-wide"
                            style={{ background: `${item.color}18`, color: item.color }}
                          >
                            {item.score}
                          </span>
                        )}

                        <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium group-hover:underline">
                          <span>View Details</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags preview */}
                    <div className="mt-4 pt-4 border-t border-white/[0.05] flex flex-wrap gap-1.5 relative z-10">
                      {item.tags.slice(0, 5).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-medium text-gray-400 bg-white/[0.03] border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 5 && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] text-gray-500 bg-white/[0.02]">
                          +{item.tags.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Certifications Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900/40 to-blue-950/30 border border-white/10 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 shrink-0">
              <Award size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Certifications & Credentials</h4>
              <p className="text-xs text-gray-400">
                10+ verified certifications from NPTEL, Cisco, Infosys & Physics Wallah.
              </p>
            </div>
          </div>
          <Sparkles className="text-yellow-400/60 shrink-0 hidden sm:block" size={20} />
        </motion.div>
      </div>

      {/* ── EXPANDED MODAL ── */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-[#0b0f19] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            >
              {/* Modal Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: selectedItem.color }}
              />

              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <StatusBadge status={selectedItem.status} color={selectedItem.color} />
                    <span className="text-xs text-gray-400 font-mono">{selectedItem.time}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedItem.title}</h3>
                  <p className="text-sm font-medium mt-0.5" style={{ color: selectedItem.color }}>
                    {selectedItem.org}
                  </p>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                  {selectedItem.desc}
                </p>

                {selectedItem.points && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Key Highlights & Impact
                    </h4>
                    <ul className="space-y-2">
                      {selectedItem.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <span style={{ color: selectedItem.color }}>▸</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Tag size={12} /> Tech & Skills Involved
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((t, ti) => (
                      <span
                        key={ti}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{
                          background: `${selectedItem.color}15`,
                          border: `1px solid ${selectedItem.color}30`,
                          color: selectedItem.color,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}