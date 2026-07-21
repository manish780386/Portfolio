import React, { createContext, useContext, useState } from "react";

/*
  BUG FIX NOTE
  ────────────
  In the old build, `collapsed` lived only inside Sidebar.jsx's local
  state. <main> in App.jsx set its left margin with a *static* Tailwind
  breakpoint class (md:ml-[72px] lg:ml-[240px]) that never knew whether
  the sidebar was collapsed or not. Result: collapsing the rail left a
  gap, or expanding it caused content to jump/overlap for a frame.

  Fix: lift `collapsed` up into a tiny context so both the rail's width
  and the page's margin animate off the same single source of truth.
*/

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
  return ctx;
}