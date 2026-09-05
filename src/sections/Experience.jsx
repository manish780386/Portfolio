import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, ChevronDown, MapPin, GraduationCap,
  Award, Calendar, Tag, CheckCircle2
} from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const EXPERIENCE = [
  {
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
    tags: ["React", "Django", "DRF", "Python", "REST API", "PostgreSQL", "Tailwind CSS", "JavaScript"],
    color: "#34d399",
    icon: "💼",
  },
];

const EDUCATION = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    spec: "Cyber Security",
    org: "Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV)",
    location: "Indore, Madhya Pradesh",
    time: "2023 – 2027",
    status: "In Progress",
    cgpa: "8.60",
    desc: "Specializing in Information & Cyber Security. Coursework spans network security, cryptography, data structures & algorithms, operating systems, and full-stack web development.",
    subjects: ["Network Security", "Cryptography", "Data Structures", "Operating Systems", "DBMS", "Web Development"],
    color: "#60a5fa",
    icon: "🎓",
  },
  {
    degree: "Class 12th — PCM + Computer Science",
    spec: null,
    org: "Govt. Excellence Higher Secondary School",
    location: "Indore, Madhya Pradesh",
    time: "2021 – 2023",
    status: "Completed",
    cgpa: "76.2%",
    desc: "Completed higher secondary with Physics, Chemistry, Mathematics, and Computer Science as core subjects.",
    subjects: ["Mathematics", "Physics", "Chemistry", "Computer Science"],
    color: "#a78bfa",
    icon: "📗",
  },
  {
    degree: "Class 10th — Secondary Education",
    spec: null,
    org: "Govt. Excellence Higher Secondary School",
    location: "Indore, Madhya Pradesh",
    time: "2019 – 2021",
    status: "Completed",
    cgpa: "89%",
    desc: "Completed secondary education with a strong foundation in Mathematics and Science.",
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Science"],
    color: "#fbbf24",
    icon: "📘",
  },
];

/* ── STATUS BADGE ── */
function StatusBadge({ status, color }) {
  const isActive = status === "In Progress";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
      style={{ background: `${color}15`, border: `1px solid ${color}35`, color }}
    >
      {isActive ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: color }} />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: color }} />
        </span>
      ) : (
        <CheckCircle2 size={9} />
      )}
      {status}
    </span>
  );
}

/* ── EXPERIENCE CARD ── */
function ExpCard({ item, i }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="relative"
    >
      {/* Timeline dot */}
      <div
        className="absolute top-6 -left-[9px] w-3.5 h-3.5 rounded-full border-2 border-[#060a11] z-10"
        style={{ background: item.color, boxShadow: `0 0 10px ${item.color}60` }}
      />

      <div
        className="ml-6 rounded-2xl overflow-hidden cursor-pointer group"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: `1px solid rgba(255,255,255,0.07)`,
          transition: "border-color 0.3s",
        }}
        onClick={() => setOpen(o => !o)}
      >
        {/* Top accent */}
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }} />

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">

              {/* Time + status */}
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <div className="flex items-center gap-1 text-gray-600 text-[10px]">
                  <Calendar size={9} />
                  <span className="font-mono-label uppercase">{item.time}</span>
                </div>
                <StatusBadge status={item.status} color={item.color} />
              </div>

              {/* Title + org */}
              <h4 className="text-sm font-black text-white leading-tight">{item.title}</h4>
              <p className="text-xs font-semibold mt-0.5" style={{ color: item.color }}>{item.org}</p>

              {/* Location */}
              <div className="flex items-center gap-1 mt-1.5 text-gray-700 text-[10px]">
                <MapPin size={9} /><span>{item.location}</span>
              </div>
            </div>

            {/* Icon + chevron */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="text-2xl">{item.icon}</div>
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={14} className="text-gray-600" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Expandable */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <div
                className="px-5 pb-5 pt-4 space-y-4 border-t"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}
                onClick={e => e.stopPropagation()}
              >
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>

                <ul className="space-y-2">
                  {item.points.map((pt, pi) => (
                    <li key={pi} className="flex gap-2 text-gray-500 text-xs">
                      <span className="shrink-0 mt-0.5" style={{ color: item.color }}>▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div>
                  <div className="flex items-center gap-1 text-gray-700 text-[10px] uppercase tracking-widest mb-2">
                    <Tag size={9} /> Tech Used
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t, ti) => (
                      <span key={ti}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                        style={{ background: `${item.color}12`, border: `1px solid ${item.color}25`, color: item.color }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── EDUCATION CARD ── */
function EduCard({ item, i }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="relative"
    >
      <div
        className="absolute top-6 -left-[9px] w-3.5 h-3.5 rounded-full border-2 border-[#060a11] z-10"
        style={{ background: item.color, boxShadow: `0 0 10px ${item.color}60` }}
      />

      <div
        className="ml-6 rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
        onClick={() => setOpen(o => !o)}
      >
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }} />

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <div className="flex items-center gap-1 text-gray-600 text-[10px]">
                  <Calendar size={9} />
                  <span className="font-mono-label uppercase">{item.time}</span>
                </div>
                <StatusBadge status={item.status} color={item.color} />
              </div>

              <h4 className="text-sm font-black text-white leading-tight">{item.degree}</h4>
              {item.spec && (
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: item.color }}>
                  Specialization: {item.spec}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-0.5">{item.org}</p>

              <div className="flex items-center gap-1 mt-1.5 text-gray-700 text-[10px]">
                <MapPin size={9} /><span>{item.location}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="text-2xl">{item.icon}</div>
              <div
                className="text-xs font-black px-2 py-0.5 rounded-lg"
                style={{ background: `${item.color}15`, color: item.color }}
              >
                {item.cgpa}
              </div>
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={14} className="text-gray-600" />
              </motion.div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <div
                className="px-5 pb-5 pt-4 space-y-4 border-t"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}
                onClick={e => e.stopPropagation()}
              >
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>

                {item.subjects && (
                  <div>
                    <p className="text-gray-700 text-[10px] uppercase tracking-widest mb-2">Key Subjects</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.subjects.map((s, si) => (
                        <span key={si}
                          className="px-2 py-0.5 rounded-md text-[10px]"
                          style={{ background: `${item.color}10`, border: `1px solid ${item.color}22`, color: item.color }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════ */
export default function Experience() {
  return (
    <SectionWrapper id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle index="02" label="My journey" main="Experience &" accent="education" />
        <SectionSubtitle>Click any card to expand full details.</SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-10">

          {/* ── WORK ── */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-[#34d399]/10 text-[#34d399]">
                <Briefcase size={15} />
              </div>
              <h3 className="text-sm font-bold text-white">Work Experience</h3>
              <span className="text-[10px] text-gray-600 ml-auto">1 position</span>
            </div>

            <div className="relative pl-2 space-y-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#34d399]/60 via-white/10 to-transparent" />
              {EXPERIENCE.map((e, i) => <ExpCard key={i} item={e} i={i} />)}
            </div>

            {/* Certs note */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <Award size={14} className="text-yellow-400 shrink-0 mt-0.5" />
              <p className="text-gray-600 text-xs leading-relaxed">
                10+ certifications from NPTEL · Cisco · Infosys · Physics Wallah — see the{" "}
                <span className="text-cyan-400 font-semibold">Certifications</span> section below.
              </p>
            </motion.div>
          </div>

          {/* ── EDUCATION ── */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-[#60a5fa]/10 text-[#60a5fa]">
                <GraduationCap size={15} />
              </div>
              <h3 className="text-sm font-bold text-white">Education</h3>
              <span className="text-[10px] text-gray-600 ml-auto">3 qualifications</span>
            </div>

            <div className="relative pl-2 space-y-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#60a5fa]/60 via-white/10 to-transparent" />
              {EDUCATION.map((e, i) => <EduCard key={i} item={e} i={i} />)}
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}