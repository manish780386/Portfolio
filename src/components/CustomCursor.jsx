import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const angle = useRef(0);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const particles = useRef([]);

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

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Add trail particles directly into ref array (Zero React State Overhead)
      if (Math.random() < 0.6) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 2,
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          color: ["#34d399", "#f59e0b", "#ef4444", "#38bdf8"][
            Math.floor(Math.random() * 4)
          ],
        });
      }
    };

    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    // Event Delegation for hover
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest("a, button, input, textarea, [data-cursor], .cursor-hover")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Smooth Lerp Loop
    const render = () => {
      // 0.25 Ease factor for responsiveness
      const ease = 0.25;
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      currentPos.current.x += dx * ease;
      currentPos.current.y += dy * ease;

      if (Math.hypot(dx, dy) > 0.5) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        angle.current = targetAngle;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0px) translate(-50%, -50%) rotate(${angle.current + 90}deg)`;
      }

      // Draw particle trail on canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.life -= p.decay;

          if (p.life <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* HIGH PERFORMANCE CANVAS FOR TRAIL */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9995]"
      />

      {/* ROCKET CURSOR */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      >
        <motion.div
          animate={{
            scale: clicked ? 1.4 : hovered ? 1.25 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          <svg
            width={hovered ? 36 : 28}
            height={hovered ? 36 : 28}
            viewBox="0 0 64 64"
            fill="none"
            className="drop-shadow-[0_0_12px_rgba(52,211,153,0.9)]"
          >
            {/* ENGINE FLAME */}
            <motion.path
              d="M26 44 L32 58 L38 44 Z"
              fill="url(#fireGradient)"
              animate={{
                scaleY: hovered ? [1, 1.4, 1] : [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ repeat: Infinity, duration: 0.12 }}
            />

            {/* FINS */}
            <path d="M16 34 L8 44 L20 42 Z" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1.5" />
            <path d="M48 34 L56 44 L44 42 Z" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1.5" />

            {/* BODY */}
            <path
              d="M32 4 C22 16 20 30 20 42 L44 42 C44 30 42 16 32 4 Z"
              fill="url(#bodyGradient)"
              stroke="#34d399"
              strokeWidth="1.5"
            />

            {/* NOSE */}
            <path d="M32 4 C28 12 26 18 26 22 L38 22 C38 18 36 12 32 4 Z" fill="#34d399" />

            {/* COCKPIT */}
            <circle cx="32" cy="26" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="33.5" cy="24.5" r="1.5" fill="#ffffff" />

            {/* CLICK SHOCKWAVE */}
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
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

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