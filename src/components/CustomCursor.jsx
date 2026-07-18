import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const dotRef    = useRef(null);
  const trailsRef = useRef([]);
  const pos       = useRef({ x: 0, y: 0 });
  const angle     = useRef(0);
  const lastPos   = useRef({ x: 0, y: 0 });
  const [hovered, setHovered]   = useState(false);
  const [clicked, setClicked]   = useState(false);
  const [trails,  setTrails]    = useState([]);
  const trailId = useRef(0);

  useEffect(() => {
    const move = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        angle.current = Math.atan2(dy, dx) * (180 / Math.PI);
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
      pos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
        dotRef.current.style.transform = `translate(-50%, -50%) rotate(${angle.current + 45}deg)`;
      }

      // spawn trail particle
      const id = ++trailId.current;
      setTrails(prev => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setTrails(prev => prev.filter(t => t.id !== id)), 600);
    };

    const click = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    const hover = () => setHovered(true);
    const unhover = () => setHovered(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);

    const observe = new MutationObserver(() => {
      document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
        el.addEventListener("mouseenter", hover);
        el.addEventListener("mouseleave", unhover);
      });
    });
    observe.observe(document.body, { subtree: true, childList: true });
    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", hover);
      el.addEventListener("mouseleave", unhover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      observe.disconnect();
    };
  }, []);

  return (
    <>
      {/* TRAIL PARTICLES */}
      {trails.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed pointer-events-none z-[9995]"
          style={{ left: t.x, top: t.y, transform: "translate(-50%,-50%)" }}
        >
          <div
            className="rounded-full"
            style={{
              width:  `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
              background: i % 2 === 0
                ? "rgba(6,182,212,0.8)"
                : "rgba(99,102,241,0.8)",
            }}
          />
        </motion.div>
      ))}

      {/* AIRPLANE CURSOR */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{ willChange: "transform, left, top", transition: "transform 0.05s linear" }}
      >
        <motion.div
          animate={{
            scale: clicked ? 1.4 : hovered ? 1.25 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {/* AIRPLANE SVG */}
          <svg
            width={hovered ? "34" : "26"}
            height={hovered ? "34" : "26"}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: `drop-shadow(0 0 ${hovered ? "8" : "4"}px rgba(6,182,212,0.9))` }}
          >
            {/* plane body */}
            <path
              d="M21 3L3 10.5l6.5 2L12 20l3-6 6-11z"
              fill={hovered ? "#6366f1" : "#06b6d4"}
              stroke={hovered ? "#a5b4fc" : "#22d3ee"}
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            {/* wing accent */}
            <path
              d="M9.5 12.5L12 20l1.5-4-4-3.5z"
              fill={hovered ? "#818cf8" : "#67e8f9"}
              opacity="0.7"
            />
          </svg>

          {/* CLICK BURST */}
          <AnimatePresence>
            {clicked && (
              <motion.div
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-full border-2 border-cyan-400"
                style={{ margin: "-6px" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}