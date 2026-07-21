import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/*
  StarField — deep space background.
  - 4 layered star depths -> parallax-ish twinkle speed
  - Two soft nebula blobs (green/blue) that drift very slowly
  - Rare meteor streaks for the "alive" feeling
  - A moon, a distant sun-glow, and two small ringed planets (CSS, not canvas —
    cheap to render and easy to keep still-readable behind foreground content)
  Kept star rendering on a single canvas for performance instead of hundreds
  of DOM nodes.
*/

function Moon() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
      className="absolute -top-16 -right-16 md:top-[-4rem] md:right-[-3rem] w-56 h-56 md:w-72 md:h-72 rounded-full"
      style={{
        background: "radial-gradient(circle at 35% 32%, #f4f1ea 0%, #cfd3d8 28%, #9aa0aa 55%, #5c626e 100%)",
        boxShadow: "0 0 90px 10px rgba(226,232,240,0.10), inset -22px -18px 40px rgba(0,0,0,0.45)",
      }}
    >
      {/* craters */}
      <span className="absolute w-7 h-7 rounded-full bg-black/10 top-10 left-14 blur-[1px]" />
      <span className="absolute w-4 h-4 rounded-full bg-black/10 top-24 left-8 blur-[1px]" />
      <span className="absolute w-10 h-10 rounded-full bg-black/10 top-16 left-28 blur-[1px]" />
      <span className="absolute w-5 h-5 rounded-full bg-black/10 top-36 left-20 blur-[1px]" />
    </motion.div>
  );
}

function Sun() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.2 }}
      className="absolute bottom-[-6rem] left-[-5rem] w-64 h-64 rounded-full"
      style={{
        background: "radial-gradient(circle, #ffd58a 0%, #f5a742 35%, rgba(245,167,66,0.25) 60%, transparent 75%)",
        filter: "blur(2px)",
      }}
    />
  );
}

function Planet({ className, size, colors, ring, delay = 0, duration = 9 }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -14, 0] }}
      transition={{ repeat: Infinity, duration, ease: "easeInOut", delay }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {ring && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
            style={{ width: size * 2.1, height: size * 0.62, borderColor: ring, transform: "translate(-50%,-50%) rotate(-18deg)" }}
          />
        )}
        <div
          className="w-full h-full rounded-full"
          style={{ background: `radial-gradient(circle at 32% 30%, ${colors[0]}, ${colors[1]} 60%, ${colors[2]} 100%)` }}
        />
      </div>
    </motion.div>
  );
}

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const mkStars = (n, speedRange, sizeRange) =>
      Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
        baseA: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
      }));

    const dust = mkStars(160, [0.2, 0.5], [0.2, 0.6]);
    const far  = mkStars(130, [0.4, 0.8], [0.4, 1]);
    const mid  = mkStars(75,  [0.8, 1.4], [0.8, 1.6]);
    const near = mkStars(38,  [1.2, 2.2], [1.2, 2.4]);
    const layers = [dust, far, mid, near];

    let meteor = null;
    const spawnMeteor = () => {
      if (reduced) return;
      meteor = {
        x: Math.random() * W * 0.6 + W * 0.2,
        y: -20,
        vx: 4 + Math.random() * 3,
        vy: 3 + Math.random() * 2,
        life: 0,
        max: 40 + Math.random() * 20,
      };
    };
    const meteorTimer = reduced ? null : setInterval(() => {
      if (Math.random() < 0.5) spawnMeteor();
    }, 4200);

    let t = 0;
    let raf;
    const draw = () => {
      t += reduced ? 0 : 0.016;
      ctx.clearRect(0, 0, W, H);

      layers.forEach((stars) => {
        stars.forEach((s) => {
          const a = reduced ? s.baseA : s.baseA * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(226,232,240,${a})`;
          ctx.fill();
        });
      });

      if (meteor) {
        meteor.life++;
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        const p = meteor.life / meteor.max;
        const grad = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.vx * 8, meteor.y - meteor.vy * 8);
        grad.addColorStop(0, `rgba(52,211,153,${0.9 * (1 - p)})`);
        grad.addColorStop(1, "rgba(52,211,153,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.vx * 8, meteor.y - meteor.vy * 8);
        ctx.stroke();
        if (meteor.life > meteor.max || meteor.x > W || meteor.y > H) meteor = null;
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      if (meteorTimer) clearInterval(meteorTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* deep space base */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 80% at 50% -10%, #0c1a1f 0%, #060a11 55%)" }} />
      {/* nebula blobs */}
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.10] bg-[#34d399] top-[-10%] left-[-5%]" />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.08] bg-[#60a5fa] bottom-[-15%] right-[-5%]" />

      {/* celestial bodies */}
      <Moon />
      <Sun />
      <Planet
        className="hidden md:block left-[8%] top-[62%]"
        size={30}
        colors={["#f7c98c", "#d98c4a", "#7a4a20"]}
        ring="rgba(247,201,140,0.35)"
        duration={10}
      />
      <Planet
        className="hidden lg:block right-[12%] top-[30%]"
        size={16}
        colors={["#8fd6ff", "#4c8fc9", "#1c3b57"]}
        delay={1.2}
        duration={8}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* subtle vignette so foreground text stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_40%,transparent_35%,#060a11_100%)]" />
    </div>
  );
}