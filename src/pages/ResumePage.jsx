import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Mail, MapPin, Github, Linkedin, Globe, Briefcase, 
  Book, Code2, Award, ExternalLink, Phone, FileText, Download, Copy, Check 
} from "lucide-react";
import Footer from "../components/Footer";

// Raw LaTeX File Import (Vite standard syntax)
import rawTexFile from "./resume.tex?raw";

const ME = {
  name: "Manish Dange",
  title: "Full Stack Developer & Cyber Security Enthusiast",
  email: "dangemanish35@gmail.com",
  phone: "+91 7803861195",
  city: "Indore, Madhya Pradesh, India",
  github: "github.com/manish780386",
  linkedin: "linkedin.com/in/manish-dange-2a03b6312",
  leetcode: "leetcode.com/u/dangemanish",
  summary:
    "Full Stack Developer and Cyber Security enthusiast pursuing B.Tech CSE at SVVV Indore. " +
    "I build scalable web applications with React and Django, and bring a security-first mindset " +
    "to auth, APIs and data handling. 600+ DSA problems solved across platforms.",
};

const EXPERIENCE = [{
  title: "Full Stack Developer Intern", company: "The Prime Step", period: "Nov 2023 – Present", type: "Current",
  points: [
    "Designed and maintained educational software applications end to end",
    "Worked with Python, JavaScript and React to build scalable, user-friendly solutions",
    "Collaborated cross-functionally to plan, implement and test new features",
  ],
  tags: ["React", "Django", "Python", "REST API"],
}];

const PROJECTS = [
  { name: "NeighborHub — Hyperlocal Community Platform", stack: "React · Django REST · Channels · Redis", url: "https://github.com/manish780386/NeighborHub", desc: "Geolocation-based hyperlocal social platform with real-time WebSocket messaging." },
  { name: "Mitti Ka Swad — Food Marketplace", stack: "React · Django · Razorpay · Web Speech API", url: "https://github.com/manish780386/Miiti-Ka-Swwad", desc: "Heritage food platform with regional storytelling, HMAC payment verification, and voice search." },
  { name: "TripKar — AI Travel Planner", stack: "React · Django · Claude API · Docker", url: "https://github.com/manish780386/TRIPKAR", desc: "AI-driven natural language trip itinerary planner containerized with Docker Compose." },
];

const CERTS = [
  "Internship Completion Certificate — The Prime Step",
  "Introduction to Cybersecurity — Cisco Networking Academy",
  "Internet of Things (IoT) — NPTEL (IIT Kharagpur)",
  "Cloud Technologies — Infosys",
  "Python Programming Training — Infosys",
  "Soft Skills for Professionals — NPTEL (IIT Roorkee)",
  "Introduction to Cloud Computing — NPTEL (IIT Roorkee)",
];

function SecHead({ icon, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-white/[0.07]">
      <div className="p-1.5 rounded-lg bg-[#34d399]/10 text-[#34d399] shrink-0">{icon}</div>
      <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#34d399] font-mono">{title}</h2>
    </div>
  );
}

export default function ResumePage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("preview"); // 'preview' or 'latex'

  const handleCopyTex = () => {
    navigator.clipboard.writeText(rawTexFile);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTex = () => {
    const element = document.createElement("a");
    const file = new Blob([rawTexFile], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "Manish_Dange_Resume.tex";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <div className="pt-8 max-w-5xl mx-auto px-4 md:px-6 relative z-10 pb-16">
        {/* Header Navigation & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <motion.button 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            whileHover={{ x: -4 }}
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm text-[#7c8aa0] hover:text-white transition"
          >
            <ArrowLeft size={16} /> Back
          </motion.button>

          <div className="flex items-center gap-3">
            {/* View Switcher Tabs */}
            <div className="flex bg-[#0b0f1a] p-1 border border-white/[0.08] rounded-xl">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  activeTab === "preview" ? "bg-[#34d399] text-[#060a11]" : "text-[#7c8aa0] hover:text-white"
                }`}
              >
                Visual View
              </button>
              <button
                onClick={() => setActiveTab("latex")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${
                  activeTab === "latex" ? "bg-[#34d399] text-[#060a11]" : "text-[#7c8aa0] hover:text-white"
                }`}
              >
                <FileText size={13} /> LaTeX Code
              </button>
            </div>

            {/* LaTeX Quick Actions */}
            <button
              onClick={handleDownloadTex}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-white text-xs font-medium transition"
              title="Download resume.tex"
            >
              <Download size={14} /> .TEX
            </button>

            <motion.a 
              href={`mailto:${ME.email}`} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#34d399] text-[#060a11] text-xs font-bold"
            >
              <Mail size={14} /> Hire Me
            </motion.a>
          </div>
        </div>

        {/* Tab 1: Visual Resume */}
        {activeTab === "preview" ? (
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }}
            className="bg-[#0b0f1a] border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <div className="relative px-8 py-8 border-b border-white/[0.06]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#34d399]" />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{ME.name}</h1>
              <p className="text-[#34d399] font-semibold text-sm mb-4">{ME.title}</p>
              
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {[
                  { icon: <Mail size={12} />, text: ME.email },
                  { icon: <Phone size={12} />, text: ME.phone },
                  { icon: <MapPin size={12} />, text: ME.city },
                  { icon: <Github size={12} />, text: ME.github, url: `https://${ME.github}` },
                  { icon: <Linkedin size={12} />, text: "LinkedIn", url: `https://${ME.linkedin}` },
                  { icon: <Globe size={12} />, text: "LeetCode", url: `https://${ME.leetcode}` },
                ].map((c, i) => c.url ? (
                  <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#7c8aa0] hover:text-[#34d399] transition text-xs">
                    <span className="text-[#34d399]">{c.icon}</span>{c.text}
                  </a>
                ) : (
                  <span key={i} className="flex items-center gap-1.5 text-[#7c8aa0] text-xs">
                    <span className="text-[#34d399]">{c.icon}</span>{c.text}
                  </span>
                ))}
              </div>
              <p className="text-[#7c8aa0] text-sm leading-relaxed mt-5 max-w-3xl">{ME.summary}</p>
            </div>

            <div className="p-8 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <SecHead icon={<Briefcase size={13} />} title="Work Experience" />
                  {EXPERIENCE.map((e, i) => (
                    <div key={i} className="relative pl-4 border-l border-[#34d399]/25">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#34d399] border-2 border-[#0b0f1a]" />
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h3 className="text-sm font-bold text-white">{e.title}</h3>
                          <p className="text-[#34d399] text-xs font-semibold">{e.company}</p>
                        </div>
                        <span className="text-[10px] text-[#4b5768]">{e.period}</span>
                      </div>
                      <ul className="space-y-1.5 mb-3">
                        {e.points.map((pt, pi) => (
                          <li key={pi} className="text-[#7c8aa0] text-xs leading-relaxed flex gap-2">
                            <span className="text-[#34d399] shrink-0">▸</span>{pt}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {e.tags.map((t, ti) => (
                          <span key={ti} className="px-2 py-0.5 rounded-md text-[10px] border bg-white/[0.04] border-white/[0.07] text-[#7c8aa0]">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <SecHead icon={<Code2 size={13} />} title="Key Projects" />
                  <div className="space-y-3">
                    {PROJECTS.map((p, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.06]">
                        <div className="flex items-start justify-between gap-2 mb-0.5">
                          <h3 className="text-sm font-bold text-white">{p.name}</h3>
                          {p.url && (
                            <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-[#4b5768] hover:text-[#34d399] transition shrink-0">
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        <p className="text-[11px] text-[#34d399]/80 font-semibold mb-1">{p.stack}</p>
                        <p className="text-[#7c8aa0] text-xs leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-7">
                <div>
                  <SecHead icon={<Book size={13} />} title="Education" />
                  <div className="relative pl-4 border-l border-[#60a5fa]/25">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#60a5fa] border-2 border-[#0b0f1a]" />
                    <h3 className="text-xs font-bold text-white leading-snug">B.Tech CSE — Cyber Security</h3>
                    <p className="text-[#60a5fa] text-[11px] font-semibold mt-0.5">Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV), Indore</p>
                    <p className="text-[10px] text-[#4b5768] mt-0.5">2023 – 2027</p>
                    <p className="text-[10px] text-[#7c8aa0] mt-1">CGPA: 8.6 / 10</p>
                  </div>
                </div>

                <div>
                  <SecHead icon={<Award size={13} />} title="Certifications" />
                  <ul className="space-y-2">
                    {CERTS.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#34d399] shrink-0 text-xs mt-0.5">▸</span>
                        <p className="text-xs text-white leading-snug">{c}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Tab 2: Raw TeX Source Code Inspector */
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }}
            className="bg-[#0b0f1a] border border-white/[0.08] rounded-2xl overflow-hidden p-6"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-sm font-bold text-white">resume.tex</h3>
                <p className="text-xs text-[#7c8aa0]">LaTeX Source Document</p>
              </div>
              <button
                onClick={handleCopyTex}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#34d399]/10 text-[#34d399] text-xs font-bold border border-[#34d399]/20 hover:bg-[#34d399]/20 transition"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#060a11] border border-white/[0.05] text-[#34d399] font-mono text-xs overflow-x-auto max-h-[600px] leading-relaxed">
              {rawTexFile}
            </pre>
          </motion.div>
        )}

        {/* Footer Bar */}
        <div className="mt-8 px-8 py-4 bg-[#0b0f1a] border border-white/[0.05] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-[#4b5768]">{ME.name} · Full Stack Developer · 2026</p>
          <div className="flex items-center gap-4">
            {[{ label: "GitHub", url: `https://${ME.github}` }, { label: "LinkedIn", url: `https://${ME.linkedin}` }, { label: "LeetCode", url: `https://${ME.leetcode}` }].map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#4b5768] hover:text-[#34d399] transition flex items-center gap-1">
                {l.label} <ExternalLink size={9} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}