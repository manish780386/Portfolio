import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Code2,
  Terminal,
  ShieldCheck,
  Cpu,
  Rocket,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import { useInView } from "react-intersection-observer";

/* ── Terminal Readout Data ── */
const READOUT_LINES = [
  { key: "role", value: '"Full-Stack Developer"' },
  { key: "focus", value: '"Cyber Security & Secure Code"' },
  { key: "stack", value: '["React", "Django", "PostgreSQL", "Tailwind"]' },
  { key: "building", value: '"AI Apps & Open-Source Tools"' },
  { key: "status", value: '"available_for_internships"' },
];

function TerminalReadout() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || shown >= READOUT_LINES.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 200);
    return () => clearTimeout(t);
  }, [inView, shown]);

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden border border-white/10 bg-[#070b14] shadow-2xl backdrop-blur-xl relative group"
    >
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-400">
          <Terminal size={12} className="text-cyan-400" />
          <span>whoami.json</span>
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-xs sm:text-[13px] leading-relaxed">
        <p className="text-gray-500 mb-2 flex items-center gap-2">
          <span className="text-cyan-400">$</span> whoami --verbose
        </p>
        <p className="text-gray-300">{"{"}</p>

        {READOUT_LINES.map((line, i) => (
          <motion.p
            key={line.key}
            initial={{ opacity: 0, x: -10 }}
            animate={shown > i ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="pl-5 my-1 flex flex-wrap items-center gap-1"
          >
            <span className="text-sky-400 font-semibold">"{line.key}"</span>
            <span className="text-gray-500">:</span>
            <span className="text-emerald-400">{line.value}</span>
            {i < READOUT_LINES.length - 1 && <span className="text-gray-400">,</span>}
          </motion.p>
        ))}

        <p className="text-gray-300 mt-1">
          {"}"}
          {shown >= READOUT_LINES.length && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-emerald-400 ml-1.5 align-middle shadow-[0_0_8px_#34d399]"
            />
          )}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const HIGHLIGHTS = [
    {
      icon: Cpu,
      title: "Full-Stack Dev",
      desc: "React, Django REST & PostgreSQL",
      color: "#38bdf8",
    },
    {
      icon: ShieldCheck,
      title: "Security First",
      desc: "JWT, HMAC, OWASP standards",
      color: "#34d399",
    },
    {
      icon: Rocket,
      title: "Shipped Products",
      desc: "VS Code Extensions & PyPI Package",
      color: "#a78bfa",
    },
  ];

  return (
    <SectionWrapper id="about" className="py-24 relative overflow-hidden">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle label="Who am I" main="About" accent="me" />
        <SectionSubtitle>
          A quick overview before you explore the work and achievements below.
        </SectionSubtitle>

        <div className="grid lg:grid-cols-12 gap-10 items-start mt-8">
          {/* ── LEFT PROFILE CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 relative overflow-hidden group shadow-xl">
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500" />

              {/* Name & Title */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-extrabold text-2xl tracking-tight">
                    Manish Dange
                  </h3>
                  <Sparkles size={18} className="text-cyan-400 animate-pulse" />
                </div>
                <p className="text-xs text-cyan-400 font-mono mt-1">
                  CS Undergraduate & Developer
                </p>
              </div>

              <div className="h-px bg-white/10 my-4" />

              {/* Contact Information */}
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "Indore, Madhya Pradesh, India" },
                  { icon: Mail, text: "dangemanish35@gmail.com", href: "mailto:dangemanish35@gmail.com" },
                  { icon: Phone, text: "+91 7803861195", href: "tel:+917803861195" },
                ].map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-xs text-gray-300">
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-cyan-400 shrink-0">
                        <Icon size={14} />
                      </div>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="hover:text-cyan-300 transition-colors truncate"
                        >
                          {c.text}
                        </a>
                      ) : (
                        <span className="truncate">{c.text}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="h-px bg-white/10 my-5" />

              {/* Social Links Buttons */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  {
                    icon: Github,
                    label: "GitHub",
                    url: "https://github.com/manish780386",
                    color: "#e2e8f0",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    url: "https://linkedin.com/in/manish-dange-2a03b6312",
                    color: "#38bdf8",
                  },
                  {
                    icon: Code2,
                    label: "LeetCode",
                    url: "https://leetcode.com/u/dangemanish/",
                    color: "#fbbf24",
                  },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl text-[11px] font-medium transition-all group/btn"
                      style={{
                        background: `${s.color}10`,
                        border: `1px solid ${s.color}25`,
                        color: s.color,
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <Icon size={14} />
                        <ArrowUpRight
                          size={10}
                          className="opacity-0 group-hover/btn:opacity-100 transition-opacity"
                        />
                      </div>
                      <span>{s.label}</span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Availability Badge */}
              <div className="mt-5 flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold tracking-wide">
                  Available for Internships
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT BIO & CONTENT ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Written Story */}
            <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
              <p>
                I am a{" "}
                <span className="text-cyan-400 font-semibold underline decoration-cyan-500/30 underline-offset-4">
                  Computer Science undergraduate
                </span>{" "}
                at Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore, specializing in Information & Cyber Security.
                I design and ship production-grade web applications end-to-end — from responsive, pixel-precise React interfaces to secure Django REST backends powered by PostgreSQL.
              </p>

              <p className="text-gray-400 text-sm">
                My work spans a wide range of domains: an AI-powered travel planner that generates day-by-day itineraries, a hyperlocal community platform with real-time WebSocket messaging, a cultural heritage food marketplace with bilingual voice search, and a career acceleration platform powered by OpenAI.
              </p>

              <p className="text-gray-400 text-sm">
                Security is built into my architecture from day one. Token rotation, HMAC-verified payment callbacks, OWASP-aware input validation, and role-based access control are standard in every codebase I build.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid sm:grid-cols-3 gap-3">
              {HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-colors"
                  >
                    <Icon size={18} style={{ color: item.color }} className="mb-2" />
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Interactive Terminal Readout */}
            <TerminalReadout />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}