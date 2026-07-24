import { useEffect, useState } from "react";

const GH_USER   = "manish780386";
const LC_USER   = "dangemanish";
const CF_HANDLE = "dangemanish35";

/* ══════════════════════════════════════════════
   FALLBACK DATA — used when API fails / loading
══════════════════════════════════════════════ */
const FALLBACK = {
  github: {
    publicRepos: 40,
    followers:   2,
    totalStars:  8,
    topRepos: [
      { name: "-KisanMitra",               desc: "Smart farmer assistant — market prices, produce selling & buyer-farmer connections", lang: "TypeScript", stars: 3, url: "https://github.com/manish780386/-KisanMitra" },
      { name: "AIPE-AI-Powered-Everthing", desc: "AI-powered platform — automation, smart tools & integrations",                    lang: "Python",     stars: 1, url: "https://github.com/manish780386/AIPE-AI-Powered-Everthing" },
      { name: "DoctorGuide",               desc: "Healthcare guidance app — symptom checker and doctor finder",                      lang: "JavaScript", stars: 1, url: "https://github.com/manish780386/DoctorGuide" },
      { name: "JobStack",                  desc: "Full-featured job portal — search, apply, track, resume builder & admin panel",   lang: "JavaScript", stars: 1, url: "https://github.com/manish780386/JobStack" },
      { name: "LIC-agent-website",         desc: "Enterprise CRM for LIC agents — client management, policies & analytics",        lang: "JavaScript", stars: 1, url: "https://github.com/manish780386/LIC-agent-website" },
      { name: "json-tree-visualizer",      desc: "VS Code extension — JSON tree, graph, diff, JSONPath & API client",              lang: "TypeScript", stars: 1, url: "https://github.com/manish780386/json-tree-visualizer" },
    ],
  },
  leetcode: {
    totalSolved:    106,
    easySolved:     43,
    mediumSolved:   15,
    hardSolved:     1,
    ranking:        "1,500,377",
    acceptanceRate: "56.8",
  },
  codeforces: {
    /* ── UPDATE THIS when you solve more problems ── */
    solved:  8,          // ← your real count
    rating:  null,
    maxRank: "Unrated",
  },
};

/* ══════════════════════════════════════════════
   GITHUB FETCH  (GitHub REST API — CORS OK)
══════════════════════════════════════════════ */
async function fetchGithub() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GH_USER}`),
      fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`),
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error("github failed");
    const user  = await userRes.json();
    const repos = await reposRes.json();
    const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    const topRepos   = repos
      .filter(r => !r.fork)
      .sort((a, b) =>
        (b.stargazers_count - a.stargazers_count) ||
        (new Date(b.pushed_at) - new Date(a.pushed_at))
      )
      .slice(0, 6)
      .map(r => ({
        name:  r.name,
        desc:  r.description || "No description provided.",
        lang:  r.language || "—",
        stars: r.stargazers_count,
        url:   r.html_url,
      }));
    return { publicRepos: user.public_repos, followers: user.followers, totalStars, topRepos, live: true };
  } catch {
    return { ...FALLBACK.github, live: false };
  }
}

/* ══════════════════════════════════════════════
   LEETCODE FETCH  (third-party proxy — CORS OK)
══════════════════════════════════════════════ */
async function fetchLeetCode() {
  try {
    const res = await fetch(`https://leetcode-stats.tashif.codes/${LC_USER}`);
    if (!res.ok) throw new Error("lc failed");
    const j = await res.json();
    if (j.status !== "success") throw new Error("lc status");
    return {
      totalSolved:    j.totalSolved,
      easySolved:     j.easySolved,
      mediumSolved:   j.mediumSolved,
      hardSolved:     j.hardSolved,
      ranking:        typeof j.ranking === "number" ? j.ranking.toLocaleString() : j.ranking,
      acceptanceRate: typeof j.acceptanceRate === "number" ? j.acceptanceRate.toFixed(1) : j.acceptanceRate,
      live: true,
    };
  } catch {
    return { ...FALLBACK.leetcode, live: false };
  }
}

/* ══════════════════════════════════════════════
   CODEFORCES FETCH

   WHY TWO API CALLS:
   ──────────────────
   • user.info  → gives rating, maxRank, handle info
                  BUT does NOT give solved count

   • user.status → gives ALL submissions (verdict + problem)
                   We filter verdict === "OK" and deduplicate
                   by contestId+index to get UNIQUE solved count

   Codeforces allows CORS from browsers, so this works client-side.
══════════════════════════════════════════════ */
async function fetchCodeforces() {
  try {
    // 1️⃣  Fetch user info (rating, rank)
    const infoRes = await fetch(
      `https://codeforces.com/api/user.info?handles=${CF_HANDLE}`
    );
    if (!infoRes.ok) throw new Error("cf info failed");
    const infoJson = await infoRes.json();
    if (infoJson.status !== "OK") throw new Error("cf info status");
    const user = infoJson.result[0];

    // 2️⃣  Fetch all submissions to count unique accepted problems
    //      count=500 is safe — you have ~8 solved, well within limit
    const statusRes = await fetch(
      `https://codeforces.com/api/user.status?handle=${CF_HANDLE}&from=1&count=500`
    );
    if (!statusRes.ok) throw new Error("cf status failed");
    const statusJson = await statusRes.json();
    if (statusJson.status !== "OK") throw new Error("cf status status");

    // Deduplicate: one unique problem = one solve
    const acceptedProblems = new Set();
    statusJson.result.forEach(submission => {
      if (submission.verdict === "OK") {
        const problemId = `${submission.problem.contestId ?? "gym"}-${submission.problem.index}`;
        acceptedProblems.add(problemId);
      }
    });

    return {
      solved:  acceptedProblems.size,   // ← real unique count
      rating:  user.rating   ?? null,
      maxRank: user.maxRank  || "Unrated",
      live:    true,
    };
  } catch {
    // Fallback to hardcoded value if API fails
    return { ...FALLBACK.codeforces, live: false };
  }
}

/* ══════════════════════════════════════════════
   HOOK EXPORT
══════════════════════════════════════════════ */
export function useLiveCodingStats() {
  const [state, setState] = useState({
    loading:    true,
    github:     null,
    leetcode:   null,
    codeforces: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [github, leetcode, codeforces] = await Promise.all([
        fetchGithub(),
        fetchLeetCode(),
        fetchCodeforces(),
      ]);
      if (!cancelled) setState({ loading: false, github, leetcode, codeforces });
    })();
    return () => { cancelled = true; };
  }, []);

  return state;
}