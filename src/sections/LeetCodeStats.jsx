import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Target, Flame, Zap, ExternalLink, CheckCircle2, Code2, Award } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

/* ══════════════════════════════════════════════
   REAL DATA — fetched from all profiles Jun 2026
══════════════════════════════════════════════ */

// LeetCode — dangemanish (fetched live)
const LC = {
  username:    "dangemanish",
  url:         "https://leetcode.com/u/dangemanish/",
  java:        96,
  mysql:       9,
  python:      1,
  totalSolved: 106,   // Java 96 + MySQL 9 + Python 1
  easy:        43,
  medium:      15,
  hard:        1,
  acceptanceRate: "56.8%",
  streak:      13,
  ranking:     "1,500,377",
  badge:       "50 Days Badge 2026 🏅",
};

// CodeChef — dange_123 (fetched live)
const CC = {
  username: "dange_123",
  url:      "https://www.codechef.com/users/dange_123",
  solved:   37,
  league:   "Rookie League",
  contests: 0,
};

// Codeforces — dangemanish35 (fetched live)
const CF = {
  username: "dangemanish35",
  url:      "https://codeforces.com/profile/dangemanish35",
  solved:   1,
  rating:   "Unrated",
  streak:   "1 day max",
  registered: "9 months ago",
};

// GFG — dangema54zd
const GFG = {
  username: "dangemanish780386",
  url:      "https://www.geeksforgeeks.org/profile/dangema54zd",
  solved:   30,
  score:    "350+",
};

// HackerRank
const HR = {
  username: "dangemanish35",
  url:      "https://www.hackerrank.com/profile/dangemanish35",
  solved:   70,
  stars:    3,
  skills:   ["Python ⭐⭐⭐", "Problem Solving ⭐⭐⭐", "SQL ⭐⭐⭐"],
};

// Codolio
const CODOLIO = {
  username: "manishdange",
  url:      "https://codolio.com/profile/manishdange",
};

/* ══════════════════════════════════════════════
   PLATFORMS LIST
══════════════════════════════════════════════ */
const PLATFORMS = [
  {
    name:    "LeetCode",
    handle:  `@${LC.username}`,
    icon:    "⚡",
    solved:  LC.totalSolved,
    sub:     `Java ${LC.java} · MySQL ${LC.mysql} · Python ${LC.python}`,
    extra:   `Rank ${LC.ranking} · ${LC.acceptanceRate} acceptance`,
    badge:   LC.badge,
    url:     LC.url,
    color:   "from-yellow-500 to-orange-500",
    glow:    "#f97316",
    real:    true,
  },
  {
    name:    "HackerRank",
    handle:  `@${HR.username}`,
    icon:    "🏅",
    solved:  HR.solved,
    sub:     `⭐⭐⭐ in Python, PS & SQL`,
    extra:   `3 Gold Stars · Fundamentals`,
    badge:   null,
    url:     HR.url,
    color:   "from-emerald-500 to-green-500",
    glow:    "#22c55e",
    real:    true,
  },
  {
    name:    "GeeksForGeeks",
    handle:  `@${GFG.username}`,
    icon:    "🟢",
    solved:  GFG.solved,
    sub:     `Score ${GFG.score} · SVVV Indore`,
    extra:   `Institute rank · Active contributor`,
    badge:   null,
    url:     GFG.url,
    color:   "from-green-500 to-teal-500",
    glow:    "#14b8a6",
    real:    true,
  },
  {
    name:    "CodeChef",
    handle:  `@${CC.username}`,
    icon:    "👨‍🍳",
    solved:  CC.solved,
    sub:     `${CC.league} · JS Learning 13%`,
    extra:   `0 contests · Growing actively`,
    badge:   null,
    url:     CC.url,
    color:   "from-amber-500 to-orange-400",
    glow:    "#f59e0b",
    real:    true,
  },
  {
    name:    "Codeforces",
    handle:  `@${CF.username}`,
    icon:    "🔵",
    solved:  CF.solved,
    sub:     `Unrated · Registered 9mo ago`,
    extra:   `Just getting started here`,
    badge:   null,
    url:     CF.url,
    color:   "from-blue-500 to-indigo-500",
    glow:    "#6366f1",
    real:    true,
  },
  {
    name:    "Codolio",
    handle:  `@${CODOLIO.username}`,
    icon:    "🦉",
    solved:  null,
    sub:     `All-in-one coding profile`,
    extra:   `Dashboard · Unified stats`,
    badge:   null,
    url:     CODOLIO.url,
    color:   "from-purple-500 to-pink-500",
    glow:    "#a855f7",
    real:    true,
  },
];

const TOPICS = [
  { name: "Arrays",              pct: 88, tag: "Fundamental" },
  { name: "Hash Table",          pct: 78, tag: "Intermediate" },
  { name: "Two Pointers",        pct: 72, tag: "Fundamental"  },
  { name: "String",              pct: 65, tag: "Fundamental"  },
  { name: "Binary Search",       pct: 60, tag: "Intermediate" },
  { name: "Dynamic Programming", pct: 50, tag: "Advanced"     },
  { name: "Math",                pct: 58, tag: "Intermediate" },
  { name: "Backtracking",        pct: 42, tag: "Advanced"     },
];

const TAG_COLORS = {
  Fundamental:  { bg: "bg-cyan-500/10",   text: "text-cyan-400",   border: "border-cyan-500/20"   },
  Intermediate: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" },
  Advanced:     { bg: "bg-red-500/10",    text: "text-red-400",    border: "border-red-500/20"    },
};

/* ─── DONUT CHART ─── */
function Donut({ solved, total, color, track, size = 96 }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const R = 38, circ = 2 * Math.PI * R;
  const pct = Math.min(solved / total, 1);
  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={R} fill="none" stroke={track} strokeWidth="7" />
        <motion.circle cx={size/2} cy={size/2} r={R} fill="none" stroke={color}
          strokeWidth="7" strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ * (1 - pct) } : { strokeDashoffset: circ }}
          transition={{ duration: 1.4, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-extrabold text-white leading-none">
          {inView ? <CountUp end={solved} duration={1.4} /> : 0}
        </span>
        <span className="text-[9px] text-gray-600 mt-0.5">/{total}</span>
      </div>
    </div>
  );
}

/* ─── PROGRESS BAR ─── */
function Bar({ name, pct, tag, i }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const tc = TAG_COLORS[tag] || TAG_COLORS.Fundamental;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.06 }}>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">{name}</span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-medium ${tc.bg} ${tc.text} ${tc.border}`}>
            {tag}
          </span>
        </div>
        <span className="text-cyan-400 font-semibold text-xs">{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: i * 0.07, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500" />
      </div>
    </motion.div>
  );
}

/* ─── PLATFORM CARD ─── */
function PlatformCard({ p, i }) {
  return (
    <motion.a href={p.url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      whileHover={{ scale: 1.04, y: -4 }}
      className="relative p-5 rounded-2xl bg-white/[0.025] border border-white/[0.07] group block overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 rounded-2xl`} />

      {/* TOP ROW */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${p.glow}18`, border: `1px solid ${p.glow}30` }}>
            {p.icon}
          </div>
          <div>
            <div className="font-bold text-white text-sm flex items-center gap-1.5">
              {p.name}
              {p.real && (
                <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/15 text-blue-400 rounded-full border border-blue-500/20 font-bold">
                  ✓ REAL
                </span>
              )}
            </div>
            <div className="text-gray-600 text-[10px]">{p.handle}</div>
          </div>
        </div>
        <ExternalLink size={12} className="text-gray-700 group-hover:text-gray-400 transition mt-1 shrink-0" />
      </div>

      {/* SOLVED COUNT */}
      {p.solved !== null ? (
        <div className="mb-2">
          <span className={`text-2xl font-extrabold bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>
            {p.solved}
          </span>
          <span className="text-gray-600 text-xs ml-1">problems solved</span>
        </div>
      ) : (
        <div className="mb-2 text-sm font-bold text-purple-400">View Profile →</div>
      )}

      <p className="text-[11px] text-gray-500 mb-1">{p.sub}</p>
      <p className="text-[10px] text-gray-600">{p.extra}</p>

      {p.badge && (
        <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 w-fit">
          <Award size={11} className="text-yellow-400" />
          <span className="text-[10px] text-yellow-400 font-semibold">{p.badge}</span>
        </div>
      )}
    </motion.a>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════ */
export default function LeetCodeStats() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [tab, setTab] = useState("leetcode");

  return (
    <SectionWrapper id="leetcode" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle pre="DSA & Competitive Programming" main="Coding" accent="Stats" />
        <SectionSubtitle>Real data fetched from all my profiles — grinding daily 💪</SectionSubtitle>

        {/* TOTAL COMBINED STAT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mb-10 p-6 rounded-2xl border text-center relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(6,182,212,0.2)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_70%)]" />
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Total Problems Solved Across All Platforms</p>
          <div className="text-6xl font-black text-white mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {LC.totalSolved + CC.solved + GFG.solved + HR.solved + CF.solved}+
            </span>
          </div>
          <p className="text-gray-600 text-xs">LeetCode · HackerRank · GFG · CodeChef · Codeforces</p>
        </motion.div>

        {/* ALL PLATFORM CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {PLATFORMS.map((p, i) => <PlatformCard key={i} p={p} i={i} />)}
        </div>

        {/* TAB SWITCHER */}
        <div className="flex gap-2 mb-8">
          {[
            { id: "leetcode", label: "⚡ LeetCode Deep Dive" },
            { id: "topics",   label: "🎯 Topics Mastered" },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                tab === t.id
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg"
                  : "bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "leetcode" ? (
            <motion.div key="lc" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-8">

              {/* LEFT — BIG STATS */}
              <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07]">
                <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-400" />
                  LeetCode — <span className="text-yellow-400">@{LC.username}</span>
                </h3>

                <div ref={ref} className="text-center mb-6">
                  <div className="text-6xl font-black text-white mb-1">
                    {inView ? <CountUp end={LC.totalSolved} duration={1.8} /> : 0}
                  </div>
                  <div className="text-gray-500 text-sm mb-4">Problems Solved</div>
                  <div className="flex justify-center gap-6">
                    {[
                      { label: "Acceptance",  val: LC.acceptanceRate, c: "text-green-400"  },
                      { label: "Streak",      val: `${LC.streak}d 🔥`, c: "text-orange-400" },
                      { label: "Rank",        val: `#${LC.ranking}`,   c: "text-blue-400"  },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <div className={`text-sm font-bold ${s.c}`}>{s.val}</div>
                        <div className="text-[10px] text-gray-600">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DONUTS */}
                <div className="flex justify-around items-end mb-5">
                  {[
                    { label: "Easy",   solved: LC.easy,   total: 850,  color: "#22c55e", track: "rgba(34,197,94,0.12)"  },
                    { label: "Medium", solved: LC.medium, total: 1780, color: "#eab308", track: "rgba(234,179,8,0.12)"  },
                    { label: "Hard",   solved: LC.hard,   total: 740,  color: "#ef4444", track: "rgba(239,68,68,0.12)"  },
                  ].map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                      <Donut {...d} size={88} />
                      <span className={`text-xs font-bold ${
                        i === 0 ? "text-green-400" : i === 1 ? "text-yellow-400" : "text-red-400"
                      }`}>{d.label}</span>
                      <span className="text-[10px] text-gray-600">{d.solved} solved</span>
                    </div>
                  ))}
                </div>

                {/* LANGUAGE BREAKDOWN */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-4">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Language Breakdown</p>
                  <div className="space-y-2">
                    {[
                      { lang: "Java",   count: LC.java,   pct: Math.round((LC.java/LC.totalSolved)*100),   color: "#f97316" },
                      { lang: "MySQL",  count: LC.mysql,  pct: Math.round((LC.mysql/LC.totalSolved)*100),  color: "#06b6d4" },
                      { lang: "Python", count: LC.python, pct: Math.round((LC.python/LC.totalSolved)*100), color: "#3b82f6" },
                    ].map((l, li) => (
                      <div key={li}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-gray-400 font-medium">{l.lang}</span>
                          <span className="text-gray-500">{l.count} problems · {l.pct}%</span>
                        </div>
                        <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${l.pct}%` }}
                            transition={{ duration: 1, delay: li * 0.1 }}
                            className="h-full rounded-full" style={{ background: l.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BADGE */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-4">
                  <span className="text-lg">🏅</span>
                  <div>
                    <p className="text-yellow-400 text-xs font-bold">{LC.badge}</p>
                    <p className="text-gray-600 text-[10px]">50 days active on LeetCode</p>
                  </div>
                </div>

                <motion.a href={LC.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500/15 to-orange-500/15 border border-yellow-500/20 text-yellow-400 text-sm font-semibold hover:from-yellow-500/25 hover:to-orange-500/25 transition">
                  <Zap size={14} /> View LeetCode Profile →
                </motion.a>
              </div>

              {/* RIGHT — OTHER PLATFORMS QUICK */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target size={16} className="text-cyan-400" /> Other Platforms
                </h3>

                {[
                  { label: "HackerRank",  val: HR.solved,  icon: "🏅", color: "#22c55e",  note: "⭐⭐⭐ Python, PS, SQL",            url: HR.url  },
                  { label: "GFG",         val: GFG.solved, icon: "🟢", color: "#14b8a6",  note: `Score ${GFG.score} · SVVV Indore`, url: GFG.url },
                  { label: "CodeChef",    val: CC.solved,  icon: "👨‍🍳", color: "#f59e0b",  note: `Rookie League · JS Learning`,      url: CC.url  },
                  { label: "Codeforces", val: CF.solved,   icon: "🔵", color: "#6366f1",  note: "Unrated · Just started",           url: CF.url  },
                ].map((p, i) => (
                  <motion.a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.025] border border-white/[0.07] hover:border-white/15 transition group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                      style={{ background: `${p.color}18`, border: `1px solid ${p.color}30` }}>
                      {p.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{p.label}</span>
                        <span className="text-xl font-extrabold" style={{ color: p.color }}>{p.val}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 truncate">{p.note}</p>
                    </div>
                    <ExternalLink size={13} className="text-gray-700 group-hover:text-gray-400 transition shrink-0" />
                  </motion.a>
                ))}

                {/* CODOLIO */}
                <motion.a href={CODOLIO.url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-4 rounded-xl border transition group"
                  style={{ background: "rgba(168,85,247,0.06)", borderColor: "rgba(168,85,247,0.25)" }}>
                  <span className="text-2xl">🦉</span>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-purple-400">Codolio Profile</div>
                    <div className="text-[11px] text-gray-600">@{CODOLIO.username} · All-in-one coding dashboard</div>
                  </div>
                  <ExternalLink size={13} className="text-gray-700 group-hover:text-purple-400 transition" />
                </motion.a>
              </div>
            </motion.div>

          ) : (
            <motion.div key="topics" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07]">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Target size={16} className="text-cyan-400" /> DSA Topics — LeetCode Skills
              </h3>
              <p className="text-gray-600 text-xs mb-6">Based on real problem tags from @{LC.username}</p>
              <div className="space-y-4">
                {TOPICS.map((t, i) => (
                  <Bar key={i} name={t.name} pct={t.pct} tag={t.tag} i={i} />
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-3">HackerRank Skill Stars</p>
                <div className="flex flex-wrap gap-2">
                  {HR.skills.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </SectionWrapper>
  );
}