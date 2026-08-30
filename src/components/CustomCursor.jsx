import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef(null);
  
  // Smooth Physics Tracking (Lerp)
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  
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

    let animationFrameId;

    // Smooth Lerp loop for fluid 60/120fps motion
    const render = () => {
      // Lerp (Linear Interpolation) calculation: smooth speed damping
      const ease = 0.2; 
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      currentPos.current.x += dx * ease;
      currentPos.current.y += dy * ease;

      // Calculate angle of travel (if moving significantly)
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        // Smooth rotation interpolation
        angle.current = targetAngle;
      }

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentPos.current.x}px`;
        cursorRef.current.style.top = `${currentPos.current.y}px`;
        // Rocket SVG naturally points UP (270 deg / -90 deg), rotate relative to vector angle
        cursorRef.current.style.transform = `translate(-50%, -50%) rotate(${angle.current + 90}deg)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Spawn thruster particles on move
      const id = ++flameId.current;
      setFlames((prev) => [
        ...prev.slice(-12), 
        { id, x: e.clientX, y: e.clientY, angle: angle.current }
      ]);

      setTimeout(() => {
        setFlames((prev) => prev.filter((f) => f.id !== id));
      }, 400);
    };

    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    const handleHover = () => setHovered(true);
    const handleUnhover = () => setHovered(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    render();

    // Attach hover detection dynamically
    const attachHoverEvents = () => {
      document.querySelectorAll("a, button, [data-cursor], input, textarea").forEach((el) => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleUnhover);
      });
    };
    
    attachHoverEvents();
    const observer = new MutationObserver(attachHoverEvents);
    observer.observe(document.body, { subtree: true, childList: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* THRUSTER FLAME & PARTICLES TRAIL */}
      {flames.map((f, i) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0.9, scale: 1.2 }}
          animate={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed pointer-events-none z-[9995]"
          style={{
            left: f.x,
            top: f.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: `${4 + (i % 4)}px`,
              height: `${4 + (i % 4)}px`,
              background:
                i % 3 === 0
                  ? "#34d399"
                  : i % 2 === 0
                  ? "#f59e0b"
                  : "#ef4444",
              boxShadow:
                i % 2 === 0
                  ? "0 0 10px rgba(52, 211, 153, 0.9)"
                  : "0 0 10px rgba(245, 158, 11, 0.9)",
            }}
          />
        </motion.div>
      ))}

      {/* ROCKET CONTAINER */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{ willChange: "transform, left, top" }}
      >
        <motion.div
          animate={{
            scale: clicked ? 1.4 : hovered ? 1.25 : 1,
          }}
          transition={{ type: "spring", stiffness: 450, damping: 22 }}
        >
          <svg
            width={hovered ? 36 : 28}
            height={hovered ? 36 : 28}
            viewBox="0 0 64 64"
            fill="none"
            className="drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]"
          >
            {/* REALISTIC ENGINE THRUSTER PLUME (ANIMATED BACK FLAME) */}
            <motion.path
              d="M26 44 L32 58 L38 44 Z"
              fill="url(#fireGradient)"
              animate={{
                scaleY: hovered ? [1, 1.4, 1] : [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ repeat: Infinity, duration: 0.15 }}
            />

            {/* SIDE FINS */}
            <path d="M16 34 L8 44 L20 42 Z" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1.5" />
            <path d="M48 34 L56 44 L44 42 Z" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1.5" />

            {/* MAIN ROCKET BODY */}
            <path
              d="M32 4 C22 16 20 30 20 42 L44 42 C44 30 42 16 32 4 Z"
              fill="url(#bodyGradient)"
              stroke="#34d399"
              strokeWidth="1.5"
            />

            {/* NOSE CONE HIGHLIGHT */}
            <path d="M32 4 C28 12 26 18 26 22 L38 22 C38 18 36 12 32 4 Z" fill="#34d399" />

            {/* COCKPIT GLASS (WINDOW) */}
            <circle cx="32" cy="26" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="33.5" cy="24.5" r="1.5" fill="#ffffff" />

            {/* SHOCKWAVE BURST ON CLICK */}
            <AnimatePresence>
              {clicked && (
                <motion.circle
                  cx="32"
                  cy="32"
                  r="6"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2"
                  initial={{ r: 6, opacity: 1 }}
                  animate={{ r: 28, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            {/* GRADIENTS */}
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>

              <linearGradient id="fireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </>
  );
}