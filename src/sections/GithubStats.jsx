import React from "react";
import { motion } from "framer-motion";
import {
  GitBranch, GitCommit, Star, Activity,
  ExternalLink, Github, Users, GitFork, Eye
} from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

/* ══════════════════════════════════════════════
   REAL DATA — fetched from github.com/manish780386
   Jun 2026
══════════════════════════════════════════════ */
const USERNAME = "manish780386";
const GH_URL   = `https://github.com/${USERNAME}`;

const STATS = [
  { label: "Public Repos",   value: 38,   suffix: "",  icon: <GitBranch size={16} />, color: "from-cyan-500 to-blue-500"    },
  { label: "Stars Earned",   value: 8,    suffix: "+", icon: <Star size={16} />,      color: "from-yellow-500 to-orange-500" },
  { label: "Followers",      value: 2,    suffix: "",  icon: <Users size={16} />,     color: "from-pink-500 to-rose-500"    },
  { label: "Total Commits",  value: 400,  suffix: "+", icon: <GitCommit size={16} />, color: "from-indigo-500 to-purple-500" },
];

/* Real pinned + top repos */
const REPOS = [
  {
    name: "-KisanMitra",
    desc: "Smart farmer assistant — market prices, produce selling & buyer-farmer connections",
    lang: "TypeScript", stars: 3, forks: 0,
    topic: "AgriTech", pinned: true,
    url: `${GH_URL}/-KisanMitra`,
  },
  {
    name: "AIPE-AI-Powered-Everything",
    desc: "AI-powered everything platform — automation, smart tools & AI integrations",
    lang: "Python", stars: 1, forks: 0,
    topic: "AI/ML", pinned: true,
    url: `${GH_URL}/AIPE-AI-Powered-Everthing`,
  },
  {
    name: "DoctorGuide",
    desc: "Healthcare guidance app — symptom checker and doctor finder",
    lang: "JavaScript", stars: 1, forks: 0,
    topic: "HealthTech", pinned: true,
    url: `${GH_URL}/DoctorGuide`,
  },
  {
    name: "Hospital-App-ReactNative",
    desc: "Cross-platform hospital management app built with React Native",
    lang: "JavaScript", stars: 0, forks: 0,
    topic: "Mobile", pinned: true,
    url: `${GH_URL}/Hospital-App-ReactNative`,
  },
  {
    name: "JobStack",
    desc: "Full-featured job portal — search, apply, track, resume builder & admin panel",
    lang: "JavaScript", stars: 1, forks: 0,
    topic: "SaaS", pinned: true,
    url: `${GH_URL}/JobStack`,
  },
  {
    name: "LIC-agent-website",
    desc: "Enterprise CRM for LIC agents — client management, policies & sales analytics",
    lang: "JavaScript", stars: 1, forks: 0,
    topic: "Enterprise", pinned: true,
    url: `${GH_URL}/LIC-agent-website`,
  },
  {
    name: "SVVV-Notes-Website",
    desc: "Student notes platform with auth, file management & admin controls",
    lang: "JavaScript", stars: 1, forks: 0,
    topic: "Education",
    url: `${GH_URL}/SVVV-Notes-Website-POIJ`,
  },
  {
    name: "json-tree-visualizer",
    desc: "VS Code extension — interactive JSON tree, graph, diff, JSONPath & API client",
    lang: "TypeScript", stars: 1, forks: 0,
    topic: "VS Code",
    url: `${GH_URL}/json-tree-visualizer`,
  },
];

const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python:     "#3572A5",
  HTML:       "#e34c26",
  CSS:        "#1572b6",
};

const TOPIC_COLORS = {
  AgriTech:   "bg-lime-500/15 text-lime-400 border-lime-500/20",
  "AI/ML":    "bg-purple-500/15 text-purple-400 border-purple-500/20",
  HealthTech: "bg-red-500/15 text-red-400 border-red-500/20",
  Mobile:     "bg-blue-500/15 text-blue-400 border-blue-500/20",
  SaaS:       "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  Enterprise: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  Education:  "bg-green-500/15 text-green-400 border-green-500/20",
  "VS Code":  "bg-sky-500/15 text-sky-400 border-sky-500/20",
  Web:        "bg-orange-500/15 text-orange-400 border-orange-500/20",
};

/* LANG DISTRIBUTION — from README top-langs */
const LANG_DIST = [
  { lang: "JavaScript", pct: 62, color: "#f7df1e" },
  { lang: "Python",     pct: 20, color: "#3572A5" },
  { lang: "TypeScript", pct: 12, color: "#3178c6" },
  { lang: "HTML/CSS",   pct: 6,  color: "#e34c26" },
];

function StatCard({ s, i }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.09 }} whileHover={{ scale: 1.05, y: -4 }}
      className="relative p-5 rounded-2xl bg-white/[0.025] border border-white/[0.07] text-center group overflow-hidden cursor-default"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 rounded-2xl`} />
      <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} text-white mb-3 mx-auto shadow-lg`}>
        {s.icon}
      </div>
      <div className={`text-2xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-1`}>
        {inView ? <CountUp end={s.value} duration={1.8} suffix={s.suffix} /> : `0${s.suffix}`}
      </div>
      <div className="text-[11px] text-gray-500">{s.label}</div>
    </motion.div>
  );
}

function RepoCard({ r, i }) {
  return (
    <motion.a href={r.url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.07 }}
      whileHover={{ scale: 1.03, y: -4, borderColor: "rgba(0,200,255,0.25)" }}
      className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer transition-all group block relative overflow-hidden"
    >
      {r.pinned && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
          <span className="text-[8px] text-yellow-400 font-bold">📌 PINNED</span>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2 pr-14">
        <GitBranch size={13} className="text-cyan-400 shrink-0" />
        <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition truncate">
          {r.name}
        </span>
      </div>

      <p className="text-gray-500 text-xs leading-relaxed mb-3">{r.desc}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: LANG_COLORS[r.lang] || "#888" }} />
            <span className="text-[11px] text-gray-500">{r.lang}</span>
          </div>
          {r.topic && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${TOPIC_COLORS[r.topic] || "bg-gray-500/15 text-gray-400 border-gray-500/20"}`}>
              {r.topic}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-600">
          {r.stars > 0 && <span>⭐ {r.stars}</span>}
          <ExternalLink size={11} className="group-hover:text-gray-400 transition" />
        </div>
      </div>
    </motion.a>
  );
}

export default function GithubStats() {
  const { ref: langRef, inView: langView } = useInView({ triggerOnce: true });

  return (
    <SectionWrapper id="github-stats" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle pre="Open Source" main="GitHub" accent="Stats" />
        <SectionSubtitle>38 public repos · building in the open — always learning</SectionSubtitle>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STATS.map((s, i) => <StatCard key={i} s={s} i={i} />)}
        </div>

        {/* CONTRIBUTION GRAPH + LANG CHART */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {/* CONTRIBUTION GRAPH — 2/3 */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="md:col-span-2 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Github size={14} className="text-cyan-400" /> Contribution Graph
              </p>
              <a href={GH_URL} target="_blank" rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:text-cyan-400 flex items-center gap-1 transition">
                @{USERNAME} <ExternalLink size={10} />
              </a>
            </div>

            {/* GitHub stats card from readme */}
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=github_dark&include_all_commits=true&count_private=true&hide_border=true&bg_color=0d1117&title_color=58a6ff&icon_color=58a6ff&text_color=e6edf3`}
              alt="GitHub Stats"
              className="w-full rounded-xl mb-3"
              onError={e => { e.target.style.display = "none"; }}
            />

            {/* Contribution chart */}
            <img
              src={`https://ghchart.rshah.org/06b6d4/${USERNAME}`}
              alt="GitHub Contribution Chart"
              className="w-full rounded-lg opacity-80"
              onError={e => { e.target.style.display = "none"; }}
            />
          </motion.div>

          {/* LANGUAGE DIST — 1/3 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex flex-col"
          >
            <p className="text-sm font-semibold text-gray-300 mb-5 flex items-center gap-2">
              <Activity size={14} className="text-cyan-400" /> Top Languages
            </p>

            {/* DONUT */}
            <div ref={langRef} className="flex items-center justify-center mb-5">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  {(() => {
                    let offset = 0;
                    const circ = 2 * Math.PI * 50;
                    return LANG_DIST.map((l, i) => {
                      const dash = (l.pct / 100) * circ;
                      const gap  = circ - dash;
                      const el = (
                        <motion.circle key={i} cx="60" cy="60" r="50" fill="none"
                          stroke={l.color} strokeWidth="14" strokeLinecap="butt"
                          strokeDasharray={`${dash} ${gap}`}
                          initial={{ strokeDashoffset: circ }}
                          animate={langView ? { strokeDashoffset: 0 } : { strokeDashoffset: circ }}
                          transition={{ duration: 1.2, delay: i * 0.15 }}
                          style={{ strokeDashoffset: -(offset / 100) * circ }}
                        />
                      );
                      offset += l.pct;
                      return el;
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-semibold">JS first</span>
                </div>
              </div>
            </div>

            {/* LEGEND */}
            <div className="space-y-2.5 flex-1">
              {LANG_DIST.map((l, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="flex items-center gap-2 text-gray-400">
                      <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                      {l.lang}
                    </span>
                    <span className="font-semibold" style={{ color: l.color }}>{l.pct}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={langView ? { width: `${l.pct}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: l.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* STREAK CARD */}
            <div className="mt-4">
              <img
                src={`https://streak-stats.demolab.com?user=${USERNAME}&theme=github-dark-blue&hide_border=true&background=0d1117&ring=58a6ff&fire=f78166&currStreakLabel=58a6ff&sideLabels=8b949e&dates=8b949e`}
                alt="GitHub Streak"
                className="w-full rounded-xl"
                onError={e => { e.target.style.display = "none"; }}
              />
            </div>
          </motion.div>
        </div>

        {/* REPOS */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm font-black text-white uppercase tracking-widest">Pinned & Top Repos</span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          <span className="text-[11px] text-gray-600">38 total repos</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {REPOS.map((r, i) => <RepoCard key={i} r={r} i={i} />)}
        </div>

        {/* CTA */}
        <div className="text-center">
          <motion.a href={GH_URL} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(6,182,212,0.2)" }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/25 text-sm text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition"
          >
            <Github size={15} /> View All 38 Repositories →
          </motion.a>
        </div>
      </div>
    </SectionWrapper>
  );
}