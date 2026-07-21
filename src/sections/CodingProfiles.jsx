import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ChevronRight } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const USERNAME = "manish780386";
const GH_URL = `https://github.com/${USERNAME}`;

const GH_STATS = [
  { label: "Public Repos", value: 40 },
  { label: "Stars Earned", value: 8, suffix: "+" },
  { label: "Total Commits", value: 400, suffix: "+" },
];

const PLATFORMS = [
  { name: "LeetCode",    handle: "dangemanish",  solved: 106, note: "Java · MySQL · Python", url: "https://leetcode.com/u/dangemanish/", color: "#f59e0b" },
  { name: "HackerRank",  handle: "dangemanish35", solved: 70,  note: "3★ Python, PS & SQL",   url: "https://www.hackerrank.com/profile/dangemanish35", color: "#22c55e" },
  { name: "CodeChef",    handle: "dange_123",     solved: 37,  note: "Rookie League",          url: "https://www.codechef.com/users/dange_123", color: "#f97316" },
  { name: "GeeksForGeeks", handle: "dangema54zd", solved: 30,  note: "Institute active",        url: "https://www.geeksforgeeks.org/profile/dangema54zd", color: "#16a34a" },
  { name: "Codeforces",  handle: "dangemanish35", solved: 1,   note: "Just getting started",   url: "https://codeforces.com/profile/dangemanish35", color: "#6366f1" },
];

const TOTAL_SOLVED = PLATFORMS.reduce((sum, p) => sum + p.solved, 0);

const REPOS = [
  { name: "-KisanMitra", desc: "Farmer assistant — market prices & buyer connections", lang: "TypeScript", url: `${GH_URL}/-KisanMitra` },
  { name: "JobStack", desc: "Full-featured job portal with resume builder & admin panel", lang: "JavaScript", url: `${GH_URL}/JobStack` },
  { name: "json-tree-visualizer", desc: "VS Code extension — interactive JSON tree & diff view", lang: "TypeScript", url: `${GH_URL}/json-tree-visualizer` },
  { name: "SVVV-Notes-Website", desc: "Student notes platform with auth & file management", lang: "JavaScript", url: `${GH_URL}/SVVV-Notes-Website-POIJ` },
];

const LANG_COLORS = { JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572A5" };

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

export default function CodingProfiles() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <SectionWrapper id="coding" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle index="06" label="DSA & open source" main="Coding" accent="activity" />
        <SectionSubtitle>Where the practice actually happens — GitHub for shipping, five judges for grinding DSA.</SectionSubtitle>

        {/* COMBINED TOTAL */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="mb-10 p-6 rounded-xl border border-[#34d399]/20 bg-white/[0.02] text-center"
        >
          <p className="text-[#7c8aa0] text-xs font-mono-label uppercase tracking-widest mb-2">Problems solved across all platforms</p>
          <div className="text-5xl font-bold text-white font-mono-label">
            {inView ? <CountUp end={TOTAL_SOLVED} duration={1.8} suffix="+" /> : "0+"}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-4 mb-10">
          {PLATFORMS.map((p, i) => (
            <motion.a
              key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }} whileHover={{ y: -4 }}
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

        {/* GITHUB */}
        <div className="grid md:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="md:col-span-1 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col"
          >
            <div className="flex items-center gap-2 mb-5">
              <Github size={15} className="text-[#34d399]" />
              <span className="text-sm font-semibold text-white">GitHub</span>
              <a href={GH_URL} target="_blank" rel="noopener noreferrer" className="ml-auto text-[#4b5768] hover:text-[#34d399] transition">
                <ExternalLink size={12} />
              </a>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {GH_STATS.map((s) => <StatBlock key={s.label} {...s} />)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="md:col-span-2 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
          >
            <p className="text-sm font-semibold text-white mb-4">Pinned repositories</p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {REPOS.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[r.lang] || "#888" }} />
                    <span className="text-xs font-semibold text-white group-hover:text-[#34d399] transition truncate">{r.name}</span>
                  </div>
                  <p className="text-[10px] text-[#7c8aa0] leading-relaxed">{r.desc}</p>
                </a>
              ))}
            </div>
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