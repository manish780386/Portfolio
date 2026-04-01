import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Download, Github, Home,
  FolderOpen, FileText, Code2, Terminal, Zap
} from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "Home", icon: <Home size={14} /> },
  { id: "about", label: "About", icon: <Terminal size={14} /> },
  { id: "projects", label: "Projects", icon: <FolderOpen size={14} /> },
  { id: "skills", label: "Skills", icon: <Code2 size={14} /> },
  { id: "contact", label: "Contact", icon: <Zap size={14} /> },
];

const MORE_LINKS = [
  { id: "github-stats", label: "📊 GitHub Stats" },
  { id: "leetcode", label: "🧩 LeetCode Stats" },
  { id: "experience", label: "🚀 Experience" },
  { id: "certifications", label: "🏅 Certifications" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracker
  useEffect(() => {
    const sections = ["home", "about", "github-stats", "leetcode", "experience", "certifications", "projects", "skills", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleScrollLink = (id) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
    setMobileOpen(false);
    setMoreOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 16 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/75 backdrop-blur-2xl border-b border-white/[0.06] shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <span className="text-white text-xs font-black">M</span>
          </div>
          <span className="text-base font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
            manish.dev
          </span>
        </motion.div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = isHome && activeSection === link.id;
            return isHome ? (
              <Link
                key={link.id}
                to={link.id}
                smooth
                offset={-70}
                duration={600}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={isActive ? "text-cyan-400" : "text-gray-600"}>{link.icon}</span>
                {link.label}
              </Link>
            ) : (
              <button
                key={link.id}
                onClick={() => handleScrollLink(link.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all duration-200"
              >
                <span className="text-gray-600">{link.icon}</span>
                {link.label}
              </button>
            );
          })}

          {/* MORE DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              More <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-52 bg-[#0a0e1a]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl shadow-black/40"
                >
                  {MORE_LINKS.map((l) => (
                    isHome ? (
                      <Link
                        key={l.id}
                        to={l.id}
                        smooth
                        offset={-70}
                        duration={600}
                        onClick={() => setMoreOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 cursor-pointer transition"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <button
                        key={l.id}
                        onClick={() => handleScrollLink(l.id)}
                        className="w-full text-left block px-4 py-2.5 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 cursor-pointer transition"
                      >
                        {l.label}
                      </button>
                    )
                  ))}
                  <div className="h-px bg-white/5 my-1" />
                  <NavLink
                    to="/projects"
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition"
                  >
                    🗂️ All Projects
                  </NavLink>
                  <NavLink
                    to="/resume"
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition"
                  >
                    📄 Resume
                  </NavLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-2">
          <motion.a
            href="https://github.com/manish780386"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-gray-400 text-sm hover:text-white hover:border-white/20 transition"
          >
            <Github size={14} /> GitHub
          </motion.a>
          <NavLink to="/resume">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,220,255,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold"
            >
              <Download size={14} /> Resume
            </motion.button>
          </NavLink>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-gray-400 p-1.5 rounded-lg hover:bg-white/5 transition"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#07090f]/95 backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <div key={l.id} className="w-full">
                  {isHome ? (
                    <Link
                      to={l.id}
                      smooth
                      offset={-70}
                      duration={600}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5 cursor-pointer transition"
                    >
                      {l.icon} {l.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleScrollLink(l.id)}
                      className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition"
                    >
                      {l.icon} {l.label}
                    </button>
                  )}
                </div>
              ))}
              <div className="h-px bg-white/5 my-1" />
              {MORE_LINKS.map((l) => (
                isHome ? (
                  <Link
                    key={l.id}
                    to={l.id}
                    smooth
                    offset={-70}
                    duration={600}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 cursor-pointer transition"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <button
                    key={l.id}
                    onClick={() => handleScrollLink(l.id)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition"
                  >
                    {l.label}
                  </button>
                )
              ))}
              <div className="flex gap-2 mt-2">
                <NavLink to="/resume" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-semibold">
                    Download Resume
                  </button>
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}