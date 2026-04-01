import React from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Flame, Zap, ExternalLink, CheckCircle2 } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const DIFFICULTY = [
  { label: "Easy", solved: 11, total: 935, color: "#22c55e", bg: "from-green-500 to-green-600", textColor: "text-green-400" },
  { label: "Medium", solved: 6, total: 2033, color: "#eab308", bg: "from-yellow-500 to-orange-500", textColor: "text-yellow-400" },
  { label: "Hard", solved: 1, total: 920, color: "#ef4444", bg: "from-red-500 to-red-600", textColor: "text-red-400" },
];

const TOPICS = [
  { name: "Arrays & Hashing", pct: 10 },
  { name: "Two Pointers", pct: 75 },
  { name: "Sliding Window", pct: 68 },
  { name: "Stack & Queue", pct: 72 },
  { name: "Binary Search", pct: 62 },
  { name: "Linked Lists", pct: 55 },
  { name: "Trees & Graphs", pct: 45 },
  { name: "Dynamic Programming", pct: 38 },
];

const PLATFORMS = [
  { name: "LeetCode", handle: "@dangemanish", solved: 51, rating: "—", url: "https://leetcode.com/u/dangemanish/", color: "from-yellow-500 to-orange-500", icon: "⚡" },
  { name: "GeeksForGeeks", handle: "@manishdange", solved: 30, rating: "—", url: "#", color: "from-green-500 to-teal-500", icon: "🟢" },
  { name: "HackerRank", handle: "@manish780386", solved: 70, rating: "⭐⭐⭐", url: "#", color: "from-emerald-500 to-green-500", icon: "🏅" },
];

function DonutChart({ solved, total, color, size = 120 }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const radius = 46;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(solved / total, 1);
  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ * (1 - pct) } : { strokeDashoffset: circ }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-extrabold text-white">{inView ? <CountUp end={solved} duration={1.5} /> : 0}</span>
        <span className="text-[9px] text-gray-500">/ {total}</span>
      </div>
    </div>
  );
}

function ProgressBar({ name, pct, i }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.07 }}
    >
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-400">{name}</span>
        <span className="text-cyan-400 font-semibold">{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: i * 0.07, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
        />
      </div>
    </motion.div>
  );
}

export default function LeetCodeStats() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <SectionWrapper id="leetcode" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle pre="Problem Solving" main="Coding" accent="Stats" />
        <SectionSubtitle>Sharpening DSA skills daily across platforms</SectionSubtitle>

        {/* TOP: PLATFORMS */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {PLATFORMS.map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] group cursor-pointer relative overflow-hidden block"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 rounded-2xl`} />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.icon}</span>
                  <div>
                    <div className="font-bold text-white text-sm">{p.name}</div>
                    <div className="text-gray-600 text-[11px]">{p.handle}</div>
                  </div>
                </div>
                <ExternalLink size={13} className="text-gray-700 group-hover:text-gray-400 transition" />
              </div>
              <div className="flex items-end gap-4">
                <div>
                  <div className="text-3xl font-extrabold text-white">{p.solved}<span className="text-base text-gray-500">+</span></div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Problems Solved</div>
                </div>
                {p.rating !== "—" && (
                  <div className="ml-auto">
                    <div className="text-lg">{p.rating}</div>
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT: DONUT CHARTS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <Trophy size={16} className="text-yellow-400" /> LeetCode Breakdown
            </h3>

            {/* TOTAL */}
            <div ref={ref} className="flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-white mb-1">
                  {inView ? <CountUp end={51} duration={1.8} /> : 0}
                </div>
                <div className="text-gray-500 text-sm">Total Solved</div>
              </div>
            </div>

            <div className="flex justify-around">
              {DIFFICULTY.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <DonutChart solved={d.solved} total={d.total} color={d.color} size={100} />
                  <div className="text-center">
                    <div className={`text-xs font-bold ${d.textColor}`}>{d.label}</div>
                    <div className="text-[10px] text-gray-600">{d.solved} solved</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 flex items-center gap-1"><CheckCircle2 size={11} className="text-green-400" /> Acceptance Rate</span>
                <span className="text-white font-semibold">67.4%</span>
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span className="text-gray-500 flex items-center gap-1"><Flame size={11} className="text-orange-400" /> Current Streak</span>
                <span className="text-white font-semibold">7 days 🔥</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: TOPIC PROGRESS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <Target size={16} className="text-cyan-400" /> Topics Mastered
            </h3>
            <div className="space-y-4">
              {TOPICS.map((t, i) => <ProgressBar key={i} name={t.name} pct={t.pct} i={i} />)}
            </div>

            <motion.a
              href="https://leetcode.com/u/dangemanish/"
              target="_blank"
              whileHover={{ scale: 1.03 }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500/15 to-orange-500/15 border border-yellow-500/15 text-yellow-400 text-sm font-semibold hover:from-yellow-500/25 hover:to-orange-500/25 transition mt-6"
            >
              <Zap size={15} /> View Full LeetCode Profile →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}