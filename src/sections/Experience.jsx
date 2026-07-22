import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, MapPin, GraduationCap, Award } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import StatusChip from "../components/StatusChip.jsx";

/* Sourced directly from resume — no invented history */
const EXPERIENCE = [
  {
    title: "Full Stack Developer Intern",
    org: "The Prime Step",
    time: "Nov 2023 – 2025",
    location: "IT / Computers – Software",
    desc: "Designing, developing and maintaining educational software applications, working across the stack with Python, JavaScript and React.",
    points: [
      "Collaborated with cross-functional teams to plan, implement and test new product features",
      "Improved platform performance and usability through continuous optimization and feedback integration",
      "Delivered work reliably in a fast-paced environment while meeting project deadlines",
    ],
    tags: ["HTML", "CSS", "JavaScript","Tailwind CSS", "React", "Python", "Django","SQL","DRF", "REST API"],
  },
];

const PROJECTS_LOG = [
  {
    name: "DoctorGuide — AI Powered Wellness Platform",
    time: "Jul 2024 – Aug 2025",
    desc: "AI-powered healthcare platform leveraging Google Gemini AI for intelligent symptom analysis, specialist recommendation, doctor booking, and real-time appointment scheduling with a modern responsive interface."
  },
  {
    name: "Spotify Clone — React Music Streaming App",
    time: "Jan 2024 – Feb 2025",
    desc: "Modern music streaming application inspired by Spotify with playlist management, audio playback controls, progress tracking, responsive UI, and reusable React components."
  },
  {
    name: "Virtual-Assistance — AI Voice Assistant",
    time: "Nov 2023 – Dec 2024",
    desc: "Voice-controlled web assistant built with React and Web Speech API, enabling hands-free browsing, website navigation, media playback, and intelligent voice command execution."
  },
];

function TimelineCard({ item, i, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="relative"
    >
      <div className="absolute top-6 -left-[9px] w-3.5 h-3.5 rounded-full border-2 border-[#060a11]" style={{ background: accent }} />
      <div
        className="ml-6 rounded-xl bg-white/[0.025] border border-white/[0.07] hover:border-white/[0.14] transition-colors cursor-pointer overflow-hidden"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono-label text-[10px] text-[#4b5768] uppercase">{item.time}</span>
                <StatusChip tone="active" pulse>Current</StatusChip>
              </div>
              <h4 className="text-sm font-bold text-white">{item.title}</h4>
              <p className="text-xs text-[#7c8aa0] mt-0.5">{item.org}</p>
              <div className="flex items-center gap-1 mt-1.5 text-[#4b5768] text-[10px]">
                <MapPin size={9} /><span>{item.location}</span>
              </div>
            </div>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={15} className="text-[#4b5768] shrink-0 mt-1" />
            </motion.div>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <div className="px-5 pb-5 border-t border-white/[0.05] pt-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                <p className="text-[#7c8aa0] text-xs leading-relaxed">{item.desc}</p>
                <ul className="space-y-1.5">
                  {item.points.map((p, pi) => (
                    <li key={pi} className="text-[#7c8aa0] text-xs flex gap-2">
                      <span className="text-[#34d399] shrink-0 mt-0.5">▸</span>{p}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t, ti) => (
                    <span key={ti} className="px-2 py-0.5 bg-white/[0.04] rounded-md text-[10px] text-[#7c8aa0] border border-white/[0.06]">{t}</span>
                  ))}
                </div>
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
    <SectionWrapper id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle index="02" label="My journey" main="Experience &" accent="education" />
        <SectionSubtitle>Click a card to expand. Tags reflect what I actually shipped with.</SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-10">
          {/* WORK */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-[#34d399]/10 text-[#34d399]"><Briefcase size={15} /></div>
              <h3 className="text-sm font-bold text-white">Work Experience</h3>
            </div>
            <div className="relative pl-2 space-y-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#34d399]/50 via-white/10 to-transparent" />
              {EXPERIENCE.map((e, i) => <TimelineCard key={i} item={e} i={i} accent="#34d399" />)}
            </div>

            {/* PROJECT LOG — small, honest changelog instead of duplicating the Projects section */}
            <div className="mt-8">
              <h4 className="text-xs font-mono-label text-[#4b5768] uppercase mb-3">Recent project log</h4>
              <div className="space-y-2">
                {PROJECTS_LOG.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white font-medium">{p.name} <span className="text-[#4b5768] font-normal">· {p.time}</span></p>
                      <p className="text-[11px] text-[#7c8aa0] mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EDUCATION — SVVV only, as requested */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-[#60a5fa]/10 text-[#60a5fa]"><GraduationCap size={15} /></div>
              <h3 className="text-sm font-bold text-white">Education</h3>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/[0.025] border border-white/[0.07]"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono-label text-[10px] text-[#4b5768] uppercase">2023 – 2027</span>
                <StatusChip tone="active" pulse>In progress</StatusChip>
              </div>
              <h4 className="text-base font-bold text-white leading-snug">B.Tech, Computer Science &amp; Engineering</h4>
              <p className="text-[#60a5fa] text-sm font-medium mt-1">Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV), Indore</p>
              <p className="text-[#7c8aa0] text-xs mt-3 leading-relaxed">
                Specializing in Information &amp; Cyber Security. Coursework spans network security, cryptography,
                data structures &amp; algorithms, and web development.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] text-center">
                  <div className="text-lg font-bold text-white font-mono-label">8.48</div>
                  <div className="text-[10px] text-[#7c8aa0] mt-0.5">CGPA / 10</div>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] text-center">
                  <div className="text-lg font-bold text-white font-mono-label">Cyber Sec.</div>
                  <div className="text-[10px] text-[#7c8aa0] mt-0.5">Specialization</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3"
            >
              <Award size={15} className="text-[#f5b942] shrink-0 mt-0.5" />
              <p className="text-[#7c8aa0] text-xs leading-relaxed">
                10+ certifications completed alongside coursework — see the Certifications section for the full list.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}