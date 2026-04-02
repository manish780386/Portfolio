import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, FolderOpen, Code2, Mail, Briefcase,
  Award, Github, Linkedin, FileText, Download,
  BarChart2, Menu, X, ChevronRight, Shield, Zap
} from "lucide-react";

const NAV = [
  { id: "home",          label: "Home",          icon: <Home size={18} /> },
  { id: "about",         label: "About",         icon: <User size={18} /> },
  { id: "github-stats",  label: "GitHub",        icon: <Github size={18} /> },
  { id: "leetcode",      label: "LeetCode",      icon: <BarChart2 size={18} /> },
  { id: "experience",    label: "Experience",    icon: <Briefcase size={18} /> },
  { id: "certifications",label: "Certifications",icon: <Award size={18} /> },
  { id: "projects",      label: "Projects",      icon: <FolderOpen size={18} /> },
  { id: "skills",        label: "Skills",        icon: <Code2 size={18} /> },
  { id: "contact",       label: "Contact",       icon: <Mail size={18} /> },
];

const SOCIALS = [
  { icon: <Github size={16} />,   url: "https://github.com/manish780386",                          label: "GitHub" },
  { icon: <Linkedin size={16} />, url: "https://www.linkedin.com/in/manish-dange-2a03b6312/",     label: "LinkedIn" },
  { icon: <Shield size={16} />,   url: "https://leetcode.com/u/dangemanish/",                     label: "LeetCode" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  /* track active section on scroll */
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-35% 0px -35% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const handleNav = (id) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  };

  const sidebarWidth = collapsed ? 72 : 240;

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      {/* LOGO */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/[0.06] ${collapsed && !mobile ? "justify-center" : ""}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 shrink-0">
          <span className="text-white text-sm font-black">M</span>
        </div>
        {(!collapsed || mobile) && (
          <div className="overflow-hidden">
            <p className="text-sm font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent leading-none">
              manish.dev
            </p>
            <p className="text-[10px] text-gray-600 mt-0.5">Full Stack Dev</p>
          </div>
        )}
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
        {NAV.map((item) => {
          const isAct = active === item.id && isHome;
          const linkInner = (
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group
              ${isAct
                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                : "text-gray-500 hover:text-white hover:bg-white/[0.05]"
              } ${collapsed && !mobile ? "justify-center" : ""}`}
            >
              <span className={`shrink-0 ${isAct ? "text-cyan-400" : "text-gray-600 group-hover:text-gray-300"}`}>
                {item.icon}
              </span>
              {(!collapsed || mobile) && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {(!collapsed || mobile) && isAct && (
                <ChevronRight size={13} className="ml-auto text-cyan-400/60" />
              )}
            </div>
          );

          return isHome ? (
            <Link
              key={item.id}
              to={item.id}
              smooth
              offset={-20}
              duration={600}
              className="block cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              {linkInner}
            </Link>
          ) : (
            <button key={item.id} onClick={() => handleNav(item.id)} className="block w-full text-left">
              {linkInner}
            </button>
          );
        })}

        {/* DIVIDER */}
        <div className="h-px bg-white/[0.05] my-3 mx-2" />

        {/* PAGES */}
        {[
          { to: "/projects", icon: <FolderOpen size={18} />, label: "All Projects" },
          { to: "/resume",   icon: <FileText size={18} />,   label: "Resume" },
        ].map((p) => (
          <NavLink key={p.to} to={p.to} onClick={() => setMobileOpen(false)}>
            {({ isActive }) => (
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150
                ${isActive ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20" : "text-gray-500 hover:text-white hover:bg-white/[0.05]"}
                ${collapsed && !mobile ? "justify-center" : ""}`}
              >
                <span className={`shrink-0 ${isActive ? "text-indigo-400" : "text-gray-600"}`}>{p.icon}</span>
                {(!collapsed || mobile) && <span className="text-sm font-medium">{p.label}</span>}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* BOTTOM */}
      <div className={`px-3 py-4 border-t border-white/[0.05] space-y-3`}>
        {/* SOCIAL ICONS */}
        <div className={`flex gap-2 ${collapsed && !mobile ? "flex-col items-center" : "flex-row flex-wrap"}`}>
          {SOCIALS.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-500 hover:text-cyan-400 hover:border-cyan-500/30 transition"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* RESUME DOWNLOAD */}
        {(!collapsed || mobile) && (
          <NavLink to="/resume">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold hover:from-cyan-500/20 hover:to-indigo-500/20 transition cursor-pointer">
              <Download size={14} />
              Download Resume
            </div>
          </NavLink>
        )}

        {/* AVAILABILITY */}
        {(!collapsed || mobile) && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/[0.07] border border-green-500/15">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span className="text-green-400 text-[11px] font-medium">Available for work</span>
          </div>
        )}

        {/* COLLAPSE TOGGLE (desktop) */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden md:flex w-full items-center justify-center gap-2 py-2 rounded-xl border border-white/[0.06] text-gray-600 hover:text-white hover:border-white/[0.12] transition text-xs"
        >
          {collapsed ? <ChevronRight size={14} /> : <><ChevronRight size={14} className="rotate-180" /> <span>Collapse</span></>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <motion.aside
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 bg-[#07090f]/95 backdrop-blur-xl border-r border-white/[0.05] overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>

      {/* ── MOBILE TOPBAR ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#07090f]/95 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-black">M</span>
          </div>
          <span className="text-sm font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            manish.dev
          </span>
        </div>
        <button
          className="text-gray-400 p-1.5 rounded-lg hover:bg-white/5 transition"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="md:hidden fixed left-0 top-0 h-full w-[260px] z-50 bg-[#07090f] border-r border-white/[0.06] overflow-y-auto"
            >
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}