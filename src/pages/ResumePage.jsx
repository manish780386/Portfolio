import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Mail, MapPin, Github,
  Linkedin, Globe, Briefcase, Book, Code2, Award,
  ExternalLink, Phone
} from "lucide-react";
import Footer from "../components/Footer";

const ME = {
  name:     "Manish Dange",
  title:    "Full Stack Developer & Cyber Security Enthusiast",
  email:    "dangemanish35@gmail.com",
  phone:    "+91 7803861195",
  city:     "Indore, Madhya Pradesh, India",
  github:   "github.com/manish780386",
  linkedin: "linkedin.com/in/manish-dange-2a03b6312",
  leetcode: "leetcode.com/u/dangemanish",
  summary:
    "Passionate Full Stack Developer and Cyber Security enthusiast pursuing B.Tech CSE at SVVV Indore. " +
    "Specialized in building scalable web applications with React, Django, and Python. " +
    "Experienced in AI/ML integration, REST APIs, and real-time features. " +
    "Actively solving DSA problems on LeetCode (1000+ solved) and contributing to open-source.",
};

const EDUCATION = [
  {
    degree: "B.Tech CSE — Cyber Security",
    school: "Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV), Indore",
    period: "2023 – 2027",
    detail: "Specialization in Information & Cyber Security | CGPA: 8.X / 10",
  },
  {
    degree: "Higher Secondary — PCM + CS",
    school: "Govt. Excellence Higher Secondary School",
    period: "2020 – 2023",
    detail: "Mathematics · Physics · Chemistry · Computer Science | 80%+",
  },
];

const EXPERIENCE = [
  {
    title:   "Full Stack Developer Intern",
    company: "The Prime Step",
    period:  "2023 – Present",
    type:    "Internship",
    points: [
      "Built and maintained full-stack features using React, Django REST Framework, and PostgreSQL.",
      "Developed admin dashboards, real-time notification systems, and optimized DB queries by 30%.",
      "Collaborated in agile sprints, code reviews, and CI/CD pipeline management.",
    ],
    tags: ["React", "Django", "PostgreSQL", "REST API", "Python"],
  },
  
];

const PROJECTS = [
  { name: "JobSt@ck — Job Portal",          stack: "React · Django · SQL",            url: "https://github.com/manish780386/JobStack",                      desc: "Full-featured job portal with search, apply, track applications, resume builder, premium services, and admin posting panel." },
  { name: "SVVV Notes Website",             stack: "React · Django · SQL",            url: "https://svvv-notes-website-poij.vercel.app",                    desc: "Student notes platform with auth, file management, and admin controls. Serving 100+ active students." },
  { name: "KisanMitra — AgriTech",          stack: "React · TypeScript · Tailwind",   url: "https://github.com/manish780386/-KisanMitra",                  desc: "Smart farmer assistant for real-time market prices, produce selling, and buyer-farmer connections." },
  { name: "LIC Agent Management System",    stack: "React · Django · Tailwind",       url: "https://santosh-gayakwad-lic.vercel.app",                      desc: "Enterprise CRM for LIC agents — client management, policy tracking, and sales analytics. 6+ months in production." },
  { name: "E-Commerce Platform",            stack: "React · Django · SQL",            url: "https://simple-e-commerce-website-beta.vercel.app",             desc: "Full-stack shopping platform with product catalog, cart, payment integration, and real-time inventory." },
];

const SKILLS = [
  { category: "Frontend",       items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "React Native", "HTML5/CSS3"] },
  { category: "Backend",        items: ["Python", "Django", "REST APIs", "Django REST Framework"] },
  { category: "Database",       items: ["MySQL", "PostgreSQL", "Firebase", "SQLite"] },
  { category: "Tools & DevOps", items: ["Git", "Docker", "Linux", "VS Code", "Postman", "GitHub"] },
  { category: "Cyber Security", items: ["Network Security", "OWASP Top 10", "Pen Testing basics", "Cisco NetAcad"] },
  { category: "Learning",       items: ["AI / ML", "System Design", "Data Analytics", "AWS Basics"] },
];

const CERTS = [
  { name: "Internet of Things (IoT)",       org: "NPTEL"               },
  { name: "Python Essentials",              org: "Cisco"               },
  { name: "Introduction to Cybersecurity",  org: "Cisco"               },
  { name: "Artificial Intelligence",        org: "Physics Wallah (PW)" },
  { name: "Python Programming Training",    org: "Infosys"             },
  { name: "React Bootcamp",                 org: "LetsUpgrade"         },
  { name: "CSICI Certified Instructor",     org: "TheTechUnique Academy"},
  { name: "Soft Skills for Professionals",  org: "NPTEL"               },
];

function SecHead({ icon, title, color }) {
  return (
    <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-white/[0.07]">
      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${color} text-white shrink-0`}>{icon}</div>
      <h2 className={`text-xs font-black uppercase tracking-[0.15em] bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {title}
      </h2>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="px-2 py-0.5 rounded-md text-[10px] border bg-white/[0.04] border-white/[0.07] text-gray-400">
      {children}
    </span>
  );
}

export default function ResumePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="pt-8 max-w-5xl mx-auto px-4 md:px-6 relative z-10 pb-16">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition"
          >
            <ArrowLeft size={16} /> Back
          </motion.button>

          <motion.a
            href={`mailto:${ME.email}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(6,182,212,0.25)" }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-bold shadow-lg shadow-cyan-500/20"
          >
            <Mail size={15} /> Hire Me
          </motion.a>
        </div>

        {/* ══════ RESUME CARD ══════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0b0f1e] border border-white/[0.07] rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/5"
        >

          {/* HEADER */}
          <div className="relative bg-gradient-to-br from-[#060d1a] to-[#0a0e1a] px-8 py-8 border-b border-white/[0.06] overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-indigo-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.09),transparent_60%)]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />

            <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <motion.h1
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-black text-white tracking-tight mb-1"
                >{ME.name}</motion.h1>
                <p className="text-cyan-400 font-semibold text-sm mb-4">{ME.title}</p>

                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {[
                    { icon: <Mail size={12} />,     text: ME.email                       },
                    { icon: <Phone size={12} />,    text: ME.phone                       },
                    { icon: <MapPin size={12} />,   text: ME.city                        },
                    { icon: <Github size={12} />,   text: ME.github,   url: `https://${ME.github}`   },
                    { icon: <Linkedin size={12} />, text: "LinkedIn",  url: `https://${ME.linkedin}` },
                    { icon: <Globe size={12} />,    text: "LeetCode",  url: `https://${ME.leetcode}` },
                  ].map((c, i) =>
                    c.url ? (
                      <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-400 transition text-xs">
                        <span className="text-cyan-500">{c.icon}</span>{c.text}
                      </a>
                    ) : (
                      <span key={i} className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <span className="text-cyan-500">{c.icon}</span>{c.text}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* STAT BADGES */}
              <div className="flex gap-2 flex-wrap shrink-0">
                {[
                  { label: "Projects",    val: "20+", col: "text-cyan-400   bg-cyan-500/15   border-cyan-500/25"   },
                  { label: "DSA Solved",  val: "100+", col: "text-yellow-400 bg-yellow-500/15 border-yellow-500/25" },
                  { label: "Certs",       val: "8+",  col: "text-indigo-400 bg-indigo-500/15 border-indigo-500/25" },
                  { label: "Internships", val: "1",   col: "text-green-400  bg-green-500/15  border-green-500/25"  },
                ].map((b, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    className={`px-3.5 py-2 rounded-xl border text-center ${b.col}`}>
                    <div className="text-xl font-extrabold leading-none">{b.val}</div>
                    <div className="text-[10px] mt-0.5 opacity-80">{b.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <p className="relative text-gray-400 text-sm leading-relaxed mt-5 max-w-3xl">{ME.summary}</p>
          </div>

          {/* BODY */}
          <div className="p-8 grid md:grid-cols-3 gap-8">

            {/* LEFT (2/3) */}
            <div className="md:col-span-2 space-y-8">

              {/* EXPERIENCE */}
              <div>
                <SecHead icon={<Briefcase size={13} />} title="Work Experience" color="from-cyan-500 to-indigo-500" />
                <div className="space-y-6">
                  {EXPERIENCE.map((e, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative pl-4 border-l border-cyan-500/20">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 border-2 border-[#0b0f1e]" />
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h3 className="text-sm font-bold text-white">{e.title}</h3>
                          <p className="text-cyan-400 text-xs font-semibold">{e.company}</p>
                        </div>
                        <div className="flex gap-2 shrink-0 items-center">
                          <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full">{e.type}</span>
                          <span className="text-[10px] text-gray-500">{e.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-1.5 mb-3">
                        {e.points.map((pt, pi) => (
                          <li key={pi} className="text-gray-400 text-xs leading-relaxed flex gap-2">
                            <span className="text-cyan-400 shrink-0 mt-0.5">▸</span>{pt}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {e.tags.map((t, ti) => <Tag key={ti}>{t}</Tag>)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* PROJECTS */}
              <div>
                <SecHead icon={<Code2 size={13} />} title="Key Projects" color="from-purple-500 to-pink-500" />
                <div className="space-y-3">
                  {PROJECTS.map((p, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <h3 className="text-sm font-bold text-white">{p.name}</h3>
                        <a href={p.url} target="_blank" rel="noopener noreferrer"
                          className="text-gray-600 hover:text-cyan-400 transition shrink-0">
                          <ExternalLink size={12} />
                        </a>
                      </div>
                      <p className="text-[11px] text-cyan-400/70 font-semibold mb-1">{p.stack}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT (1/3) */}
            <div className="space-y-7">

              {/* EDUCATION */}
              <div>
                <SecHead icon={<Book size={13} />} title="Education" color="from-green-500 to-teal-500" />
                <div className="space-y-5">
                  {EDUCATION.map((e, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative pl-4 border-l border-green-500/25">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#0b0f1e]" />
                      <h3 className="text-xs font-bold text-white leading-snug">{e.degree}</h3>
                      <p className="text-green-400 text-[11px] font-semibold mt-0.5">{e.school}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{e.period}</p>
                      <p className="text-[10px] text-gray-600 mt-1 leading-relaxed">{e.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SKILLS */}
              <div>
                <SecHead icon={<Code2 size={13} />} title="Skills" color="from-yellow-500 to-orange-500" />
                <div className="space-y-3.5">
                  {SKILLS.map((s, i) => (
                    <div key={i}>
                      <p className="text-[10px] text-yellow-500/70 uppercase tracking-wider font-bold mb-1.5">{s.category}</p>
                      <div className="flex flex-wrap gap-1">
                        {s.items.map((item, ii) => <Tag key={ii}>{item}</Tag>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CERTIFICATIONS */}
              <div>
                <SecHead icon={<Award size={13} />} title="Certifications" color="from-pink-500 to-rose-500" />
                <ul className="space-y-2.5">
                  {CERTS.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-pink-400 shrink-0 text-xs mt-0.5">▸</span>
                      <div>
                        <p className="text-xs text-white font-medium leading-snug">{c.name}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{c.org}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-8 py-4 border-t border-white/[0.05] bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-gray-600">{ME.name} · Full Stack Developer · 2026</p>
            <div className="flex items-center gap-4">
              {[
                { label: "GitHub",   url: `https://${ME.github}`   },
                { label: "LinkedIn", url: `https://${ME.linkedin}`  },
                { label: "LeetCode", url: `https://${ME.leetcode}`  },
              ].map((l, i) => (
                <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-gray-600 hover:text-cyan-400 transition flex items-center gap-1">
                  {l.label} <ExternalLink size={9} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}