import React from "react";
import { motion } from "framer-motion";
import { GitBranch, GitCommit, Star, Activity, ExternalLink, Github } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

const USERNAME = "manish780386";

const STAT_CARDS = [
  { label: "Public Repos", value: "15+", icon: <GitBranch size={18} />, color: "from-cyan-500 to-blue-500" },
  { label: "Total Commits", value: "200+", icon: <GitCommit size={18} />, color: "from-indigo-500 to-purple-500" },
  { label: "Stars Earned", value: "13+", icon: <Star size={18} />, color: "from-yellow-500 to-orange-500" },
  { label: "Total Active Days", value: "90+", icon: <Activity size={18} />, color: "from-green-500 to-teal-500" },
];

const REPOS = [
  { name: "SVVV-Notes-Website", lang: "JavaScript", stars: 2, desc: "Student notes platform with auth", topic: "Education" },
  { name: "JobStack", lang: "Python", stars: 1, desc: "Full-featured job portal with admin", topic: "SaaS" },
  { name: "KisanMitra", lang: "TypeScript", stars: 3, desc: "Smart farmer assistant platform", topic: "AgriTech" },
  { name: "Velvet-Brew-Cafe", lang: "JavaScript", stars: 1, desc: "Café website with ordering & admin", topic: "Web" },
  { name: "E-Commerce-Platform", lang: "Python", stars: 2, desc: "Full-stack shopping platform", topic: "E-Commerce" },
  { name: "Portfolio", lang: "JavaScript", stars: 4, desc: "Personal animated portfolio", topic: "Design" },
];

const LANG_COLORS = {
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
};

const TOPIC_COLORS = {
  Education: "bg-blue-500/15 text-blue-400",
  SaaS: "bg-purple-500/15 text-purple-400",
  AgriTech: "bg-green-500/15 text-green-400",
  Web: "bg-cyan-500/15 text-cyan-400",
  "E-Commerce": "bg-orange-500/15 text-orange-400",
  Design: "bg-pink-500/15 text-pink-400",
};

export default function GithubStats() {
  return (
    <SectionWrapper id="github-stats" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle pre="Open Source" main="GitHub" accent="Stats" />
        <SectionSubtitle>Code is my playground — open source, always learning</SectionSubtitle>

        {/* TOP STAT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STAT_CARDS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center group cursor-default relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 rounded-2xl`} />
              <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} text-white mb-3 mx-auto`}>
                {s.icon}
              </div>
              <div className="text-2xl font-extrabold text-white mb-1">{s.value}</div>
              <div className="text-[11px] text-gray-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* GITHUB CONTRIBUTION GRAPH */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Github size={15} className="text-cyan-400" /> Contribution Graph
            </p>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              className="text-xs text-gray-500 hover:text-cyan-400 flex items-center gap-1 transition"
            >
              View Profile <ExternalLink size={11} />
            </a>
          </div>
          <img
            src={`https://ghchart.rshah.org/06b6d4/${USERNAME}`}
            alt="GitHub Chart"
            className="w-full rounded-lg opacity-80"
            onError={(e) => {
              e.target.style.display = "none";
              document.getElementById("chart-fallback").style.display = "flex";
            }}
          />
          <div id="chart-fallback" className="hidden items-center justify-center py-6 text-gray-600 text-sm">
            Open{" "}
            <a href={`https://github.com/${USERNAME}`} target="_blank" className="text-cyan-400 mx-1 hover:underline">
              github.com/{USERNAME}
            </a>{" "}
            to see contributions
          </div>
        </motion.div>

        {/* REPO CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPOS.map((r, i) => (
            <motion.a
              key={i}
              href={`https://github.com/${USERNAME}/${r.name}`}
              target="_blank"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09 }}
              whileHover={{ scale: 1.03, borderColor: "rgba(0,200,255,0.2)" }}
              className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer transition-all group block"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <GitBranch size={14} className="text-cyan-400" />
                  <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition truncate">
                    {r.name}
                  </span>
                </div>
                <ExternalLink size={13} className="text-gray-700 group-hover:text-gray-400 transition shrink-0" />
              </div>
              <p className="text-gray-500 text-xs mb-3 leading-relaxed">{r.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: LANG_COLORS[r.lang] || "#888" }}
                    />
                    <span className="text-[11px] text-gray-500">{r.lang}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${TOPIC_COLORS[r.topic] || "bg-gray-500/15 text-gray-400"}`}>
                    {r.topic}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  ⭐ {r.stars}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-8">
          <motion.a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-sm text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition"
          >
            <Github size={15} /> View All Repositories →
          </motion.a>
        </div>
      </div>
    </SectionWrapper>
  );
}