import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

/*
  NOTE: the previous version pointed <img> tags at "../public/certification/*.png".
  That path pattern doesn't resolve at runtime in a Vite build (relative paths into
  /public break once bundled) — every card was rendering a broken image icon.
  Fix: drop the certificate-image dependency until real scanned copies are hosted
  in /public/certs/, and keep the card focused on the info that's actually verified.
  Swap `image: null` for `image: "/certs/your-file.jpg"` per item once you have them.
*/
const CERTS = [
  { title: "Internet of Things (IoT)",             org: "NPTEL",                                  icon: "🌐", color: "from-blue-500 to-indigo-500" },
  { title: "Soft Skills for Professionals",        org: "NPTEL",                                  icon: "🤝", color: "from-teal-500 to-green-500" },
  { title: "Artificial Intelligence",               org: "Physics Wallah",                         icon: "🤖", color: "from-purple-500 to-pink-500" },
  { title: "GIAC Cyber Defense Certified",          org: "SVVV",                                   icon: "🛡️", color: "from-[#34d399] to-teal-500" },
  { title: "Python Programming Training",           org: "Infosys Springboard",                    icon: "🐍", color: "from-yellow-500 to-orange-500" },
  { title: "Introduction to Cybersecurity",         org: "Cisco Networking Academy",                icon: "🔒", color: "from-red-500 to-rose-500" },
  { title: "Cybersecurity Virtual Experience",      org: "Deloitte",                                icon: "🏢", color: "from-cyan-500 to-blue-500" },
  { title: "Master Git & GitHub",                   org: "Physics Wallah",                          icon: "🔧", color: "from-gray-500 to-slate-500" },
  { title: "CSICI Certified Instructor",            org: "TheTechUnique Academy",                   icon: "🎓", color: "from-indigo-500 to-purple-500" },
  { title: "Cybersecurity Virtual Experience",      org: "Tata",                                    icon: "🏭", color: "from-orange-500 to-red-500" },
];

function Modal({ cert, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 bg-[#0d131d]" onClick={(e) => e.stopPropagation()}>
        <div className={`relative p-6 bg-gradient-to-br ${cert.color}`}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{cert.icon}</div>
              <div>
                <h2 className="text-white font-bold text-base leading-tight">{cert.title}</h2>
                <p className="text-white/80 text-xs mt-0.5">{cert.org}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition shrink-0">
              <X size={15} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-[#34d399] text-xs font-mono-label uppercase mb-4">
            <CheckCircle2 size={13} /> Completed
          </div>
          <p className="text-[#7c8aa0] text-sm leading-relaxed">
            Certificate on file — reach out if you'd like the verification link or a scanned copy for this credential.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CertCard({ cert, i }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AnimatePresence>{open && <Modal cert={cert} onClose={() => setOpen(false)} />}</AnimatePresence>
      <motion.button
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}
        onClick={() => setOpen(true)}
        className="text-left group relative rounded-xl overflow-hidden p-4 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] transition-colors"
      >
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${cert.color} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300`} />
        <div className="text-2xl mb-3">{cert.icon}</div>
        <h3 className="text-white font-semibold text-xs leading-tight mb-1">{cert.title}</h3>
        <p className="text-[#4b5768] text-[10px]">{cert.org}</p>
      </motion.button>
    </>
  );
}

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle index="03" label="Always learning" main="Certifications" />
        <SectionSubtitle>10 credentials across cyber security, AI and dev tooling — tap any card.</SectionSubtitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CERTS.map((c, i) => <CertCard key={c.title + c.org} cert={c} i={i} />)}
        </div>
      </div>
    </SectionWrapper>
  );
}