import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ChevronRight, Trophy, Wifi, WifiOff } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useLiveCodingStats } from "../hooks/useLiveCodingStats.js";

const GH_URL = "https://github.com/manish780386";
const LC_URL = "https://leetcode.com/u/dangemanish/";
const CF_URL = "https://codeforces.com/profile/dangemanish35";

// No public/CORS-friendly API exists for these three — see useLiveCodingStats.js
// for why. Update these numbers occasionally, or wire up a small serverless
// proxy later if you want them live too.
const STATIC_PLATFORMS = [
  { name: "HackerRank", handle: "dangemanish35", solved: 70, note: "3★ Python, PS & SQL", url: "https://www.hackerrank.com/profile/dangemanish35", color: "#22c55e" },
  { name: "CodeChef", handle: "dange_123", solved: 37, note: "Rookie League", url: "https://www.codechef.com/users/dange_123", color: "#f97316" },
  { name: "GeeksforGeeks", handle: "dangema54zd", solved: 30, note: "Institute active", url: "https://www.geeksforgeeks.org/profile/dangema54zd", color: "#16a34a" },
];

const LANG_COLORS = { JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572A5", HTML: "#e34c26", CSS: "#1572b6" };

function LiveDot({ live }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[9px] font-mono-label uppercase ${live ? "text-[#34d399]" : "text-[#4b5768]"}`}>
      {live ? <Wifi size={9} /> : <WifiOff size={9} />}
      {live ? "Live" : "Cached"}
    </span>
  );
}

function StatBlock({ label, value, suffix = "" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-bold text-white font-mono-label">
        {inView ? <CountUp end={value} duration={1.6} suffix={suffix} /> : `0${suffix}`}
      </div>
      <div className="text-[10px] text-[#7c8aa0] mt-1">{label}</div>
    </div>
  );
}

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-white/[0.06] rounded-md ${className}`} />;
}

export default function CodingProfiles() {
  const { loading, github, leetcode, codeforces } = useLiveCodingStats();

  const totalSolved =
    (leetcode?.totalSolved || 0) +
    (codeforces?.solved || 0) +
    STATIC_PLATFORMS.reduce((s, p) => s + p.solved, 0);

  return (
    <SectionWrapper id="coding" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle index="06" label="DSA & open source" main="Coding" accent="activity" />
        <SectionSubtitle>
          GitHub, LeetCode and Codeforces numbers here are fetched live on page load — not typed in by hand.
        </SectionSubtitle>

        {/* COMBINED TOTAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="mb-10 p-6 rounded-xl border border-[#34d399]/20 bg-white/[0.02] text-center"
        >
          <p className="text-[#7c8aa0] text-xs font-mono-label uppercase tracking-widest mb-2">Problems solved across all platforms</p>
          {loading ? (
            <Skeleton className="h-12 w-40 mx-auto" />
          ) : (
            <div className="text-5xl font-bold text-white font-mono-label">
              <CountUp end={totalSolved} duration={1.8} suffix="+" />
            </div>
          )}
        </motion.div>

        {/* PLATFORM GRID */}
        <div className="grid lg:grid-cols-5 gap-4 mb-10">
          {/* LEETCODE — LIVE */}
          <motion.a
            href={LC_URL} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white">LeetCode</span>
              {loading ? <Skeleton className="h-3 w-10" /> : <LiveDot live={leetcode.live} />}
            </div>
            {loading ? (
              <Skeleton className="h-8 w-14 mb-2" />
            ) : (
              <div className="text-2xl font-bold font-mono-label mb-1" style={{ color: "#f59e0b" }}>{leetcode.totalSolved}</div>
            )}
            <p className="text-[10px] text-[#7c8aa0]">
              {loading ? "Loading…" : `${leetcode.acceptanceRate}% acceptance · rank #${leetcode.ranking}`}
            </p>
          </motion.a>

          {/* CODEFORCES — LIVE */}
          <motion.a
            href={CF_URL} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.05 }} whileHover={{ y: -4 }}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white">Codeforces</span>
              {loading ? <Skeleton className="h-3 w-10" /> : <LiveDot live={codeforces.live} />}
            </div>
            {loading ? (
              <Skeleton className="h-8 w-14 mb-2" />
            ) : (
              <div className="text-2xl font-bold font-mono-label mb-1" style={{ color: "#6366f1" }}>{codeforces.solved}</div>
            )}
            <p className="text-[10px] text-[#7c8aa0]">
              {loading ? "Loading…" : codeforces.rating ? `Rating ${codeforces.rating} · ${codeforces.maxRank}` : "Unrated · just started"}
            </p>
          </motion.a>

          {/* STATIC PLATFORMS */}
          {STATIC_PLATFORMS.map((p, i) => (
            <motion.a
              key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }} whileHover={{ y: -4 }}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white">{p.name}</span>
                <ExternalLink size={11} className="text-[#4b5768] group-hover:text-[#34d399] transition" />
              </div>
              <div className="text-2xl font-bold font-mono-label mb-1" style={{ color: p.color }}>{p.solved}</div>
              <p className="text-[10px] text-[#7c8aa0]">{p.note}</p>
            </motion.a>
          ))}
        </div>

        {/* LEETCODE BREAKDOWN */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-10 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={14} className="text-[#f5b942]" />
            <p className="text-sm font-semibold text-white">LeetCode difficulty split</p>
            {!loading && <LiveDot live={leetcode.live} />}
          </div>
          {loading ? (
            <div className="flex gap-3"><Skeleton className="h-16 flex-1" /><Skeleton className="h-16 flex-1" /><Skeleton className="h-16 flex-1" /></div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Easy", val: leetcode.easySolved, color: "#34d399" },
                { label: "Medium", val: leetcode.mediumSolved, color: "#f5b942" },
                { label: "Hard", val: leetcode.hardSolved, color: "#f2545b" },
              ].map((d) => (
                <div key={d.label} className="text-center p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-xl font-bold font-mono-label" style={{ color: d.color }}>{d.val}</div>
                  <div className="text-[10px] text-[#7c8aa0] mt-0.5">{d.label}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* GITHUB */}
        <div className="grid md:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="md:col-span-1 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col"
          >
            <div className="flex items-center gap-2 mb-5">
              <Github size={15} className="text-[#34d399]" />
              <span className="text-sm font-semibold text-white">GitHub</span>
              {!loading && <span className="ml-1"><LiveDot live={github.live} /></span>}
              <a href={GH_URL} target="_blank" rel="noopener noreferrer" className="ml-auto text-[#4b5768] hover:text-[#34d399] transition">
                <ExternalLink size={12} />
              </a>
            </div>
            {loading ? (
              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="h-12" /><Skeleton className="h-12" /><Skeleton className="h-12" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <StatBlock label="Public Repos" value={github.publicRepos} />
                <StatBlock label="Stars Earned" value={github.totalStars} suffix="+" />
                <StatBlock label="Followers" value={github.followers} />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="md:col-span-2 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
          >
            <p className="text-sm font-semibold text-white mb-4">Recently active repositories</p>
            {loading ? (
              <div className="grid sm:grid-cols-2 gap-2.5">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-2.5">
                {github.topRepos.map((r) => (
                  <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition group">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: LANG_COLORS[r.lang] || "#888" }} />
                      <span className="text-xs font-semibold text-white group-hover:text-[#34d399] transition truncate">{r.name}</span>
                      {r.stars > 0 && <span className="text-[10px] text-[#4b5768] ml-auto shrink-0">★ {r.stars}</span>}
                    </div>
                    <p className="text-[10px] text-[#7c8aa0] leading-relaxed line-clamp-2">{r.desc}</p>
                  </a>
                ))}
              </div>
            )}
            <a href={`${GH_URL}?tab=repositories`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-[#7c8aa0] hover:text-[#34d399] transition mt-4">
              View all repositories <ChevronRight size={12} />
            </a>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}