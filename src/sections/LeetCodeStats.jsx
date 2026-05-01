import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Flame, Zap, ExternalLink, CheckCircle2, Code2 } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

/* ────────────────────────────────────────────────
   REAL DATA — dangemanish @ LeetCode
   Profile: https://leetcode.com/u/dangemanish/
   Updated manually — replace whenever you improve!
──────────────────────────────────────────────── */
const LC = {
  username:       "dangemanish",
  profileUrl:     "https://leetcode.com/u/dangemanish/",
  totalSolved:    59,
  easy:           43,
  medium:         15,
  hard:           1,
  acceptanceRate: "56.8%",
  streak:         13,
  ranking:        "~500k",
  contestRating:  "—",
};

const GFG = {
  username:    "dangemanish780386",
  profileUrl:  "https://www.geeksforgeeks.org/user/dangemanish780386/",
  solved:      30,
  score:       "350+",
  institute:   "SVVV Indore",
};

const HACKERRANK = {
  username:   "manish780386",
  profileUrl: "https://www.hackerrank.com/manish780386",
  solved:     70,
  stars:      "⭐⭐⭐",
  skills:     ["Python", "Problem Solving", "SQL"],
};

const PLATFORMS = [
  {
    name:     "LeetCode",
    handle:   `@${LC.username}`,
    solved:   LC.totalSolved,
    extra:    `Rank ~500k · ${LC.acceptanceRate} acceptance`,
    url:      LC.profileUrl,
    color:    "from-yellow-500 to-orange-500",
    icon:     "⚡",
    verified: true,
  },
  {
    name:     "GeeksForGeeks",
    handle:   `@${GFG.username}`,
    solved:   GFG.solved,
    extra:    `Score ${GFG.score} · ${GFG.institute}`,
    url:      GFG.profileUrl,
    color:    "from-green-500 to-teal-500",
    icon:     "🟢",
    verified: true,
  },
  {
    name:     "HackerRank",
    handle:   `@${HACKERRANK.username}`,
    solved:   HACKERRANK.solved,
    extra:    `${HACKERRANK.stars} · Python, PS, SQL`,
    url:      HACKERRANK.profileUrl,
    color:    "from-emerald-500 to-green-500",
    icon:     "🏅",
    verified: false,
  },
];

const DIFFICULTY = [
  { label: "Easy",   solved: LC.easy,   total: 820,  color: "#22c55e", track: "rgba(34,197,94,0.15)", textColor: "text-green-400"  },
  { label: "Medium", solved: LC.medium, total: 1720, color: "#eab308", track: "rgba(234,179,8,0.15)",  textColor: "text-yellow-400" },
  { label: "Hard",   solved: LC.hard,   total: 720,  color: "#ef4444", track: "rgba(239,68,68,0.15)",  textColor: "text-red-400"    },
];

const TOPICS = [
  { name: "Arrays & Hashing",    pct: 88, count: 12 },
  { name: "Two Pointers",        pct: 75, count: 8  },
  { name: "Sliding Window",      pct: 68, count: 6  },
  { name: "Stack & Queue",       pct: 72, count: 7  },
  { name: "Binary Search",       pct: 60, count: 5  },
  { name: "Linked Lists",        pct: 55, count: 5  },
  { name: "Trees & Graphs",      pct: 42, count: 4  },
  { name: "Dynamic Programming", pct: 35, count: 3  },
];

/* ─── DONUT CHART ─── */
function Donut({ solved, total, color, track, size = 100 }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const R    = 40;
  const circ = 2 * Math.PI * R;
  const pct  = Math.min(solved / total, 1);
  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={R} fill="none" stroke={track} strokeWidth="8" />
        <motion.circle
          cx={size/2} cy={size/2} r={R} fill="none" stroke={color}
          strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ * (1 - pct) } : { strokeDashoffset: circ }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-extrabold text-white leading-none">
          {inView ? <CountUp end={solved} duration={1.4} /> : 0}
        </span>
        <span className="text-[9px] text-gray-600 mt-0.5">/{total}</span>
      </div>
    </div>
  );
}

/* ─── PROGRESS BAR ─── */
function Bar({ name, pct, count, i }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-400">{name}</span>
        <span className="text-gray-600">{count} solved · <span className="text-cyan-400 font-semibold">{pct}%</span></span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: i * 0.07, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
        />
      </div>
    </motion.div>
  );
}

export default function LeetCodeStats() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const total = LC.easy + LC.medium + LC.hard;

  return (
    <SectionWrapper id="leetcode" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle pre="DSA & Problem Solving" main="Coding" accent="Stats" />
        <SectionSubtitle>Real data from my coding profiles — sharpening skills daily</SectionSubtitle>

        {/* PLATFORM CARDS */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {PLATFORMS.map((p, i) => (
            <motion.a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.03 }}
              className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.07] group cursor-pointer relative overflow-hidden block">
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 rounded-2xl`} />
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      {p.name}
                      {p.verified && <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/20 font-semibold">✓ Real</span>}
                    </div>
                    <div className="text-gray-600 text-[11px]">{p.handle}</div>
                  </div>
                </div>
                <ExternalLink size={13} className="text-gray-700 group-hover:text-gray-400 transition mt-1" />
              </div>
              <div className="flex items-end gap-3">
                <div>
                  <div className="text-3xl font-extrabold text-white">{p.solved}<span className="text-base text-gray-500">+</span></div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Problems Solved</div>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 mt-2">{p.extra}</p>
            </motion.a>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT: LEETCODE BREAKDOWN */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07]">
            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <Trophy size={16} className="text-yellow-400" />
              LeetCode — <span className="text-cyan-400">@{LC.username}</span>
            </h3>

            {/* TOTAL BIG NUMBER */}
            <div ref={ref} className="text-center mb-8">
              <div className="text-6xl font-extrabold text-white mb-1">
                {inView ? <CountUp end={LC.totalSolved} duration={1.8} /> : 0}
              </div>
              <div className="text-gray-500 text-sm">Total Problems Solved</div>
              <div className="flex justify-center gap-6 mt-4">
                {[
                  { label: "Acceptance", val: LC.acceptanceRate, color: "text-green-400" },
                  { label: "Streak", val: `${LC.streak}d 🔥`, color: "text-orange-400" },
                  { label: "Ranking", val: LC.ranking, color: "text-blue-400" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-sm font-bold ${s.color}`}>{s.val}</div>
                    <div className="text-[10px] text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* DONUT CHARTS */}
            <div className="flex justify-around items-end mb-6">
              {DIFFICULTY.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Donut solved={d.solved} total={d.total} color={d.color} track={d.track} size={96} />
                  <div className="text-center">
                    <div className={`text-xs font-bold ${d.textColor}`}>{d.label}</div>
                    <div className="text-[10px] text-gray-600">{d.solved} / {d.total}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* STATS ROW */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <CheckCircle2 size={13} className="text-green-400" />, label: "Acceptance Rate", val: LC.acceptanceRate },
                { icon: <Flame size={13} className="text-orange-400" />,       label: "Current Streak",  val: `${LC.streak} days 🔥` },
                { icon: <Trophy size={13} className="text-yellow-400" />,      label: "Global Rank",     val: LC.ranking },
                { icon: <Code2 size={13} className="text-cyan-400" />,         label: "Total Solved",    val: `${LC.totalSolved} / 3260` },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  {s.icon}
                  <div>
                    <div className="text-[10px] text-gray-600">{s.label}</div>
                    <div className="text-xs font-semibold text-white">{s.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <motion.a href={LC.profileUrl} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500/15 to-orange-500/15 border border-yellow-500/20 text-yellow-400 text-sm font-semibold hover:from-yellow-500/25 hover:to-orange-500/25 transition mt-4">
              <Zap size={15} /> View Full LeetCode Profile →
            </motion.a>
          </motion.div>

          {/* RIGHT: TOPIC PROGRESS */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07]">
            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <Target size={16} className="text-cyan-400" /> DSA Topics Mastered
            </h3>
            <div className="space-y-4">
              {TOPICS.map((t, i) => <Bar key={i} name={t.name} pct={t.pct} count={t.count} i={i} />)}
            </div>

            {/* SKILL BADGES */}
            <div className="mt-6 pt-5 border-t border-white/[0.05]">
              <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-3">HackerRank Skills</p>
              <div className="flex flex-wrap gap-2">
                {HACKERRANK.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium rounded-lg">
                    {s} ⭐⭐⭐
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}