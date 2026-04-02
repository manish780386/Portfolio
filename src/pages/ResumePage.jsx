import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Download, Printer, Mail, MapPin, Github,
  Linkedin, Globe, Briefcase, Book, Code2, Award,
  ExternalLink, Phone
} from "lucide-react";
import Footer from "../components/Footer";

/* ────────────────────────────────────
   ALL YOUR REAL DATA HERE — edit freely
──────────────────────────────────── */
const ME = {
  name:    "Manish Dange",
  title:   "Full Stack Developer & Cyber Security Enthusiast",
  email:   "dangemanish35@gmail.com",
  phone:   "+91 7903861195",   // ← add your number
  city:    "Indore, MP, India",
  github:  "github.com/manish780386",
  linkedin:"linkedin.com/in/manish-dange-2a03b6312",
  leetcode:"leetcode.com/u/dangemanish",
  website: "manish-portfolio.vercel.app",
  summary: "Passionate Full Stack Developer and Cyber Security enthusiast pursuing B.Tech CSE at SVVV Indore. Specialized in building scalable web applications with React, Django, and Python. Experienced in AI/ML integration, REST APIs, and real-time features. Actively solving DSA problems on LeetCode (50+ solved) and contributing to open-source.",
};

const EDUCATION = [
  {
    degree:  "B.Tech CSE — Cyber Security",
    school:  "Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV), Indore",
    period:  "2023 – 2027",
    detail:  "Specialization in Information & Cyber Security | CGPA: 8.X/10",
    tags:    ["Cyber Security", "AI/ML", "Full Stack", "Data Analytics"],
  },
  {
    degree:  "Higher Secondary (PCM + CS)",
    school:  "Govt. Excellence Higher Secondary School",
    period:  "2020 – 2023",
    detail:  "Mathematics, Physics, Chemistry, Computer Science | 80%+",
    tags:    ["Mathematics", "Physics", "Computer Science"],
  },
];

const EXPERIENCE = [
  {
    title:   "Full Stack Developer Intern",
    company: "The Prime Step",
    period:  "2023 – Present",
    type:    "Internship",
    points:  [
      "Built and maintained full-stack features using React, Django REST Framework, and PostgreSQL",
      "Developed admin dashboards, real-time notification systems, and optimized DB queries by 30%",
      "Collaborated in agile sprints, code reviews, and CI/CD pipeline management",
    ],
    tags: ["React", "Django", "PostgreSQL", "REST API", "Python"],
  },
  {
    title:   "Web Development Intern",
    company: "Cod Soft",
    period:  "2023 – 2024",
    type:    "Internship",
    points:  [
      "Frontend development using React and JavaScript with responsive Tailwind CSS layouts",
      "Built reusable component library reducing development time by 25%",
      "Improved Core Web Vitals and page load performance across multiple projects",
    ],
    tags: ["React", "JavaScript", "Tailwind CSS", "HTML/CSS"],
  },
];

const PROJECTS = [
  {
    name:  "JobSt@ck — Job Portal",
    stack: "React + Django + SQL",
    url:   "github.com/manish780386/JobStack",
    desc:  "Full-featured job portal with search, apply, track applications, resume builder, premium services, and admin job posting panel.",
  },
  {
    name:  "SVVV Notes Website",
    stack: "React + Django + SQL",
    url:   "svvv-notes-website-poij.vercel.app",
    desc:  "Student notes platform with auth, file management, admin controls. Serving 100+ active students.",
  },
  {
    name:  "KisanMitra — AgriTech Platform",
    stack: "React + TypeScript + Tailwind",
    url:   "github.com/manish780386/-KisanMitra",
    desc:  "Smart farmer assistant for real-time market prices, produce selling, and buyer-farmer connections.",
  },
  {
    name:  "LIC Agent Management System",
    stack: "React + Django + Tailwind",
    url:   "santosh-gayakwad-lic.vercel.app",
    desc:  "Enterprise CRM for LIC agents — client management, policy tracking, and sales analytics. 6+ months in production.",
  },
  {
    name:  "E-Commerce Platform",
    stack: "React + Django + SQL",
    url:   "simple-e-commerce-website-beta.vercel.app",
    desc:  "Full-stack shopping platform with product catalog, cart, payment integration, and real-time inventory.",
  },
];

const SKILLS = [
  { category: "Frontend",        items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "React Native", "HTML5/CSS3"] },
  { category: "Backend",         items: ["Python", "Django", "REST APIs", "Django REST Framework"] },
  { category: "Database",        items: ["MySQL", "PostgreSQL", "Firebase", "SQLite"] },
  { category: "Tools & DevOps",  items: ["Git", "Docker", "Linux", "VS Code", "Postman", "GitHub"] },
  { category: "Cyber Security",  items: ["Network Security", "OWASP", "Penetration Testing basics", "Cisco NetAcad"] },
  { category: "Learning",        items: ["AI/ML", "System Design", "Data Analytics", "Cloud (AWS basics)"] },
];

const CERTS = [
  { name: "Internet of Things (IoT)",            org: "NPTEL" },
  { name: "Python Essentials",                   org: "Cisco" },
  { name: "Introduction to Cybersecurity",       org: "Cisco" },
  { name: "Artificial Intelligence",             org: "Physics Wallah" },
  { name: "Python Programming Training",         org: "Infosys" },
  { name: "React Bootcamp",                      org: "LetsUpgrade" },
  { name: "CSICI Certified Instructor",          org: "TheTechUnique Academy" },
  { name: "Soft Skills for Professionals",       org: "NPTEL" },
];

/* ─── SECTION HEADER ─── */
function SecHead({ icon, title, color }) {
  return (
    <div className={`flex items-center gap-3 mb-5 pb-2 border-b border-white/[0.06]`}>
      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${color} text-white`}>{icon}</div>
      <h2 className={`text-sm font-black uppercase tracking-widest bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {title}
      </h2>
    </div>
  );
}

/* ─── RESUME PAGE ─── */
export default function ResumePage() {
  const navigate  = useNavigate();
  const printRef  = useRef(null);

  /* Print → "Save as PDF" in browser */
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-bg  { background: white !important; }
          .print-text { color: #111 !important; }
        }
      `}</style>

      <div className="pt-8 max-w-5xl mx-auto px-4 md:px-6 relative z-10 pb-16">

        {/* TOP BAR */}
        <div className="no-print flex items-center justify-between mb-8">
          <motion.button initial={{ opacity:0,x:-20 }} animate={{ opacity:1,x:0 }}
            whileHover={{ x:-4 }} onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition">
            <ArrowLeft size={16} /> Back
          </motion.button>

          <div className="flex gap-2">
            <motion.button whileHover={{ scale:1.05 }} onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-gray-300 text-sm font-semibold hover:bg-white/5 transition">
              <Printer size={15} /> Print / Save PDF
            </motion.button>
            <motion.a href="mailto:dangemanish780386@gmail.com" whileHover={{ scale:1.05 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-bold shadow-lg shadow-cyan-500/20">
              <Mail size={15} /> Hire Me
            </motion.a>
          </div>
        </div>

        {/* ── RESUME PAPER ── */}
        <div ref={printRef} className="bg-white/[0.02] border border-white/[0.07] rounded-3xl overflow-hidden shadow-2xl">

          {/* HEADER */}
          <div className="relative bg-gradient-to-br from-[#060d1a] to-[#0a0e1a] p-8 border-b border-white/[0.06] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.1),transparent_60%)]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
            <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <motion.h1 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
                  className="text-4xl font-black text-white tracking-tight mb-1">{ME.name}</motion.h1>
                <p className="text-cyan-400 font-semibold text-base mb-4">{ME.title}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {[
                    { icon:<Mail size={13}/>,  text: ME.email },
                    { icon:<MapPin size={13}/>, text: ME.city },
                    { icon:<Github size={13}/>, text: ME.github, url:`https://${ME.github}` },
                    { icon:<Linkedin size={13}/>,text:ME.linkedin,url:`https://${ME.linkedin}` },
                    { icon:<Globe size={13}/>,  text:"leetcode · 51 solved", url:`https://${ME.leetcode}` },
                  ].map((c,i)=>(
                    c.url
                      ? <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-400 transition text-xs">
                          {c.icon}{c.text}
                        </a>
                      : <span key={i} className="flex items-center gap-1.5 text-gray-400 text-xs">
                          {c.icon}{c.text}
                        </span>
                  ))}
                </div>
              </div>

              {/* STATS BADGES */}
              <div className="flex flex-wrap gap-2 shrink-0">
                {[
                  { label:"Projects",   val:"20+", color:"bg-cyan-500/15 border-cyan-500/25 text-cyan-400"   },
                  { label:"DSA Solved", val:"50+", color:"bg-yellow-500/15 border-yellow-500/25 text-yellow-400"},
                  { label:"Certs",      val:"8+",  color:"bg-indigo-500/15 border-indigo-500/25 text-indigo-400"},
                  { label:"Internships",val:"2",   color:"bg-green-500/15 border-green-500/25 text-green-400"  },
                ].map((b,i)=>(
                  <div key={i} className={`px-3 py-2 rounded-xl border text-center ${b.color}`}>
                    <div className="text-xl font-extrabold leading-none">{b.val}</div>
                    <div className="text-[10px] mt-0.5 opacity-75">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <p className="relative text-gray-400 text-sm leading-relaxed mt-5 max-w-3xl">{ME.summary}</p>
          </div>

          {/* BODY */}
          <div className="p-8 grid md:grid-cols-3 gap-8">

            {/* LEFT COL (2/3) */}
            <div className="md:col-span-2 space-y-8">

              {/* EXPERIENCE */}
              <div>
                <SecHead icon={<Briefcase size={14}/>} title="Work Experience" color="from-cyan-500 to-indigo-500" />
                <div className="space-y-5">
                  {EXPERIENCE.map((e,i)=>(
                    <motion.div key={i} initial={{ opacity:0,x:-20 }} whileInView={{ opacity:1,x:0 }}
                      transition={{ delay:i*0.08 }}
                      className="relative pl-4 border-l border-cyan-500/20">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500/60 border-2 border-[#04050e]" />
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="text-sm font-bold text-white">{e.title}</h3>
                          <p className="text-cyan-400 text-xs font-medium">{e.company}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full">{e.type}</span>
                          <span className="text-[10px] text-gray-500">{e.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-1 mb-3">
                        {e.points.map((pt,pi)=>(
                          <li key={pi} className="text-gray-400 text-xs leading-relaxed flex gap-2">
                            <span className="text-cyan-400 mt-0.5 shrink-0">▸</span>{pt}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {e.tags.map((t,ti)=>(
                          <span key={ti} className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] text-gray-500 text-[10px] rounded-md">{t}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* PROJECTS */}
              <div>
                <SecHead icon={<Code2 size={14}/>} title="Key Projects" color="from-purple-500 to-pink-500" />
                <div className="space-y-4">
                  {PROJECTS.map((p,i)=>(
                    <motion.div key={i} initial={{ opacity:0,x:-20 }} whileInView={{ opacity:1,x:0 }}
                      transition={{ delay:i*0.06 }}
                      className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.06] group hover:border-white/[0.12] transition">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm font-bold text-white">{p.name}</h3>
                        <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer"
                          className="text-gray-600 hover:text-cyan-400 transition shrink-0">
                          <ExternalLink size={12} />
                        </a>
                      </div>
                      <p className="text-[11px] text-cyan-400/70 font-medium mb-1">{p.stack}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COL (1/3) */}
            <div className="space-y-8">

              {/* EDUCATION */}
              <div>
                <SecHead icon={<Book size={14}/>} title="Education" color="from-green-500 to-teal-500" />
                <div className="space-y-4">
                  {EDUCATION.map((e,i)=>(
                    <motion.div key={i} initial={{ opacity:0,y:15 }} whileInView={{ opacity:1,y:0 }}
                      transition={{ delay:i*0.08 }}
                      className="relative pl-4 border-l border-green-500/20">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-green-500/60 border-2 border-[#04050e]" />
                      <h3 className="text-xs font-bold text-white leading-tight">{e.degree}</h3>
                      <p className="text-green-400 text-[11px] font-medium mt-0.5">{e.school}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{e.period}</p>
                      <p className="text-[10px] text-gray-600 mt-1">{e.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SKILLS */}
              <div>
                <SecHead icon={<Code2 size={14}/>} title="Skills" color="from-yellow-500 to-orange-500" />
                <div className="space-y-3">
                  {SKILLS.map((s,i)=>(
                    <div key={i}>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">{s.category}</p>
                      <div className="flex flex-wrap gap-1">
                        {s.items.map((item,ii)=>(
                          <span key={ii} className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] text-gray-400 text-[10px] rounded-md">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CERTIFICATIONS */}
              <div>
                <SecHead icon={<Award size={14}/>} title="Certifications" color="from-pink-500 to-rose-500" />
                <ul className="space-y-2">
                  {CERTS.map((c,i)=>(
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-pink-400 mt-0.5 shrink-0 text-xs">▸</span>
                      <div>
                        <p className="text-xs text-white font-medium leading-tight">{c.name}</p>
                        <p className="text-[10px] text-gray-600">{c.org}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-8 py-4 border-t border-white/[0.05] flex items-center justify-between">
            <p className="text-[11px] text-gray-600">Last updated: 2026 · Built with React & Tailwind</p>
            <div className="flex items-center gap-3">
              {[
                { label:"GitHub",   url:`https://${ME.github}`   },
                { label:"LinkedIn", url:`https://${ME.linkedin}`  },
                { label:"LeetCode", url:`https://${ME.leetcode}`  },
              ].map((l,i)=>(
                <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-gray-600 hover:text-cyan-400 transition flex items-center gap-1">
                  {l.label} <ExternalLink size={9}/>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* PRINT NOTE */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          className="no-print mt-6 p-4 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/20 text-center">
          <p className="text-cyan-400 text-sm font-semibold mb-1">💡 How to Download as PDF</p>
          <p className="text-gray-500 text-xs">Click <strong className="text-white">Print / Save PDF</strong> → Choose "Save as PDF" in your browser's print dialog → Save!</p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}