import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Github, Linkedin, Globe, Briefcase, Book, Code2, Award, ExternalLink, Phone } from "lucide-react";
import Footer from "../components/Footer";

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
    "to auth, APIs and data handling. 240+ DSA problems solved across five platforms.",
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
  { name: "Museum Chatbot Ticketing System", stack: "AI/NLP · Full Stack", desc: "Automated museum ticket booking with query handling and payment integration." },
  { name: "JobSt@ck — Job Portal", stack: "React · Django · SQL", url: "https://github.com/manish780386/JobStack", desc: "Search, apply, track applications with JWT-secured backend." },
  { name: "SVVV Notes Portal", stack: "React · Django · SQL", url: "https://svvv-notes-website-poij.vercel.app", desc: "Notes & PYQ platform serving 100+ active students." },
  { name: "KisanMitra — AgriTech", stack: "React · TypeScript", url: "https://kisanmitra-six.vercel.app", desc: "Farmer assistant for market prices and buyer connections." },
];

const CERTS = [
  "Internet of Things (IoT) — NPTEL", "Soft Skills for Professionals — NPTEL", "Artificial Intelligence — Physics Wallah",
  "GIAC Cyber Defense Certified — SVVV", "Python Programming Training — Infosys", "Introduction to Cybersecurity — Cisco",
  "Cybersecurity Virtual Experience — Deloitte", "Master Git & GitHub — Physics Wallah",
  "CSICI Certified Instructor — TheTechUnique Academy", "Cybersecurity Virtual Experience — Tata",
];

function SecHead({ icon, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-white/[0.07]">
      <div className="p-1.5 rounded-lg bg-[#34d399]/10 text-[#34d399] shrink-0">{icon}</div>
      <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#34d399] font-mono-label">{title}</h2>
    </div>
  );
}

export default function ResumePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="pt-8 max-w-5xl mx-auto px-4 md:px-6 relative z-10 pb-16">
        <div className="flex items-center justify-between mb-8">
          <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ x: -4 }}
            onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-[#7c8aa0] hover:text-white transition">
            <ArrowLeft size={16} /> Back
          </motion.button>
          <motion.a href={`mailto:${ME.email}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#34d399] text-[#060a11] text-sm font-bold">
            <Mail size={15} /> Hire Me
          </motion.a>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="bg-[#0b0f1a] border border-white/[0.08] rounded-2xl overflow-hidden">

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
                <span key={i} className="flex items-center gap-1.5 text-[#7c8aa0] text-xs"><span className="text-[#34d399]">{c.icon}</span>{c.text}</span>
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
                      <div><h3 className="text-sm font-bold text-white">{e.title}</h3><p className="text-[#34d399] text-xs font-semibold">{e.company}</p></div>
                      <span className="text-[10px] text-[#4b5768]">{e.period}</span>
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {e.points.map((pt, pi) => <li key={pi} className="text-[#7c8aa0] text-xs leading-relaxed flex gap-2"><span className="text-[#34d399] shrink-0">▸</span>{pt}</li>)}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {e.tags.map((t, ti) => <span key={ti} className="px-2 py-0.5 rounded-md text-[10px] border bg-white/[0.04] border-white/[0.07] text-[#7c8aa0]">{t}</span>)}
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
                        {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-[#4b5768] hover:text-[#34d399] transition shrink-0"><ExternalLink size={12} /></a>}
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
                  <p className="text-[10px] text-[#7c8aa0] mt-1">CGPA: 8.48 / 10</p>
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

          <div className="px-8 py-4 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-[#4b5768]">{ME.name} · Full Stack Developer · 2026</p>
            <div className="flex items-center gap-4">
              {[{ label: "GitHub", url: `https://${ME.github}` }, { label: "LinkedIn", url: `https://${ME.linkedin}` }, { label: "LeetCode", url: `https://${ME.leetcode}` }].map((l, i) => (
                <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#4b5768] hover:text-[#34d399] transition flex items-center gap-1">{l.label} <ExternalLink size={9} /></a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}