import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

const CATEGORIES = [
  {
    title: "Frontend", color: "#34d399",
    skills: [["React", 90], ["JavaScript", 88], ["Tailwind CSS", 92], ["TypeScript", 70], ["React Native", 60]],
  },
  {
    title: "Backend", color: "#60a5fa",
    skills: [["Django / DRF", 85], ["Python", 85], ["REST APIs", 88], ["Node.js", 50]],
  },
  {
    title: "Database", color: "#a78bfa",
    skills: [["MySQL", 80], ["PostgreSQL", 75], ["Firebase", 68]],
  },
  {
    title: "Security & Tools", color: "#f5b942",
    skills: [["Network Security", 65], ["OWASP Top 10", 60], ["Git / GitHub", 88], ["Docker", 55], ["Linux", 70]],
  },
];

function Bar({ name, pct, color, i }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-[#c7d0dc]">{name}</span>
        <span className="font-mono-label" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1, delay: i * 0.07, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle index="05" label="What I know" main="Technical" accent="skills" />
        <SectionSubtitle>Grouped by where I use them day to day — numbers are self-rated proficiency, not vanity metrics.</SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-5">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: ci * 0.08 }}
              className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <h3 className="text-sm font-bold text-white">{cat.title}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map(([name, pct], i) => (
                  <Bar key={name} name={name} pct={pct} color={cat.color} i={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}