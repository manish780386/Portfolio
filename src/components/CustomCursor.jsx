import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Rocket cursor — replaces the browser cursor with a small rocket that
  points in its direction of travel and leaves a thruster-flame trail.

  Why this version is safe where the old CustomCursor wasn't:
  - Only activates when `(pointer: fine)` matches, i.e. an actual mouse.
    Touch devices never load it, so mobile is untouched.
  - Respects prefers-reduced-motion (skips entirely).
  - Toggles a single `custom-cursor-active` class on <body> instead of a
    blanket `* { cursor: none !important }`. The stylesheet only hides the
    cursor on that class, and explicitly excludes text inputs/textareas so
    typing still shows a normal text caret.
*/
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const angle = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [flames, setFlames] = useState([]);
  const flameId = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");
    return () => document.body.classList.remove("custom-cursor-active");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        angle.current = Math.atan2(dy, dx) * (180 / Math.PI);
        lastPos.current = { x: e.clientX, y: e.clientY };
      }

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
        // +135deg: rocket art points up-right by default, rotate so the
        // nose faces the direction of travel
        dotRef.current.style.transform = `translate(-50%, -50%) rotate(${angle.current + 135}deg)`;
      }

      const id = ++flameId.current;
      setFlames((prev) => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setFlames((prev) => prev.filter((f) => f.id !== id)), 450);
    };

    const click = () => { setClicked(true); setTimeout(() => setClicked(false), 300); };
    const hover = () => setHovered(true);
    const unhover = () => setHovered(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);

    const attach = () => {
      document.querySelectorAll("a,button,[data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", hover);
        el.addEventListener("mouseleave", unhover);
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { subtree: true, childList: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      observer.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* THRUSTER FLAME TRAIL */}
      {flames.map((f, i) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0.75, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed pointer-events-none z-[9995]"
          style={{ left: f.x, top: f.y, transform: "translate(-50%,-50%)" }}
        >
          <div
            className="rounded-full"
            style={{
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
              background: i % 2 === 0 ? "rgba(245,167,66,0.85)" : "rgba(52,211,153,0.75)",
              boxShadow: i % 2 === 0 ? "0 0 6px rgba(245,167,66,0.6)" : "0 0 6px rgba(52,211,153,0.5)",
            }}
          />
        </motion.div>
      ))}

      {/* ROCKET */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{ willChange: "transform, left, top", transition: "transform 0.06s linear" }}
      >
        <motion.div animate={{ scale: clicked ? 1.35 : hovered ? 1.2 : 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
          <svg width={hovered ? 30 : 24} height={hovered ? 30 : 24} viewBox="0 0 24 24" fill="none"
            style={{ filter: `drop-shadow(0 0 ${hovered ? 7 : 4}px rgba(52,211,153,0.85))` }}>
            {/* exhaust flame (behind body, points opposite the nose) */}
            <motion.path
              d="M9.5 15.5c-1 1.6-1 3-1 3l2.2-.8 1.3 1.3.9-2" fill="#f5b942"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.35 }}
            />
            {/* rocket body */}
            <path
              d="M12 2c2.2 1.8 3.4 4.6 3.4 7.6 0 2-.5 3.7-1.3 5.2l-2.1 1-2.1-1c-.8-1.5-1.3-3.2-1.3-5.2C8.6 6.6 9.8 3.8 12 2z"
              fill="#e7ecf2" stroke="#34d399" strokeWidth="0.6"
            />
            {/* window */}
            <circle cx="12" cy="8.6" r="1.3" fill="#34d399" />
            {/* fins */}
            <path d="M8.6 12.5 6.3 15l2.3-.5z" fill="#60a5fa" />
            <path d="M15.4 12.5 17.7 15l-2.3-.5z" fill="#60a5fa" />

            <AnimatePresence>
              {clicked && (
                <motion.circle
                  cx="12" cy="12" r="3" fill="none" stroke="#34d399" strokeWidth="1"
                  initial={{ r: 3, opacity: 1 }} animate={{ r: 11, opacity: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </AnimatePresence>
          </svg>
        </motion.div>
      </div>
    </>
  );
}