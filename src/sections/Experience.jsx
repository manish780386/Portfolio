import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Book, ChevronDown } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

const EXPERIENCE = [
  {
    title: "Full Stack Developer Intern",
    org: "The Prime Step",
    time: "2023 – Present",
    type: "Current",
    desc: "Building and maintaining full-stack features with React, Django, and SQL. Developed REST APIs, admin dashboards, real-time notifications, and improved system performance by 30%.",
    tags: ["React", "Django", "SQL", "REST API", "Python"],
    color: "from-cyan-500 to-indigo-500",
    dot: "#06b6d4",
  },
  {
    title: "Web Development Intern",
    org: "Cod Soft",
    time: "2023 – 2024",
    type: "Past",
    desc: "Frontend development using React and JavaScript. Built reusable UI component library, improved page load times, and collaborated in agile sprints.",
    tags: ["React", "JavaScript", "CSS", "UI/UX"],
    color: "from-pink-500 to-purple-500",
    dot: "#ec4899",
  },
];

const EDUCATION = [
  {
    title: "B.Tech CSE — Cyber Security",
    org: "SVVV Indore",
    time: "2023 – 2027",
    type: "Current",
    desc: "Pursuing Bachelor's in Computer Science with a specialization in Information & Cyber Security. Actively involved in AI/ML projects and open-source development.",
    tags: ["Cyber Security", "AI/ML", "Full Stack", "Data Analytics"],
    color: "from-green-500 to-teal-500",
    dot: "#22c55e",
  },
  {
    title: "Higher Secondary (PCM)",
    org: "Govt. Excellence Higher Secondary School",
    time: "2020 – 2023",
    type: "Past",
    desc: "Completed higher secondary with focus on Mathematics, Physics, and Computer Science. Developed early interest in programming.",
    tags: ["Mathematics", "Physics", "Computer Science"],
    color: "from-yellow-500 to-orange-500",
    dot: "#eab308",
  },
];

function TimelineItem({ item, i, isLeft }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: i * 0.12 }}
      className="relative"
    >
      {/* DOT on timeline */}
      <div
        className="absolute top-6 -left-[9px] w-4 h-4 rounded-full border-2 border-[#04050e] shadow-lg z-10"
        style={{ backgroundColor: item.dot, boxShadow: `0 0 12px ${item.dot}60` }}
      />

      <div
        className="ml-6 p-5 rounded-2xl bg-white/[0.025] border border-white/[0.07] cursor-pointer hover:border-white/[0.12] transition-all"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                {item.time}
              </span>
              {item.type === "Current" && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
                  ● Current
                </span>
              )}
            </div>
            <h4 className="text-sm font-bold text-white leading-tight">{item.title}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{item.org}</p>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={15} className="text-gray-600 shrink-0 mt-1" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-gray-400 text-xs leading-relaxed mt-3 mb-3">{item.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white/[0.04] rounded-md text-[10px] text-gray-400 border border-white/[0.06]">{t}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle pre="My Journey" main="Experience &" accent="Education" />
        <SectionSubtitle>Click each card to expand details</SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-10">
          {/* EXPERIENCE COLUMN */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Briefcase size={16} />
              </div>
              <h3 className="text-base font-bold text-white">Work Experience</h3>
            </div>
            <div className="relative pl-2 space-y-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent" />
              {EXPERIENCE.map((e, i) => <TimelineItem key={i} item={e} i={i} isLeft />)}
            </div>
          </div>

          {/* EDUCATION COLUMN */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                <Book size={16} />
              </div>
              <h3 className="text-base font-bold text-white">Education</h3>
            </div>
            <div className="relative pl-2 space-y-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/50 via-white/10 to-transparent" />
              {EDUCATION.map((e, i) => <TimelineItem key={i} item={e} i={i} isLeft={false} />)}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}