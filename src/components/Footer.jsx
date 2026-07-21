import React from "react";
import { Github, Linkedin, Code2, Mail, Heart } from "lucide-react";
import { Link } from "react-scroll";

const SOCIALS = [
  { icon: <Github size={16} />,   url: "https://github.com/manish780386",                     label: "GitHub" },
  { icon: <Linkedin size={16} />, url: "https://www.linkedin.com/in/manish-dange-2a03b6312/", label: "LinkedIn" },
  { icon: <Code2 size={16} />,    url: "https://leetcode.com/u/dangemanish/",                 label: "LeetCode" },
  { icon: <Mail size={16} />,     url: "mailto:dangemanish35@gmail.com",                      label: "Email" },
];

const QUICK_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-black/20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#34d399]/10 border border-[#34d399]/30 flex items-center justify-center">
                <span className="text-[#34d399] text-xs font-bold font-mono-label">MD</span>
              </div>
              <span className="font-semibold text-white">Manish Dange</span>
            </div>
            <p className="text-[#7c8aa0] text-sm leading-relaxed">
              Full Stack Developer specializing in React &amp; Django, studying Cyber Security at SVVV Indore.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-mono-label uppercase text-xs tracking-widest">Navigate</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.id}>
                  <Link to={l.id} smooth offset={-20} duration={500} className="text-[#7c8aa0] hover:text-[#34d399] text-sm cursor-pointer transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-mono-label uppercase text-xs tracking-widest">Connect</h4>
            <div className="flex flex-col gap-2">
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#7c8aa0] hover:text-[#34d399] text-sm transition">
                  {s.icon}{s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-white/[0.05] mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#4b5768] text-xs flex items-center gap-1.5">
            Built by <span className="text-[#34d399] font-medium">Manish Dange</span> with
            <Heart size={11} className="text-[#f2545b] fill-[#f2545b]" /> · React &amp; Tailwind
          </p>
          <p className="text-[#4b5768] text-xs">© 2026 · All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}