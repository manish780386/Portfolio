import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Radio } from "lucide-react";

/*
  Every stat here is sourced, not invented:
  - 240+ DSA -> sum of LeetCode(106) + HackerRank(70) + CodeChef(37) + GFG(30) + Codeforces(1)
  - 8.48 CGPA -> resume, SVVV B.Tech CSE
  - 100+ Installs -> VS Code Marketplace, "JSON Tree Visualizer Pro"
  - 400+ Commits -> GitHub profile stat
*/
const METRICS = [
  {
    value: 500, suffix: "+", label: "DSA Problems Solved",
    detail: "Across LeetCode, HackerRank, CodeChef, GeeksforGeeks & Codeforces.",
  },
  {
    value: 10, suffix: "+", label: "Certifications Earned",
    detail: "Cyber security, AI and dev-tooling credentials.",
  },
  {
    value: 100, suffix: "+", label: "VS Code Installs",
    detail: "\"JSON Tree Visualizer Pro\" — live on the Marketplace.",
  },
  {
    value: 450, suffix: "+", label: "GitHub Commits",
    detail: "Shipped across 40 public repositories.",
  },
];

function MetricCard({ m, i }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      className="relative p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#34d399]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
      <div className="text-3xl md:text-4xl font-bold text-white font-mono-label mb-2">
        {inView ? (
          <CountUp end={m.value} decimals={m.decimals || 0} duration={2} suffix={m.suffix} />
        ) : (
          `0${m.suffix || ""}`
        )}
      </div>
      <p className="text-sm text-[#c7d0dc] font-medium mb-1.5">{m.label}</p>
      <p className="text-[11px] text-[#7c8aa0] leading-relaxed">{m.detail}</p>
    </motion.div>
  );
}

export default function SystemMetrics() {
  return (
    <section className="relative z-10 py-20 border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-center gap-2 mb-3"
        >
          <Radio size={13} className="text-[#34d399]" />
          <span className="font-mono-label text-[11px] uppercase tracking-[0.2em] text-[#34d399]">Live Data</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
          className="text-2xl md:text-3xl font-bold text-white mb-1"
        >
          System Metrics
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="font-mono-label text-[11px] tracking-[0.25em] text-[#4b5768] mb-10"
        >
          MEASURED. REAL. VERIFIABLE.
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m, i) => <MetricCard key={m.label} m={m} i={i} />)}
        </div>
      </div>
    </section>
  );
}