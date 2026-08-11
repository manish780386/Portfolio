import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, ExternalLink, Trophy, Wifi, WifiOff,
  Star, GitBranch, GitCommit, Users, Zap,
  Target, Award, Code2, Activity, ChevronRight
} from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useLiveCodingStats } from "../hooks/useLiveCodingStats.js";

/* ══════════════════════════════════════════════
   STATIC PLATFORM DATA  (no public CORS API)
══════════════════════════════════════════════ */
const GH_URL = "https://github.com/manish780386";
const LC_URL = "https://leetcode.com/u/dangemanish/";

const STATIC_PLATFORMS = [
  { name: "HackerRank",    handle: "@dangemanish35", solved: 95,  note: "3★ Python · PS · SQL",     url: "https://www.hackerrank.com/profile/dangemanish35",       color: "#22c55e", glow: "#22c55e", icon: "🏅" },
  { name: "CodeChef",      handle: "@dange_123",     solved: 66,  note: "Rookie League · Growing",  url: "https://www.codechef.com/users/dange_123",               color: "#f97316", glow: "#f97316", icon: "👨‍🍳" },
  { name: "GeeksforGeeks", handle: "@dangema54zd",   solved: 40,  note: "Score 350+ · SVVV Indore", url: "https://www.geeksforgeeks.org/profile/dangema54zd",      color: "#16a34a", glow: "#16a34a", icon: "🟢" },
  { name: "Codolio",       handle: "@manishdange",   solved: null, note: "All-in-one dashboard",   url: "https://codolio.com/profile/manishdange",                color: "#a855f7", glow: "#a855f7", icon: "🦉" },
];

const LANG_COLORS = {
  JavaScript: "#f7df1e", TypeScript: "#3178c6",
  Python: "#3572A5", HTML: "#e34c26", CSS: "#1572b6",
  "—": "#888",
};

const TOPIC_COLORS = {
  AgriTech:   "bg-lime-500/15 text-lime-400 border-lime-500/20",
  "AI/ML":    "bg-purple-500/15 text-purple-400 border-purple-500/20",
  HealthTech: "bg-red-500/15 text-red-400 border-red-500/20",
  SaaS:       "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  Enterprise: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  Education:  "bg-green-500/15 text-green-400 border-green-500/20",
  "VS Code":  "bg-sky-500/15 text-sky-400 border-sky-500/20",
};

/* infer topic from repo name */
function inferTopic(name) {
  const n = name.toLowerCase();
  if (n.includes("kisan"))       return "AgriTech";
  if (n.includes("ai") || n.includes("aipe")) return "AI/ML";
  if (n.includes("doctor") || n.includes("hospital")) return "HealthTech";
  if (n.includes("job"))         return "SaaS";
  if (n.includes("lic"))         return "Enterprise";
  if (n.includes("svvv") || n.includes("notes")) return "Education";
  if (n.includes("json") || n.includes("operator") || n.includes("visualizer")) return "VS Code";
  return null;
}

/* ── HELPERS ── */
function LiveDot({ live }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${
      live
        ? "text-green-400 bg-green-500/10 border-green-500/20"
        : "text-gray-600 bg-white/[0.03] border-white/[0.06]"
    }`}>
      {live ? <Wifi size={8} /> : <WifiOff size={8} />}
      {live ? "Live" : "Cached"}
    </span>
  );
}

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-white/[0.06] rounded-xl ${className}`} />;
}

function StatNum({ end, suffix = "", duration = 1.6 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  return (
    <span ref={ref} className="font-black tabular-nums">
      {inView ? <CountUp end={end} duration={duration} suffix={suffix} /> : `0${suffix}`}
    </span>
  );
}

/* ── DONUT CHART ── */
function Donut({ solved, total, color, track, size = 90 }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const R = 36, circ = 2 * Math.PI * R;
  const pct = Math.min(solved / total, 1);
  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={R} fill="none" stroke={track} strokeWidth="7" />
        <motion.circle
          cx={size/2} cy={size/2} r={R} fill="none" stroke={color}
          strokeWidth="7" strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ * (1 - pct) } : { strokeDashoffset: circ }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-extrabold text-white leading-none">{solved}</span>
        <span className="text-[8px] text-gray-600 mt-0.5">/{total}</span>
      </div>
    </div>
  );
}

/* ── PROGRESS BAR ── */
function Bar({ name, pct, tag, i }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const TC = {
    Fundamental:  "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Advanced:     "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.06 }}>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">{name}</span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-medium ${TC[tag] || TC.Fundamental}`}>
            {tag}
          </span>
        </div>
        <span className="text-cyan-400 font-bold text-xs">{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
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

const LC_TOPICS = [
  { name: "Array",               pct: 88, tag: "Fundamental"  },
  { name: "Hash Table",          pct: 76, tag: "Intermediate" },
  { name: "String",              pct: 72, tag: "Fundamental"  },
  { name: "Two Pointers",        pct: 68, tag: "Fundamental"  },
  { name: "Math",                pct: 64, tag: "Intermediate" },
  { name: "Binary Search",       pct: 58, tag: "Intermediate" },
  { name: "Dynamic Programming", pct: 50, tag: "Advanced"     },
  { name: "Backtracking",        pct: 40, tag: "Advanced"     },
];

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function CodingProfiles() {
  const { loading, github, leetcode, codeforces } = useLiveCodingStats();
  const [tab, setTab] = useState("overview");

  const lc = leetcode || { totalSolved: 106, easySolved: 43, mediumSolved: 15, hardSolved: 1, ranking: "1,500,377", acceptanceRate: "56.8" };
  const cf = codeforces || { solved: 1, rating: null, maxRank: "Unrated" };
  const gh = github || { publicRepos: 40, followers: 2, totalStars: 8, topRepos: [] };

  const staticTotal = STATIC_PLATFORMS.reduce((s, p) => s + (p.solved || 0), 0);
  const totalSolved = (lc.totalSolved || 0) + (cf.solved || 0) + staticTotal;

  const TABS = [
    { id: "overview", label: "📊 Overview"         },
    { id: "leetcode", label: "⚡ LeetCode"          },
    { id: "github",   label: "🐙 GitHub"            },
    { id: "topics",   label: "🎯 Topics"            },
  ];

  return (
    <SectionWrapper id="coding" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle pre="DSA & Open Source" main="Coding" accent="Activity" />
        <SectionSubtitle>
          GitHub · LeetCode · Codeforces — fetched live on page load · not typed by hand
        </SectionSubtitle>

        {/* ── COMBINED TOTAL BANNER ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
          className="mb-10 p-8 rounded-3xl border text-center relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(6,182,212,0.2)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.07),transparent_70%)]" />
          {/* 4 mini-stats */}
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Problems Solved", val: totalSolved, suffix: "+", color: "text-cyan-400",   icon: <Code2 size={14}/> },
              { label: "GitHub Repos",    val: gh.publicRepos, suffix: "",  color: "text-blue-400",   icon: <GitBranch size={14}/> },
              { label: "Stars Earned",    val: gh.totalStars,  suffix: "+", color: "text-yellow-400", icon: <Star size={14}/> },
              { label: "Total Commits",   val: 400,            suffix: "+", color: "text-indigo-400", icon: <GitCommit size={14}/> },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className={s.color}>{s.icon}</div>
                <div className={`text-2xl font-black ${s.color}`}>
                  {loading ? <Skeleton className="h-7 w-14" /> : <StatNum end={s.val} suffix={s.suffix} />}
                </div>
                <div className="text-gray-600 text-[10px]">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* LIVE badges */}
          <div className="relative flex flex-wrap justify-center gap-2">
            {loading ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              <>
                <LiveDot live={leetcode?.live} />
                <span className="text-gray-700 text-[10px] self-center">LeetCode</span>
                <LiveDot live={github?.live} />
                <span className="text-gray-700 text-[10px] self-center">GitHub</span>
                <LiveDot live={codeforces?.live} />
                <span className="text-gray-700 text-[10px] self-center">Codeforces</span>
              </>
            )}
          </div>
        </motion.div>

        {/* ── ALL PLATFORM PILLS ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {/* LeetCode */}
          <motion.a href={LC_URL} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }} whileHover={{ scale: 1.05, y: -4 }}
            className="group relative p-4 rounded-2xl bg-white/[0.025] border border-white/[0.07] hover:border-yellow-500/30 transition-all overflow-hidden block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300" />
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-bold text-white text-xs mb-1">LeetCode</div>
            {loading
              ? <Skeleton className="h-6 w-10 mb-1" />
              : <div className="text-xl font-black text-yellow-400">{lc.totalSolved}</div>
            }
            <div className="text-gray-600 text-[10px]">@dangemanish</div>
          </motion.a>

          {/* Codeforces */}
          <motion.a href="https://codeforces.com/profile/dangemanish35" target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }} whileHover={{ scale: 1.05, y: -4 }}
            className="group relative p-4 rounded-2xl bg-white/[0.025] border border-white/[0.07] hover:border-indigo-500/30 transition-all overflow-hidden block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300" />
            <div className="text-2xl mb-2">🔵</div>
            <div className="font-bold text-white text-xs mb-1">Codeforces</div>
            {loading
              ? <Skeleton className="h-6 w-10 mb-1" />
              : <div className="text-xl font-black text-indigo-400">{cf.solved}</div>
            }
            <div className="text-gray-600 text-[10px]">{cf.maxRank}</div>
          </motion.a>

          {/* Static platforms */}
          {STATIC_PLATFORMS.map((p, i) => (
            <motion.a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }} whileHover={{ scale: 1.05, y: -4 }}
              className="group relative p-4 rounded-2xl bg-white/[0.025] border border-white/[0.07] transition-all overflow-hidden block"
              style={{ "--glow": p.glow }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, ${p.color}, transparent)` }} />
              <div className="text-2xl mb-2">{p.icon}</div>
              <div className="font-bold text-white text-xs mb-1">{p.name}</div>
              <div className="text-xl font-black" style={{ color: p.color }}>
                {p.solved ?? "→"}
              </div>
              <div className="text-gray-600 text-[10px]">{p.handle}</div>
            </motion.a>
          ))}
        </div>

        {/* ── TAB SWITCHER ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                tab === t.id
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white hover:border-white/[0.14]"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ════ TAB: OVERVIEW ════ */}
          {tab === "overview" && (
            <motion.div key="overview"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* LeetCode quick card */}
              <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07]">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Trophy size={15} className="text-yellow-400" /> LeetCode Stats
                  </h3>
                  {!loading && <LiveDot live={lc.live} />}
                </div>
                {loading ? (
                  <div className="space-y-3"><Skeleton className="h-12" /><Skeleton className="h-8" /></div>
                ) : (
                  <>
                    <div className="text-center mb-5">
                      <div className="text-5xl font-black text-white mb-1">{lc.totalSolved}</div>
                      <div className="text-gray-500 text-xs">Problems Solved</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[
                        { label: "Easy",   val: lc.easySolved,   color: "#22c55e" },
                        { label: "Medium", val: lc.mediumSolved,  color: "#eab308" },
                        { label: "Hard",   val: lc.hardSolved,    color: "#ef4444" },
                      ].map((d, i) => (
                        <div key={i} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                          <div className="text-lg font-black" style={{ color: d.color }}>{d.val}</div>
                          <div className="text-[10px] text-gray-600">{d.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-around text-center">
                      {[
                        { label: "Acceptance",  val: `${lc.acceptanceRate}%`, c: "text-green-400"  },
                        { label: "Rank",        val: `#${lc.ranking}`,        c: "text-blue-400"   },
                        { label: "100-Day",      val: "🏅 Badge",              c: "text-yellow-400" },
                      ].map((s, i) => (
                        <div key={i}>
                          <div className={`text-sm font-bold ${s.c}`}>{s.val}</div>
                          <div className="text-[10px] text-gray-600">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* GitHub quick card */}
              <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07]">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Github size={15} className="text-cyan-400" /> GitHub Stats
                  </h3>
                  {!loading && <LiveDot live={gh.live} />}
                </div>
                {loading ? (
                  <div className="space-y-3"><Skeleton className="h-12" /><Skeleton className="h-24" /></div>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[
                        { label: "Repos",   val: gh.publicRepos, icon: <GitBranch size={13}/>, c: "text-cyan-400"    },
                        { label: "Stars",   val: gh.totalStars,  icon: <Star size={13}/>,      c: "text-yellow-400" },
                        { label: "Followers",val: gh.followers,  icon: <Users size={13}/>,     c: "text-pink-400"   },
                      ].map((s, i) => (
                        <div key={i} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                          <div className={`flex justify-center mb-1 ${s.c}`}>{s.icon}</div>
                          <div className={`text-lg font-black ${s.c}`}>{s.val}</div>
                          <div className="text-[10px] text-gray-600">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    {/* Top 2 repos preview */}
                    <div className="space-y-2">
                      {(gh.topRepos || []).slice(0, 2).map((r, ri) => (
                        <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition group">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: LANG_COLORS[r.lang] || "#888" }} />
                          <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition truncate flex-1">{r.name}</span>
                          {r.stars > 0 && <span className="text-[10px] text-gray-600 shrink-0">⭐ {r.stars}</span>}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* ════ TAB: LEETCODE ════ */}
          {tab === "leetcode" && (
            <motion.div key="leetcode"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Left — main stats */}
              <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Trophy size={16} className="text-yellow-400" /> @dangemanish
                  </h3>
                  {!loading && <LiveDot live={lc.live} />}
                </div>

                {loading ? (
                  <div className="space-y-4"><Skeleton className="h-16" /><Skeleton className="h-24" /></div>
                ) : (
                  <>
                    {/* BIG NUMBER */}
                    <div className="text-center mb-6">
                      <div className="text-6xl font-black text-white mb-1">
                        <StatNum end={lc.totalSolved} duration={1.8} />
                      </div>
                      <div className="text-gray-500 text-sm mb-4">Total Solved</div>
                      <div className="flex justify-center gap-6">
                        {[
                          { label: "Acceptance", val: `${lc.acceptanceRate}%`, c: "text-green-400"  },
                          { label: "Streak",     val: "13d 🔥",                c: "text-orange-400" },
                          { label: "Rank",       val: `#${lc.ranking}`,        c: "text-blue-400"  },
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
                        { label: "Easy",   solved: lc.easySolved,  total: 850,  color: "#22c55e", track: "rgba(34,197,94,0.12)"  },
                        { label: "Medium", solved: lc.mediumSolved, total: 1780, color: "#eab308", track: "rgba(234,179,8,0.12)"  },
                        { label: "Hard",   solved: lc.hardSolved,  total: 740,  color: "#ef4444", track: "rgba(239,68,68,0.12)"  },
                      ].map((d, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                          <Donut {...d} />
                          <span className={`text-xs font-bold ${i===0?"text-green-400":i===1?"text-yellow-400":"text-red-400"}`}>{d.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* LANGUAGE BARS */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-4">
                      <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Language Breakdown</p>
                      {[
                        { lang: "Java",   count: 96, pct: 91, color: "#f97316" },
                        { lang: "MySQL",  count: 9,  pct: 8,  color: "#06b6d4" },
                        { lang: "Python", count: 1,  pct: 1,  color: "#3b82f6" },
                      ].map((l, li) => (
                        <div key={li} className="mb-2">
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-gray-400 font-medium">{l.lang}</span>
                            <span className="text-gray-500">{l.count} · {l.pct}%</span>
                          </div>
                          <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${l.pct}%` }}
                              transition={{ duration: 1, delay: li * 0.1 }}
                              className="h-full rounded-full" style={{ background: l.color }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 50-DAY BADGE */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-4">
                      <span className="text-2xl">🏅</span>
                      <div>
                        <p className="text-yellow-400 text-xs font-bold">50 Days Badge 2026</p>
                        <p className="text-gray-600 text-[10px]">50 consecutive days active on LeetCode</p>
                      </div>
                    </div>

                    <motion.a href={LC_URL} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500/15 to-orange-500/15 border border-yellow-500/20 text-yellow-400 text-sm font-semibold hover:from-yellow-500/25 hover:to-orange-500/25 transition">
                      <Zap size={14} /> View LeetCode Profile →
                    </motion.a>
                  </>
                )}
              </div>

              {/* Right — other platforms list */}
              <div className="space-y-3">
                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                  <Target size={16} className="text-cyan-400" /> Other Platforms
                </h3>
                {[
                  { name: "HackerRank",   val: 70, icon: "🏅", color: "#22c55e", note: "⭐⭐⭐ Python, PS, SQL", url: "https://www.hackerrank.com/profile/dangemanish35" },
                  { name: "GeeksforGeeks",val: 30, icon: "🟢", color: "#16a34a", note: "Score 350+ · SVVV Indore", url: "https://www.geeksforgeeks.org/profile/dangema54zd" },
                  { name: "CodeChef",     val: 37, icon: "👨‍🍳", color: "#f97316", note: "Rookie League · Growing", url: "https://www.codechef.com/users/dange_123" },
                  { name: "Codeforces",   val: cf.solved, icon: "🔵", color: "#6366f1", note: `${cf.maxRank} · Registered 9mo ago`, url: "https://codeforces.com/profile/dangemanish35" },
                ].map((p, i) => (
                  <motion.a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }} whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.025] border border-white/[0.07] hover:border-white/[0.15] transition group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                      {p.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{p.name}</span>
                        <span className="text-xl font-black" style={{ color: p.color }}>{p.val}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 truncate">{p.note}</p>
                    </div>
                    <ExternalLink size={12} className="text-gray-700 group-hover:text-gray-400 transition shrink-0" />
                  </motion.a>
                ))}

                {/* Codolio */}
                <motion.a href="https://codolio.com/profile/manishdange" target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }} whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-4 rounded-2xl border transition group"
                  style={{ background: "rgba(168,85,247,0.06)", borderColor: "rgba(168,85,247,0.25)" }}>
                  <span className="text-2xl">🦉</span>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-purple-400">Codolio Profile</div>
                    <div className="text-[11px] text-gray-600">@manishdange · All-in-one coding dashboard</div>
                  </div>
                  <ExternalLink size={12} className="text-gray-700 group-hover:text-purple-400 transition" />
                </motion.a>
              </div>
            </motion.div>
          )}

          {/* ════ TAB: GITHUB ════ */}
          {tab === "github" && (
            <motion.div key="github"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* GitHub readme stats images */}
              <div className="grid md:grid-cols-3 gap-5">
                <div className="md:col-span-2 p-5 rounded-2xl bg-white/[0.025] border border-white/[0.07]">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      <Github size={14} className="text-cyan-400" /> Contribution Graph
                    </p>
                    {!loading && <LiveDot live={gh.live} />}
                  </div>
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=manish780386&show_icons=true&theme=github_dark&hide_border=true&bg_color=0d1117&title_color=58a6ff&icon_color=58a6ff&text_color=e6edf3`}
                    alt="GitHub Stats" className="w-full rounded-xl mb-3"
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  <img
                    src="https://ghchart.rshah.org/06b6d4/manish780386"
                    alt="Contribution Chart" className="w-full rounded-lg opacity-80"
                    onError={e => { e.target.style.display = "none"; }}
                  />
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.07] flex flex-col gap-4">
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    <Activity size={14} className="text-cyan-400" /> Quick Stats
                  </p>
                  {loading ? (
                    <div className="space-y-3"><Skeleton className="h-12" /><Skeleton className="h-12" /><Skeleton className="h-12" /></div>
                  ) : (
                    <>
                      {[
                        { label: "Public Repos",  val: gh.publicRepos, icon: <GitBranch size={14}/>, c: "text-cyan-400"    },
                        { label: "Stars Earned",  val: `${gh.totalStars}+`, icon: <Star size={14}/>,  c: "text-yellow-400" },
                        { label: "Followers",     val: gh.followers,   icon: <Users size={14}/>,      c: "text-pink-400"   },
                        { label: "Total Commits", val: "400+",         icon: <GitCommit size={14}/>,  c: "text-indigo-400" },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                          <div className={s.c}>{s.icon}</div>
                          <div className="flex-1">
                            <div className={`text-sm font-bold ${s.c}`}>{s.val}</div>
                            <div className="text-[10px] text-gray-600">{s.label}</div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  <img
                    src="https://streak-stats.demolab.com?user=manish780386&theme=github-dark-blue&hide_border=true&background=0d1117"
                    alt="Streak" className="w-full rounded-xl mt-auto"
                    onError={e => { e.target.style.display = "none"; }}
                  />
                </div>
              </div>

              {/* REPOS GRID */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-black text-white uppercase tracking-widest">Top Repositories</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  {!loading && <span className="text-[11px] text-gray-600">{gh.publicRepos} total</span>}
                </div>
                {loading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(gh.topRepos || []).map((r, i) => {
                      const topic = inferTopic(r.name);
                      return (
                        <motion.a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          whileHover={{ scale: 1.03, y: -4, borderColor: "rgba(0,200,255,0.25)" }}
                          className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] transition-all group block relative overflow-hidden"
                        >
                          <div className="flex items-center gap-2 mb-2 pr-4">
                            <GitBranch size={12} className="text-cyan-400 shrink-0" />
                            <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition truncate">{r.name}</span>
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{r.desc}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[r.lang] || "#888" }} />
                              <span className="text-[11px] text-gray-600">{r.lang}</span>
                              {topic && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${TOPIC_COLORS[topic] || ""}`}>
                                  {topic}
                                </span>
                              )}
                            </div>
                            {r.stars > 0 && <span className="text-[10px] text-gray-600">⭐ {r.stars}</span>}
                          </div>
                        </motion.a>
                      );
                    })}
                  </div>
                )}
                <div className="text-center mt-6">
                  <motion.a href={`${GH_URL}?tab=repositories`} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/25 text-sm text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition">
                    <Github size={14} /> View All Repositories <ChevronRight size={13} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════ TAB: TOPICS ════ */}
          {tab === "topics" && (
            <motion.div key="topics"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.07]"
            >
              <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <Target size={16} className="text-cyan-400" /> LeetCode Skill Tags
              </h3>
              <p className="text-gray-600 text-xs mb-6">Real problem tags from @dangemanish — Array×54, HashTable×23, String×23, TwoPointers×20</p>
              <div className="space-y-4 mb-8">
                {LC_TOPICS.map((t, i) => <Bar key={i} {...t} i={i} />)}
              </div>
              <div className="pt-5 border-t border-white/[0.06]">
                <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-3">HackerRank Certified Skills</p>
                <div className="flex flex-wrap gap-2">
                  {["Python ⭐⭐⭐", "Problem Solving ⭐⭐⭐", "SQL ⭐⭐⭐"].map((s, i) => (
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