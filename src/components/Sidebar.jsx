import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, FolderOpen, Code2, Mail, ShieldCheck,
  Award, Github, Linkedin, FileText, Menu, X, ChevronsLeft, Terminal, Sparkles
} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";

const NAV = [
  { id: "home",          label: "Home",         icon: Home },
  { id: "about",         label: "About",        icon: User },
  { id: "experience",    label: "Experience",   icon: ShieldCheck },
  { id: "coding",        label: "Coding",       icon: Terminal },
  { id: "certifications", label: "Certs",        icon: Award },
  { id: "projects",      label: "Projects",     icon: FolderOpen },
  { id: "skills",        label: "Skills",       icon: Code2 },
  { id: "contact",       label: "Contact",      icon: Mail },
];

const SOCIALS = [
  { icon: Github,   url: "https://github.com/manish780386",                  label: "GitHub" },
  { icon: Linkedin, url: "https://www.linkedin.com/in/manish-dange-2a03b6312/", label: "LinkedIn" },
];

export default function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(null);
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

  const width = collapsed ? 80 : 240;

  const Content = ({ mobile = false }) => (
    <div className="flex flex-col h-full relative z-10">
      {/* IDENTITY / BRANDING */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/[0.06] ${collapsed && !mobile ? "justify-center px-2" : ""}`}>
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#34d399]/20 via-[#34d399]/10 to-transparent border border-[#34d399]/40 flex items-center justify-center shrink-0 shadow-lg shadow-[#34d399]/10 cursor-pointer"
        >
          <span className="text-[#34d399] font-bold text-sm tracking-wider font-mono">MD</span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#34d399] animate-pulse" />
        </motion.div>

        {(!collapsed || mobile) && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="overflow-hidden"
          >
            <p className="text-sm font-bold text-gray-100 tracking-wide flex items-center gap-1.5">
              Manish Dange
            </p>
            <p className="text-[11px] text-[#34d399] font-mono tracking-tight flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" /> Software Builder
            </p>
          </motion.div>
        )}
      </div>

      {/* NAVIGATION ITEMS */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto custom-scrollbar">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isAct = active === item.id && isHome;
          const isHov = hovered === item.id;

          const inner = (
            <div 
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className={`relative flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${isAct ? "text-[#34d399] font-semibold" : "text-[#7c8aa0] hover:text-gray-100"}
                ${collapsed && !mobile ? "justify-center px-0" : ""}`}
            >
              {/* Active Background Indicator */}
              {isAct && (
                <motion.div 
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-gradient-to-r from-[#34d399]/15 via-[#34d399]/10 to-transparent rounded-xl border-l-2 border-[#34d399]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              <Icon size={18} className={`shrink-0 transition-transform duration-200 ${isAct || isHov ? "scale-110 text-[#34d399]" : ""}`} />

              {(!collapsed || mobile) && (
                <span className="text-sm font-medium tracking-wide truncate relative z-10">
                  {item.label}
                </span>
              )}

              {/* Collapsed Tooltip */}
              {collapsed && !mobile && isHov && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 20 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute left-full px-3 py-1.5 rounded-lg bg-[#0d1527] border border-white/10 text-xs text-white font-medium shadow-xl pointer-events-none whitespace-nowrap z-50"
                >
                  {item.label}
                </motion.div>
              )}
            </div>
          );

          return isHome ? (
            <Link 
              key={item.id} 
              to={item.id} 
              smooth 
              offset={-20} 
              duration={500} 
              className="block cursor-pointer relative" 
              onClick={() => setMobileOpen(false)}
            >
              {inner}
            </Link>
          ) : (
            <button key={item.id} onClick={() => handleNav(item.id)} className="block w-full text-left relative">
              {inner}
            </button>
          );
        })}

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

        {/* RESUME LINK */}
        <NavLink to="/resume" onClick={() => setMobileOpen(false)} className="block relative">
          {({ isActive }) => (
            <div className={`relative flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200
              ${isActive ? "bg-blue-500/10 text-blue-400 font-semibold border-l-2 border-blue-400" : "text-[#7c8aa0] hover:text-white hover:bg-white/[0.04]"}
              ${collapsed && !mobile ? "justify-center px-0" : ""}`}
            >
              <FileText size={18} className="shrink-0" />
              {(!collapsed || mobile) && <span className="text-sm font-medium tracking-wide">Resume</span>}

              {collapsed && !mobile && (
                <div className="absolute left-full px-3 py-1.5 rounded-lg bg-[#0d1527] border border-white/10 text-xs text-white font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  Resume
                </div>
              )}
            </div>
          )}
        </NavLink>
      </nav>

      {/* FOOTER & SOCIAL LINKS */}
      <div className="px-3 py-4 border-t border-white/[0.06] space-y-3 bg-black/20">
        <div className={`flex gap-2 ${collapsed && !mobile ? "flex-col items-center" : "justify-center"}`}>
          {SOCIALS.map((s, i) => {
            const SocialIcon = s.icon;
            return (
              <motion.a 
                key={i} 
                href={s.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                title={s.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#7c8aa0] hover:text-[#34d399] hover:border-[#34d399]/40 hover:bg-[#34d399]/10 transition-all shadow-sm"
              >
                <SocialIcon size={16} />
              </motion.a>
            );
          })}
        </div>

        {/* TOGGLE COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden md:flex w-full items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[#7c8aa0] hover:text-white hover:bg-white/[0.05] hover:border-white/20 transition-all text-xs font-mono"
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronsLeft size={16} />
          </motion.div>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <motion.aside
        animate={{ width }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 bg-[#060a11]/90 backdrop-blur-2xl border-r border-white/[0.08] overflow-hidden shadow-2xl"
      >
        {/* Soft Background Ambient Light inside Sidebar */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#34d399]/10 to-transparent pointer-events-none" />
        <Content />
      </motion.aside>

      {/* MOBILE TOPBAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#060a11]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#34d399]/10 border border-[#34d399]/30 flex items-center justify-center">
            <span className="text-[#34d399] text-xs font-bold font-mono">MD</span>
          </div>
          <span className="text-sm font-semibold text-white tracking-wide">Manish Dange</span>
        </div>
        <button 
          className="text-[#7c8aa0] p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:text-white transition" 
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40" 
              onClick={() => setMobileOpen(false)} 
            />
            <motion.aside 
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 h-full w-[270px] z-50 bg-[#060a11] border-r border-white/[0.08] shadow-2xl overflow-y-auto"
            >
              <Content mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}