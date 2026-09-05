import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Github, Linkedin, Code2, ExternalLink } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import { useInView } from "react-intersection-observer";

/* ── Terminal readout ── */
const READOUT_LINES = [
  { key: "role",                value: '"Full-Stack Developer"' },
  { key: "focus",               value: '"Cyber Security"' },
  { key: "stack",               value: '["React", "Django", "PostgreSQL"]' },
  { key: "currently_building",  value: '"AI-powered projects"' },
  { key: "status",              value: '"open_to_work"' },
];

function TerminalReadout() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || shown >= READOUT_LINES.length) return;
    const t = setTimeout(() => setShown(s => s + 1), 220);
    return () => clearTimeout(t);
  }, [inView, shown]);

  return (
    <div ref={ref} className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0f17]">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f2545b]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#f5b942]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]/70" />
        <span className="ml-3 font-mono-label text-[10px] text-[#4b5768]">whoami.json</span>
      </div>
      <div className="p-5 font-mono text-[12.5px] leading-[1.9]">
        <p className="text-[#4b5768]">$ whoami --verbose</p>
        <p className="text-[#c7d0dc]">{"{"}</p>
        {READOUT_LINES.map((line, i) => (
          <motion.p key={line.key}
            initial={{ opacity: 0, x: -8 }}
            animate={shown > i ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="pl-4"
          >
            <span className="text-[#60a5fa]">"{line.key}"</span>
            <span className="text-[#4b5768]">: </span>
            <span className="text-[#34d399]">{line.value}</span>
            {i < READOUT_LINES.length - 1 && <span className="text-[#c7d0dc]">,</span>}
          </motion.p>
        ))}
        <p className="text-[#c7d0dc]">
          {"}"}
          {shown >= READOUT_LINES.length && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
              className="inline-block w-2 h-3.5 bg-[#34d399] ml-1 align-middle"
            />
          )}
        </p>
      </div>
    </div>
  );
}


export default function About() {
  return (
    <SectionWrapper id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle index="01" label="Who am I" main="About" accent="me" />
        <SectionSubtitle>A quick read before you check the receipts below.</SectionSubtitle>

        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-5"
          >
            {/* Info card */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02]">

              {/* Top gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500" />

              <div className="p-5 space-y-4">
                {/* Name */}
                <div>
                  <h3 className="text-white font-black text-xl">Manish Dange</h3>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06]" />

                {/* Contact info */}
                <div className="space-y-2.5">
                  {[
                    { icon: <MapPin size={12} />, text: "Indore, Madhya Pradesh, India" },
                    { icon: <Mail size={12} />,   text: "dangemanish35@gmail.com" },
                    { icon: <Phone size={12} />,  text: "+91 7803861195" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-gray-400 text-xs">
                      <span className="text-cyan-400 shrink-0">{c.icon}</span>
                      {c.text}
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06]" />

                {/* Social links */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: <Github size={13} />,   label: "GitHub",   url: "https://github.com/manish780386",                color: "#e2e8f0" },
                    { icon: <Linkedin size={13} />, label: "LinkedIn", url: "https://linkedin.com/in/manish-dange-2a03b6312", color: "#0A66C2" },
                    { icon: <Code2 size={13} />,    label: "LeetCode", url: "https://leetcode.com/u/dangemanish/",            color: "#FFA116" },
                  ].map((s, i) => (
                    <motion.a key={i}
                      href={s.url} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-[10px] font-semibold transition-all"
                      style={{ background: `${s.color}10`, border: `1px solid ${s.color}25`, color: s.color }}
                    >
                      {s.icon}
                      {s.label}
                    </motion.a>
                  ))}
                </div>

                {/* Availability badge */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/8 border border-green-500/20">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  <span className="text-green-400 text-[11px] font-semibold">Available for internships</span>
                </div>
              </div>
            </div>


          </motion.div>

          {/* ── RIGHT ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 space-y-6"
          >
            <div className="space-y-5">
              <p className="text-gray-200 leading-8 text-[15px]">
                I am a <span className="text-cyan-400 font-semibold">Computer Science undergraduate</span> at
                Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore, specializing in Information &amp; Cyber
                Security. I design and ship production-grade web applications end-to-end — from
                pixel-precise React interfaces to secure, scalable Django REST back-ends backed by
                PostgreSQL.
              </p>

              <p className="text-gray-500 leading-7 text-sm">
                My work spans a range of domains: an AI-powered travel planner that generates
                day-by-day itineraries from plain-language prompts, a hyperlocal community platform with
                real-time WebSocket messaging, a cultural heritage food marketplace with bilingual voice
                search, and a career acceleration platform built on OpenAI. Each project is deployed,
                not just committed.
              </p>

              <p className="text-gray-500 leading-7 text-sm">
                Security is not a layer I add at the end — it is part of how I architect from day one.
                JWT token rotation, HMAC-verified payment callbacks, OWASP-aware input handling, and
                role-based access control are standard in every codebase I own. I have also published
                two VS Code extensions on the Marketplace and an open-source scaffolding library on PyPI
                used to bootstrap Django projects in a single command.
              </p>
            </div>

            {/* Terminal */}
            <TerminalReadout />
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}