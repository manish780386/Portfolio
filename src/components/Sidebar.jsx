import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, FolderOpen, Code2, Mail, ShieldCheck,
  Award, Github, Linkedin, FileText, Menu, X, ChevronsLeft, Terminal
} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";

const NAV = [
  { id: "home",        label: "Home",         icon: <Home size={17} /> },
  { id: "about",       label: "About",        icon: <User size={17} /> },
  { id: "experience",  label: "Experience",   icon: <ShieldCheck size={17} /> },
  { id: "coding",      label: "Coding",       icon: <Terminal size={17} /> },
  { id: "certifications", label: "Certs",     icon: <Award size={17} /> },
  { id: "projects",    label: "Projects",     icon: <FolderOpen size={17} /> },
  { id: "skills",      label: "Skills",       icon: <Code2 size={17} /> },
  { id: "contact",     label: "Contact",      icon: <Mail size={17} /> },
];

const SOCIALS = [
  { icon: <Github size={16} />,   url: "https://github.com/manish780386",                     label: "GitHub" },
  { icon: <Linkedin size={16} />, url: "https://www.linkedin.com/in/manish-dange-2a03b6312/", label: "LinkedIn" },
];

export default function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

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
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
    }
  };

  const width = collapsed ? 76 : 232;

  const Content = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      {/* IDENTITY */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/[0.06] ${collapsed && !mobile ? "justify-center" : ""}`}>
        <div className="w-9 h-9 rounded-lg bg-[#34d399]/10 border border-[#34d399]/30 flex items-center justify-center shrink-0">
          <span className="text-[#34d399] text-sm font-bold font-mono-label">MD</span>
        </div>
        {(!collapsed || mobile) && (
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white leading-none">Manish Dange</p>
            <p className="text-[10px] text-[#7c8aa0] font-mono-label mt-1">FULLSTACK · SECURITY</p>
          </div>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const isAct = active === item.id && isHome;
          const inner = (
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 group
              ${isAct ? "bg-[#34d399]/[0.08] text-[#34d399]" : "text-[#7c8aa0] hover:text-white hover:bg-white/[0.04]"}
              ${collapsed && !mobile ? "justify-center" : ""}`}
            >
              <span className="shrink-0">{item.icon}</span>
              {(!collapsed || mobile) && <span className="text-sm font-medium truncate">{item.label}</span>}
            </div>
          );
          return isHome ? (
            <Link key={item.id} to={item.id} smooth offset={-20} duration={500} className="block cursor-pointer" onClick={() => setMobileOpen(false)}>
              {inner}
            </Link>
          ) : (
            <button key={item.id} onClick={() => handleNav(item.id)} className="block w-full text-left">
              {inner}
            </button>
          );
        })}

        <div className="h-px bg-white/[0.05] my-3 mx-2" />

        <NavLink to="/resume" onClick={() => setMobileOpen(false)}>
          {({ isActive }) => (
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
              ${isActive ? "bg-[#60a5fa]/[0.08] text-[#60a5fa]" : "text-[#7c8aa0] hover:text-white hover:bg-white/[0.04]"}
              ${collapsed && !mobile ? "justify-center" : ""}`}>
              <FileText size={17} className="shrink-0" />
              {(!collapsed || mobile) && <span className="text-sm font-medium">Resume</span>}
            </div>
          )}
        </NavLink>
      </nav>

      {/* FOOTER */}
      <div className="px-3 py-4 border-t border-white/[0.05] space-y-3">
        <div className={`flex gap-2 ${collapsed && !mobile ? "flex-col items-center" : ""}`}>
          {SOCIALS.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[#7c8aa0] hover:text-[#34d399] hover:border-[#34d399]/30 transition">
              {s.icon}
            </a>
          ))}
        </div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden md:flex w-full items-center justify-center gap-2 py-2 rounded-lg border border-white/[0.07] text-[#7c8aa0] hover:text-white hover:border-white/[0.15] transition text-xs"
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronsLeft size={14} />
          </motion.span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP RAIL — width is the single source of truth, App.jsx reads the same `collapsed` value */}
      <motion.aside
        animate={{ width }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 bg-[#080c14]/95 backdrop-blur-xl border-r border-white/[0.06] overflow-hidden"
      >
        <Content />
      </motion.aside>

      {/* MOBILE TOPBAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#080c14]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#34d399]/10 border border-[#34d399]/30 flex items-center justify-center">
            <span className="text-[#34d399] text-xs font-bold font-mono-label">MD</span>
          </div>
          <span className="text-sm font-semibold text-white">Manish Dange</span>
        </div>
        <button className="text-[#7c8aa0] p-1.5 rounded-lg hover:bg-white/5 transition" onClick={() => setMobileOpen((o) => !o)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="md:hidden fixed left-0 top-0 h-full w-[260px] z-50 bg-[#080c14] border-r border-white/[0.06] overflow-y-auto">
              <Content mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}