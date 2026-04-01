import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Server, Database, Terminal, Zap, Users } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import { useInView } from "react-intersection-observer";

const CATEGORIES = [
  {
    title: "Frontend",
    icon: <Code size={16} />,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "React / React Native", level: 90 },
      { name: "TypeScript", level: 78 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Next.js", level: 65 },
      { name: "Framer Motion", level: 80 },
      { name: "HTML & CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    icon: <Server size={16} />,
    color: "from-green-500 to-teal-500",
    skills: [
      { name: "Django", level: 82 },
      { name: "Python", level: 85 },
      { name: "REST APIs", level: 88 },
      { name: "Node.js", level: 55 },
    ],
  },
  {
    title: "Database",
    icon: <Database size={16} />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "MySQL / PostgreSQL", level: 80 },
      { name: "Firebase", level: 70 },
      { name: "SQLite", level: 85 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: <Terminal size={16} />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "Docker", level: 55 },
      { name: "Linux", level: 72 },
      { name: "Postman", level: 85 },
    ],
  },
  {
    title: "Learning",
    icon: <Zap size={16} />,
    color: "from-yellow-500 to-orange-400",
    skills: [
      { name: "AI / ML", level: 45 },
      { name: "Cyber Security", level: 70 },
      { name: "System Design", level: 40 },
      { name: "Data Analytics", level: 50 },
    ],
  },
  {
    title: "Soft Skills",
    icon: <Users size={16} />,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "Problem Solving", level: 90 },
      { name: "Teamwork", level: 88 },
      { name: "Communication", level: 82 },
      { name: "Adaptability", level: 92 },
    ],
  },
];

function SkillBar({ name, level, i, color }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-400">{name}</span>
        <span className="font-semibold text-gray-300">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: i * 0.08, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [selected, setSelected] = useState(null);

  return (
    <SectionWrapper id="skills" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle pre="What I Know" main="Technical" accent="Skills" />
        <SectionSubtitle>Technologies and tools I work with daily</SectionSubtitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07] cursor-default"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${cat.color} text-white text-xs font-bold mb-5`}>
                {cat.icon} {cat.title}
              </div>
              <div>
                {cat.skills.map((s, idx) => (
                  <SkillBar key={idx} name={s.name} level={s.level} i={idx} color={cat.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* TECH ICONS ROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden"
        >
          <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-6">Technologies</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React", "Next.js", "TypeScript", "Python", "Django", "Tailwind",
              "PostgreSQL", "Docker", "Git", "Linux", "Firebase", "REST API",
              "Framer Motion", "Three.js", "Node.js"
            ].map((t, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.12, y: -3 }}
                className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 text-xs font-medium hover:text-white hover:border-white/[0.12] transition cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}