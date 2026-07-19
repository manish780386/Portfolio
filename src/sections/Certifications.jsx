import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, CheckCircle2, ExternalLink } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

/* ══════════════════════════════════════════════
   CERT DATA
   To add soft copy: set  image: "/certs/your-file.jpg"
   Put the file in  public/certs/
══════════════════════════════════════════════ */
const CERTS = [
  {
    id: 1,
    title: "Internet of Things (IoT)",
    org: "NPTEL — IIT",
    icon: "🌐",
    color: "from-blue-500 to-indigo-500",
    glow: "#6366f1",
    year: "2024",
    grade: "Completed",
    desc: "Covered IoT architecture, protocols, smart devices, and real-world applications through IIT faculty-led coursework.",
    image: "../public/certification/iot.png",            // e.g. "/certs/nptel-iot.jpg"
    verifyUrl: "../public/certification/iot.png",
  },
  {
    id: 2,
    title: "Soft Skills for Professionals",
    org: "NPTEL — IIT",
    icon: "🤝",
    color: "from-green-500 to-teal-500",
    glow: "#14b8a6",
    year: "2024",
    grade: "Completed",
    desc: "Developed communication, teamwork, leadership, and professional etiquette skills through structured exercises.",
    image: "../public/certification/softskill.png",
    verifyUrl: "../public/certification/softskill.png",
  },
   {
    id: 3,
    title: "Introduction to Cloud Computing",
    org: "NPTEL — IIT",
    icon: "☁️",
    color: "from-green-500 to-teal-500",
    glow: "#10b3c1",
    year: "2026",
    grade: "Completed",
    desc: "Learned cloud computing fundamentals, deployment models, and services through IIT faculty-led coursework.",
    image: "../public/certification/cloud.png",
    verifyUrl: "../public/certification/cloud.png",
  },
  {
    id: 4,
    title: "Artificial Intelligence",
    org: "Physics Wallah (PW)",
    icon: "🤖",
    color: "from-purple-500 to-pink-500",
    glow: "#a855f7",
    year: "2025",
    grade: "Completed",
    desc: "Fundamentals of AI including machine learning, neural networks, NLP, and real-world AI application design.",
    image: "../public/certification/ai.png",
    verifyUrl: "../public/certification/ai.png",
  },
  {
    id: 5,
    title: "Python Essentials 1 & 2",
    org: "Cisco Networking Academy",
    icon: "🐍",
    color: "from-yellow-500 to-orange-500",
    glow: "#f97316",
    year: "2024",
    grade: "Passed",
    desc: "Core Python programming — data types, OOP, file handling, exceptions, and practical problem solving.",
    image: "../public/certification/pythoncisco.png",
    verifyUrl: "../public/certification/pythoncisco.png",
  },
  {
    id: 6,
    title: "Introduction to Cybersecurity",
    org: "Cisco Networking Academy",
    icon: "🔒",
    color: "from-red-500 to-rose-500",
    glow: "#ef4444",
    year: "2024",
    grade: "Passed",
    desc: "Explored cybersecurity threats, network defence, cryptography, and best practices for securing systems.",
    image: "../public/certification/cybercisco.png",
    verifyUrl: "../public/certification/cybercisco.png",
  },
  {
    id: 7,
    title: "CSICI Certified Instructor",
    org: "TheTechUnique Academy",
    icon: "🎓",
    color: "from-cyan-500 to-blue-500",
    glow: "#06b6d4",
    year: "2024",
    grade: "Certified",
    desc: "Hands-on training and certification in cybersecurity instruction, tools, and ethical hacking fundamentals.",
    image: "../public/certification/hackthon.png",
    verifyUrl: "../public/certification/hackthon.png",
  },
  {
    id: 8,
    title: "Python Programming Training",
    org: "Infosys Springboard",
    icon: "💻",
    color: "from-indigo-500 to-purple-500",
    glow: "#6366f1",
    year: "2025",
    grade: "Completed",
    desc: "Advanced Python concepts including data structures, algorithms, and application development with Infosys mentors.",
    image: "../public/certification/infopy.png",
    verifyUrl: "../public/certification/infopy.png",
  },
 
];

const GRADE_STYLE = {
  "Elite":     "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "Certified": "bg-cyan-500/15   text-cyan-400   border-cyan-500/30",
  "Passed":    "bg-green-500/15  text-green-400  border-green-500/30",
  "Completed": "bg-gray-500/15   text-gray-400   border-gray-500/30",
};

/* ── FULLSCREEN MODAL ── */
function Modal({ cert, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{ scale: 0.88,    opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className={`relative p-6 bg-gradient-to-br ${cert.color}`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{cert.icon}</div>
              <div>
                <h2 className="text-white font-black text-lg leading-tight">{cert.title}</h2>
                <p className="text-white/80 text-sm mt-0.5">{cert.org}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border bg-black/30 ${GRADE_STYLE[cert.grade]}`}>
                    <CheckCircle2 size={9} className="inline mr-1 mb-0.5" />{cert.grade}
                  </span>
                  <span className="text-white/60 text-[11px]">{cert.year}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose}
              className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition shrink-0">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="bg-[#0a0e1a] p-6">
          {/* CERT IMAGE if available */}
          {cert.image ? (
            <img src={cert.image} alt={cert.title}
              className="w-full rounded-2xl border border-white/10 mb-5 object-contain max-h-64" />
          ) : (
            <div className="flex flex-col items-center justify-center py-10 rounded-2xl mb-5"
              style={{ background: `${cert.glow}10`, border: `1px dashed ${cert.glow}30` }}>
              <div className="text-5xl mb-3">{cert.icon}</div>
              <p className="text-gray-500 text-xs">
                Add image: <code className="text-gray-400">public/certs/cert-name.jpg</code>
              </p>
            </div>
          )}

          {/* DESCRIPTION */}
          <p className="text-gray-400 text-sm leading-relaxed mb-5">{cert.desc}</p>

          {/* STATS ROW */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Organization", val: cert.org.split("—")[0].trim() },
              { label: "Year",         val: cert.year },
              { label: "Grade",        val: cert.grade },
            ].map((s, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-white font-bold text-sm">{s.val}</div>
                <div className="text-gray-600 text-[10px] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* VERIFY BUTTON */}
          <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition bg-gradient-to-r ${cert.color} text-white hover:opacity-90`}>
            <ExternalLink size={14} /> View Certificate
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── CERT CARD ── */
function CertCard({ cert, i }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && <Modal cert={cert} onClose={() => setOpen(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.07, duration: 0.5 }}
        whileHover={{ scale: 1.04, y: -6 }}
        onClick={() => setOpen(true)}
        className="group relative rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* ANIMATED HOVER BG */}
        <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300`} />

        {/* TOP GRADIENT LINE */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${cert.color}`}
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* CERT IMAGE THUMBNAIL */}
        {cert.image && (
          <div className="relative h-24 overflow-hidden">
            <img src={cert.image} alt={cert.title}
              className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#04050e]/90" />
          </div>
        )}

        <div className="p-5">
          {/* ICON + GRADE + YEAR */}
          <div className="flex items-start justify-between mb-3">
            <motion.div
              whileHover={{ scale: 1.2, rotate: [-5, 5, 0] }}
              transition={{ duration: 0.35 }}
              className="text-3xl leading-none"
            >
              {cert.icon}
            </motion.div>
            <div className="flex flex-col items-end gap-1">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${GRADE_STYLE[cert.grade]}`}>
                {cert.grade}
              </span>
              <span className="text-[10px] text-gray-600">{cert.year}</span>
            </div>
          </div>

          <h3 className="text-white font-bold text-sm leading-tight mb-1 group-hover:text-cyan-50 transition-colors">
            {cert.title}
          </h3>
          <p className="text-gray-600 text-[11px] font-medium mb-3">{cert.org}</p>

          {/* TAP HINT */}
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cert.glow }} />
            <span className="text-[10px] font-semibold" style={{ color: cert.glow }}>
              Tap to view details
            </span>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <motion.div
          className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r ${cert.color}`}
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </>
  );
}

/* ══ MAIN ══ */
export default function Certifications() {
  return (
    <SectionWrapper id="certifications" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle pre="Always Learning" main="My" accent="Certifications" />
        <SectionSubtitle>Tap any card to view certificate details</SectionSubtitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTS.map((c, i) => <CertCard key={c.id} cert={c} i={i} />)}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          className="text-center text-gray-700 text-xs mt-8">
          🏅 {CERTS.length} Certifications from NPTEL · Cisco · Physics Wallah · Infosys · LetsUpgrade
        </motion.p>
      </div>
    </SectionWrapper>
  );
}