import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, Webhook, Smartphone, Coffee, FlaskConical, Radio, Brain,
  Flame, Waypoints, Eye, Smile, Code2, Send, Server, Boxes, Workflow, PlayCircle,
} from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

/* Shared "shield/badge" outline used by HTML5 + CSS3 — this trapezoid-with-
   a-point silhouette is the actual shape both real logos use. */
const BADGE_PATH = "M4 2 L20 2 L18.5 20.2 L12 22.5 L5.5 20.2 Z";

/* Real brand marks where a proper flat logo exists; lucide icons (tinted to
   the brand color via currentColor) fill in for tools without a simple
   single-color mark. Every entry carries a `glow` used for the hover glow
   behind the icon and to tint lucide icons. */
const META = {
  Python: { glow: "#3776AB", icon: <svg viewBox="0 0 24 24"><path fill="#3776AB" d="M11.97 2c-1.2.01-2.34.1-3.35.28C6.27 2.66 6 3.64 6 4.95v1.8h6.19v.6H4.19c-1.28 0-2.4.77-2.75 2.24-.41 1.68-.43 2.73 0 4.49.32 1.31 1.08 2.24 2.36 2.24H5.2v-2.15c0-1.45 1.26-2.73 2.76-2.73h6.17c1.23 0 2.2-1.01 2.2-2.24V4.95c0-1.2-.98-2.09-2.2-2.28-.77-.11-1.97-.17-2.16-.17z" /><path fill="#FFD43B" d="M17.61 7.35v2.09c0 1.51-1.28 2.77-2.76 2.77H8.67c-1.21 0-2.2 1.04-2.2 2.24v4.2c0 1.19 1.04 1.89 2.2 2.23 1.39.41 2.73.48 4.4 0 1.1-.31 2.2-1 2.2-2.23V17h-6.2v-.6h8.87c1.28 0 1.76-.89 2.2-2.24.46-1.39.44-2.73 0-4.49-.31-1.28-1.07-2.24-2.35-2.24h-.18v-.08z" /></svg> },
  Java: { glow: "#f89820", icon: <Coffee size={19} /> },
  JavaScript: { glow: "#F7DF1E", icon: <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#F7DF1E" /><path d="M6 17.7c.4.6 1.1 1.1 2.2 1.1 1.2 0 2-.6 2-1.5 0-.9-.5-1.4-1.7-1.9l-.6-.2c-1.7-.7-2.8-1.6-2.8-3.5 0-1.8 1.3-3.1 3.4-3.1 1.5 0 2.6.5 3.3 1.8l-1.8 1.2c-.4-.7-.8-1-1.5-1s-1.2.5-1.2 1.1c0 .8.5 1.1 1.6 1.6l.6.2c2 .9 3.1 1.7 3.1 3.6 0 2.1-1.6 3.3-3.8 3.3-2.1 0-3.5-1-4.2-2.4L6 17.7zm8.3.3c.5.8 1 1.4 2.1 1.4 1.1 0 1.7-.5 1.7-2.4v-7.9H20v8c0 3.1-1.8 4.5-4.4 4.5-2.4 0-3.8-1.3-4.5-2.8l2.2-1.3z" /></svg> },
  TypeScript: { glow: "#3178C6", icon: <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#3178C6" /><path fill="#fff" d="M13.3 15.3v1.7c.5.3 1.3.5 2.2.5 1.6 0 2.7-.8 2.7-2.2 0-1.1-.6-1.7-1.9-2.2l-.6-.2c-.7-.3-1-.5-1-1 0-.4.3-.7.9-.7.6 0 1 .3 1.3.8l1.5-1c-.6-1-1.4-1.4-2.8-1.4-1.7 0-2.9 1.1-2.9 2.6 0 1.2.6 2 2 2.4l.6.2c.8.3 1.1.5 1.1 1 0 .4-.4.7-1.1.7-.8 0-1.3-.4-1.7-1zM9.5 11.2H12v-1.7H5v1.7h2.5V19h2v-7.8z" /></svg> },
  "Node.js": { glow: "#339933", icon: <svg viewBox="0 0 24 24" fill="#339933"><path d="M12 .02c-.17 0-.34.05-.5.13L2.55 5.5c-.31.18-.5.51-.5.87v10.3c0 .36.19.69.5.87l9 5.35c.15.08.32.13.5.13s.34-.05.5-.13l8.95-5.35c.31-.18.5-.51.5-.87V6.36c0-.36-.19-.68-.5-.87L12.5.15A1 1 0 0 0 12 .02zm-.05 3.54 8.62 4.87v9.74l-8.62 4.87-8.6-4.87V8.43l8.6-4.87zm-.05 3.6a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5zm0 1.5A4.25 4.25 0 1 1 7.7 12.9a4.25 4.25 0 0 1 4.2-4.23z" /></svg> },
  HTML: { glow: "#E44D26", icon: <svg viewBox="0 0 24 24"><path fill="#E44D26" d={BADGE_PATH} /><path fill="#F16529" d="M12 2v20.5l6.5-1.8L20 2z" /></svg> },
  CSS: { glow: "#264DE4", icon: <svg viewBox="0 0 24 24"><path fill="#264DE4" d={BADGE_PATH} /><path fill="#2965F1" d="M12 2v20.5l6.5-1.8L20 2z" /></svg> },
  "Tailwind CSS": { glow: "#06B6D4", icon: <svg viewBox="0 0 24 24" fill="#06B6D4"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zM7 11c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 15.85 9.5 17 12 17c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 12.15 9.5 11 7 11z" /></svg> },
  React: { glow: "#61DAFB", icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.05" fill="#61DAFB" /><g stroke="#61DAFB" strokeWidth="1"><ellipse cx="12" cy="12" rx="10" ry="4.2" /><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" /></g></svg> },
  "React Native": { glow: "#61DAFB", icon: <Smartphone size={19} /> },
  Django: { glow: "#44B78B", icon: <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#092E20" /><path fill="#44B78B" d="M11.5 3h2.1v10.6c-1.1.2-1.9.3-2.8.3-2.6 0-4-1.2-4-3.4 0-2.1 1.5-3.5 3.8-3.5.4 0 .6 0 .9.1V3zm0 6.1c-.2-.1-.4-.1-.7-.1-1.1 0-1.8.7-1.8 1.8 0 1.1.6 1.7 1.7 1.7.3 0 .5 0 .8-.1V9.1z" /></svg> },
  "REST APIs": { glow: "#f97316", icon: <Webhook size={19} /> },
  DRF: { glow: "#a30000", icon: <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#a30000" /><path fill="#fff" d="M8 6h5.2c2.5 0 4.1 1.4 4.1 3.6 0 1.6-.9 2.8-2.3 3.3l2.6 5.1h-2.4l-2.3-4.7H10v4.7H8V6zm2 2v3.6h2.9c1.3 0 2.2-.7 2.2-1.8 0-1.1-.9-1.8-2.2-1.8H10z" /></svg> },
  Flask: { glow: "#c7d0dc", icon: <FlaskConical size={19} /> },
  "Web Sockets": { glow: "#10b981", icon: <Radio size={19} /> },
  "AI/ML": { glow: "#a855f7", icon: <Brain size={19} /> },
  PyTorch: { glow: "#EE4C2C", icon: <Flame size={19} /> },
  TensorFlow: { glow: "#FF6F00", icon: <Waypoints size={19} /> },
  OpenCV: { glow: "#5C3EE8", icon: <Eye size={19} /> },
  "Hugging Face": { glow: "#FFD21E", icon: <Smile size={19} /> },
  MySQL: { glow: "#00546B", icon: <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#00546B" /><path fill="#fff" d="M5.7 15.7h-.9c-.06-1.5-.15-3.3-.27-4.4h-.01l-1.4 4.4H2.45l-1.4-4.4h-.01a48.9 48.9 0 0 0-.19 4.4H0c.06-2 .19-3.8.41-5.5h1.15l1.33 4h.01l1.35-4h1.1c.24 2 .38 3.9.43 5.5zm12.6-5.5v5.5h-2.68v-.7h1.74v-4.8h.94zm2.63 0v5.5h-.92v-5.5h.92z" /></svg> },
  PostgreSQL: { glow: "#336791", icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#336791" /><path fill="#fff" d="M16.2 8.5c.2-1.3-.7-2-2.1-2.2-1-.1-1.9.2-2.4.7-.6-.2-1.3-.3-2-.2-1.3.2-2.3 1-2.7 2.3-.3 1-.2 2.1.2 3-.4.9-.5 2 0 2.9.5.9 1.5 1.4 2.6 1.3-.1.4-.1.8.1 1.1.3.5.9.7 1.6.5-.2.7-.1 1.3.3 1.7.5.5 1.4.6 2.2.2-.6-.3-1-.8-1-1.4 0-.2 0-.4.1-.6.6-.1 1.1-.4 1.4-.9.4.1.9 0 1.2-.3.4-.4.5-1 .3-1.6.6-.3 1-.9 1.1-1.6.1-.9-.3-1.7-1-2.1.3-.6.4-1.3.1-2z" /></svg> },
  Firebase: { glow: "#FFA000", icon: <svg viewBox="0 0 24 24"><path fill="#FFCA28" d="M5.34 15.9L8.85 2.17a.5.5 0 0 1 .92-.1l2.1 4.1 1.08-2.06a.5.5 0 0 1 .9 0L18.66 15.9l-6.66 3.72L5.34 15.9z" /><path fill="#FFA000" d="M5.34 15.9l3.5-3.5L12 15.9l-6.66 3.72z" /><path fill="#F57F17" d="M12 10.46l2.57-4.9 4.09 10.34L12 10.46z" /></svg> },
  "Django ORM": { glow: "#44B78B", icon: <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#092E20" /><path fill="#44B78B" d="M11.5 3h2.1v10.6c-1.1.2-1.9.3-2.8.3-2.6 0-4-1.2-4-3.4 0-2.1 1.5-3.5 3.8-3.5.4 0 .6 0 .9.1V3zm0 6.1c-.2-.1-.4-.1-.7-.1-1.1 0-1.8.7-1.8 1.8 0 1.1.6 1.7 1.7 1.7.3 0 .5 0 .8-.1V9.1z" /></svg> },
  VSCode: { glow: "#007ACC", icon: <Code2 size={19} /> },
  "Git / GitHub": { glow: "#F05032", icon: <svg viewBox="0 0 24 24" fill="#F05032"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" /></svg> },
  Linux: { glow: "#FCC624", icon: <svg viewBox="0 0 24 24" fill="#FCC624"><path d="M12 0a12 12 0 1 0 0 24A12 12 0 0 0 12 0zm-.5 5c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h1zm-3 3c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h1zm6 0c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h1zm-3 3c.28 0 .5.22.5.5v3c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5h1zM8 13c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5H7c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h1zm8 0c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h1zm-8 3c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5H7c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h7z" /></svg> },
  Docker: { glow: "#2496ED", icon: <svg viewBox="0 0 24 24" fill="#2496ED"><path d="M13.98 11.08h2.12v-1.9h-2.12v1.9zm-2.95 0h2.12v-1.9h-2.12v1.9zm-2.95 0h2.12v-1.9H8.08v1.9zm-2.95 0h2.12v-1.9H5.13v1.9zm5.9-2.95h2.12V6.23h-2.12v1.9zm-2.95 0h2.12V6.23H8.08v1.9zm5.9 2.95h2.12v-1.9h-2.12v1.9zM23.49 11.43a3 3 0 0 0-2.05-1.08 4 4 0 0 0-1.24-4.65 4.24 4.24 0 0 0-3.26 1.52 2.1 2.1 0 0 0-1.3-.44v1.9c.35 0 .63.28.63.63v1.9h-1.9v-1.9c0-.35.28-.63.63-.63a4 4 0 0 0-2.08.59 4.48 4.48 0 0 0-6.43-1.12 4.33 4.33 0 0 0-4.43 4.62 2.76 2.76 0 0 0-1.65 4.5c.6.32 5.6.43 7.75.43h.1c2.56 0 8.1-.1 8.88-.43a2.76 2.76 0 0 0 1.65-1.8 2.76 2.76 0 0 0 2.59-3.44z" /></svg> },
  Postman: { glow: "#FF6C37", icon: <Send size={19} /> },
  "AWS(EC2)": { glow: "#FF9900", icon: <Server size={19} /> },
  "AWS(S3)": { glow: "#FF9900", icon: <Boxes size={19} /> },
  "CI/CD": { glow: "#10b981", icon: <Workflow size={19} /> },
  "GitHub Actions": { glow: "#2088FF", icon: <PlayCircle size={19} /> },
  "Network Security": { glow: "#ef4444", icon: <ShieldCheck size={19} /> },
};

/* Flat, no category grouping, no percentage rendered. */
const SKILLS = [
  "Python", "Java", "JavaScript", "TypeScript", "Node.js", "HTML", "CSS",
  "Tailwind CSS", "React", "React Native",
  "Django", "REST APIs", "DRF", "Flask", "Web Sockets",
  "AI/ML", "PyTorch", "TensorFlow", "OpenCV", "Hugging Face",
  "MySQL", "PostgreSQL", "Firebase", "Django ORM",
  "VSCode", "Git / GitHub", "Linux", "Docker", "Postman",
  "AWS(EC2)", "AWS(S3)", "CI/CD", "GitHub Actions",
  "Network Security",
];

function SkillCard({ name, i }) {
  const meta = META[name];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.03, duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="group relative p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.16] transition-colors flex flex-col items-center text-center gap-2.5 overflow-hidden"
    >
      {/* colored glow that blooms in on hover, tinted per-skill */}
      <div
        className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 30%, ${meta?.glow || "#34d399"}33, transparent 70%)` }}
      />
      <motion.div
        whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
        transition={{ duration: 0.45 }}
        className="relative w-9 h-9 flex items-center justify-center"
        style={{ color: meta?.glow }}
      >
        {meta?.icon}
      </motion.div>
      <span className="relative text-[11px] font-medium text-[#c7d0dc] group-hover:text-white leading-tight transition-colors">{name}</span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle index="05" label="What I know" main="Technical" accent="skills" />
        <SectionSubtitle>Tools I actually reach for, day to day.</SectionSubtitle>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {SKILLS.map((name, i) => <SkillCard key={name} name={name} i={i} />)}
        </div>
      </div>
    </SectionWrapper>
  );
}