import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { SectionWrapper } from "../components/SectionWrapper";

const STATS = [
  { num: 20, suffix: "+", label: "Projects Built", icon: "🚀", color: "from-cyan-500 to-blue-500" },
  { num: 10, suffix: "+", label: "Certifications", icon: "🏆", color: "from-indigo-500 to-purple-500" },
  { num: 3, suffix: "+", label: "Years Learning", icon: "📚", color: "from-green-500 to-teal-500" },
  { num: 200, suffix: "+", label: "GitHub Commits", icon: "💻", color: "from-pink-500 to-rose-500" },
  { num: 50, suffix: "+", label: "DSA Solved", icon: "🧩", color: "from-yellow-500 to-orange-500" },
  { num: 2, suffix: "", label: "Internships", icon: "💼", color: "from-blue-500 to-cyan-500" },
];

function StatCard({ stat, i }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      whileHover={{ scale: 1.06, y: -4 }}
      className="relative group text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] cursor-pointer overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 rounded-2xl`} />
      <div className="text-2xl mb-3">{stat.icon}</div>
      <div className={`text-3xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
        {inView ? <CountUp end={stat.num} duration={2} suffix={stat.suffix} /> : `0${stat.suffix}`}
      </div>
      <p className="text-gray-500 text-xs font-medium">{stat.label}</p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <SectionWrapper className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {STATS.map((s, i) => <StatCard key={i} stat={s} i={i} />)}
        </div>
      </div>
    </SectionWrapper>
  );
}