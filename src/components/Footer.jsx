import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Codepen, Mail, Heart } from "lucide-react";
import { Link } from "react-scroll";

const SOCIALS = [
  { icon: <Github size={18} />, url: "https://github.com/manish780386", label: "GitHub" },
  { icon: <Linkedin size={18} />, url: "https://www.linkedin.com/in/manish-dange-2a03b6312/", label: "LinkedIn" },
  { icon: <Codepen size={18} />, url: "https://leetcode.com/u/dangemanish/", label: "LeetCode" },
  { icon: <Mail size={18} />, url: "mailto:dangemanish35@gmail.com", label: "Email" },
];

const QUICK_LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 border-t border-white/[0.05] bg-black/30 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-xs font-black">M</span>
              </div>
              <span className="font-black text-lg bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                manish.dev
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Full Stack Developer & Cyber Security enthusiast. Building digital products that make a difference.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.id}>
                  <Link
                    to={l.id}
                    smooth
                    offset={-70}
                    duration={600}
                    className="text-gray-500 hover:text-cyan-400 text-sm cursor-pointer transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIALS */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Connect</h4>
            <div className="flex flex-col gap-2">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-sm transition group"
                >
                  <span className="group-hover:scale-110 transition-transform">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-white/[0.05] mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            Made with <Heart size={13} className="text-red-500 fill-red-500" /> by{" "}
            <span className="text-cyan-400 font-semibold">Manish Dange</span>
          </p>
          <p className="text-gray-700 text-xs">
            © 2026 · Built with React, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </motion.footer>
  );
}