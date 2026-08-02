import React, { useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ─── detect mobile once ─── */
const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;
const IS_TABLET = typeof window !== "undefined" && window.innerWidth < 1024;

/* ─── MOON ─────────────────────────────────────── */
function Moon() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute -top-16 -right-16 md:top-[-4rem] md:right-[-3rem] w-56 h-56 md:w-72 md:h-72 rounded-full"
      style={{
        background:
          "radial-gradient(circle at 35% 32%, #f4f1ea 0%, #cfd3d8 28%, #9aa0aa 55%, #5c626e 100%)",
        boxShadow:
          "0 0 90px 10px rgba(226,232,240,0.10), inset -22px -18px 40px rgba(0,0,0,0.45)",
      }}
    >
      {!IS_MOBILE && (
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute inset-[-20px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(226,232,240,0.08) 0%, transparent 70%)",
          }}
        />
      )}
      <span className="absolute w-7 h-7 rounded-full bg-black/10 top-10 left-14 blur-[1px]" />
      <span className="absolute w-4 h-4 rounded-full bg-black/10 top-24 left-8 blur-[1px]" />
      <span className="absolute w-10 h-10 rounded-full bg-black/10 top-16 left-28 blur-[1px]" />
      <span className="absolute w-5 h-5 rounded-full bg-black/10 top-36 left-20 blur-[1px]" />
    </motion.div>
  );
}

/* ─── SUN ───────────────────────────────────────── */
function Sun() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute bottom-[-6rem] left-[-5rem] w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #ffd58a 0%, #f5a742 35%, rgba(245,167,66,0.25) 60%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />
      {!IS_MOBILE && (
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute bottom-[-8rem] left-[-7rem] w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,213,138,0.15) 0%, transparent 65%)",
          }}
        />
      )}
    </>
  );
}

/* ─── PLANET ────────────────────────────────────── */
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
            style={{
              width: size * 2.1,
              height: size * 0.62,
              borderColor: ring,
              transform: "translate(-50%,-50%) rotate(-18deg)",
            }}
          />
        )}
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 32% 30%, ${colors[0]}, ${colors[1]} 60%, ${colors[2]} 100%)`,
          }}
        />
        {!IS_MOBILE && (
          <motion.div
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ─── AURORA — desktop only ─────────────────────── */
function Aurora() {
  if (IS_MOBILE) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ opacity: [0, 0.12, 0.06, 0.14, 0], scaleX: [1, 1.08, 0.96, 1.04, 1], y: [0, -10, 5, -8, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute top-[15%] left-[-10%] right-[-10%] h-28 rounded-full"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(52,211,153,0.6) 40%, rgba(96,165,250,0.4) 70%, transparent 100%)",
          filter: "blur(18px)",
        }}
      />
      <motion.div
        animate={{ opacity: [0, 0.08, 0.13, 0.05, 0], scaleX: [1, 0.94, 1.1, 0.98, 1], y: [0, 12, -6, 10, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 3 }}
        className="absolute top-[22%] left-[-5%] right-[-5%] h-20 rounded-full"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.5) 40%, rgba(52,211,153,0.3) 70%, transparent 100%)",
          filter: "blur(22px)",
        }}
      />
      {!IS_TABLET && (
        <motion.div
          animate={{ opacity: [0, 0.06, 0.1, 0.04, 0], y: [0, -6, 8, -4, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut", delay: 7 }}
          className="absolute top-[10%] left-[20%] right-[10%] h-16 rounded-full"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.5) 50%, transparent 100%)",
            filter: "blur(16px)",
          }}
        />
      )}
    </div>
  );
}

/* ─── FLOATING PARTICLES — desktop only ─────────── */
function FloatingParticles() {
  if (IS_MOBILE) return null;

  const count = IS_TABLET ? 8 : 18;
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 6 + Math.random() * 10,
        delay: Math.random() * 8,
        color: i % 3 === 0 ? "#34d399" : i % 3 === 1 ? "#60a5fa" : "#a78bfa",
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── MOUSE PARALLAX — desktop only ─────────────── */
function ParallaxLayer({ children, strength = 0.02, className = "" }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x  = useSpring(mx, { stiffness: 60, damping: 20 });
  const y  = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (IS_MOBILE) return;
    const move = (e) => {
      mx.set((e.clientX - window.innerWidth  / 2) * strength);
      my.set((e.clientY - window.innerHeight / 2) * strength);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my, strength]);

  return (
    <motion.div style={{ x, y }} className={`absolute inset-0 ${className}`}>
      {children}
    </motion.div>
  );
}

/* ─── MAIN CANVAS ────────────────────────────────── */
export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas  = canvasRef.current;
    const ctx     = canvas.getContext("2d");
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    /* ── star counts — dramatically fewer on mobile ── */
    const COUNTS = IS_MOBILE
      ? { dust: 40, far: 30, mid: 20, near: 10 }
      : IS_TABLET
      ? { dust: 100, far: 70, mid: 45, near: 25 }
      : { dust: 180, far: 140, mid: 80, near: 45 };

    const mkStars = (n, speedRange, sizeRange, colorVariants) =>
      Array.from({ length: n }, () => ({
        x:    Math.random() * W,
        y:    Math.random() * H,
        r:    sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
        baseA: 0.3 + Math.random() * 0.65,
        phase: Math.random() * Math.PI * 2,
        speed: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
        color: colorVariants[Math.floor(Math.random() * colorVariants.length)],
        twinkleAmp: 0.3 + Math.random() * 0.5,
      }));

    const starColors = ["226,232,240","226,232,240","226,232,240","200,220,255","255,230,200","180,255,220"];

    const dust = mkStars(COUNTS.dust, [0.2, 0.5], [0.2, 0.6], starColors);
    const far  = mkStars(COUNTS.far,  [0.4, 0.9], [0.4, 1.1], starColors);
    const mid  = mkStars(COUNTS.mid,  [0.8, 1.5], [0.8, 1.7], starColors);
    const near = mkStars(COUNTS.near, [1.2, 2.4], [1.2, 2.6], starColors);

    /* constellation — skip on mobile */
    const constellationStars = IS_MOBILE ? [] : [
      { x: W * 0.28, y: H * 0.18 },
      { x: W * 0.34, y: H * 0.10 },
      { x: W * 0.40, y: H * 0.20 },
      { x: W * 0.34, y: H * 0.28 },
    ];

    /* meteors — slower interval on mobile */
    const meteors = [];
    const spawnMeteor = () => {
      if (reduced) return;
      meteors.push({
        x:    Math.random() * W * 0.7 + W * 0.1,
        y:    -20,
        vx:   3 + Math.random() * 5,
        vy:   2.5 + Math.random() * 3,
        life: 0,
        max:  35 + Math.random() * 25,
        hue:  Math.random() < 0.4 ? "52,211,153" : Math.random() < 0.6 ? "255,255,255" : "168,85,247",
      });
    };

    const meteorInterval = IS_MOBILE ? 6000 : IS_TABLET ? 4000 : 2800;
    const meteorChance   = IS_MOBILE ? 0.5  : 0.7;

    const meteorTimer = reduced ? null : setInterval(() => {
      if (Math.random() < meteorChance) spawnMeteor();
      if (!IS_MOBILE && Math.random() < 0.2) spawnMeteor();
    }, meteorInterval);

    /* nebulae — fewer on mobile */
    const nebulae = IS_MOBILE
      ? [{ x: W * 0.15, y: H * 0.35, rx: 120, ry: 50, color: "52,211,153", a: 0.025 }]
      : [
          { x: W * 0.15, y: H * 0.35, rx: 180, ry: 80,  color: "52,211,153",  a: 0.035 },
          { x: W * 0.70, y: H * 0.20, rx: 140, ry: 60,  color: "96,165,250",  a: 0.03  },
          { x: W * 0.50, y: H * 0.70, rx: 200, ry: 90,  color: "168,85,247",  a: 0.025 },
        ];

    let t = 0, raf;

    /* use lower frame rate on mobile via skip-frame */
    let frameSkip = 0;
    const SKIP = IS_MOBILE ? 1 : 0; // draw every 2nd frame on mobile

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frameSkip++;
      if (frameSkip <= SKIP) return;
      frameSkip = 0;

      t += reduced ? 0 : 0.016;
      ctx.clearRect(0, 0, W, H);

      /* nebulae */
      nebulae.forEach((n) => {
        const pulse = 1 + 0.15 * Math.sin(t * 0.4 + n.x);
        const grad  = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.rx * pulse);
        grad.addColorStop(0,   `rgba(${n.color},${n.a * pulse})`);
        grad.addColorStop(0.5, `rgba(${n.color},${n.a * 0.4})`);
        grad.addColorStop(1,   `rgba(${n.color},0)`);
        ctx.save();
        ctx.scale(1, n.ry / n.rx);
        ctx.beginPath();
        ctx.arc(n.x, n.y * (n.rx / n.ry), n.rx * pulse, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      });

      /* stars */
      [dust, far, mid, near].forEach((layer) => {
        layer.forEach((s) => {
          const wave = reduced ? 0 : s.twinkleAmp * Math.sin(t * s.speed + s.phase);
          const a    = Math.max(0.05, Math.min(1, s.baseA + wave));

          /* glow only on desktop */
          if (s.r > 1.6 && !reduced && !IS_MOBILE) {
            const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
            g.addColorStop(0, `rgba(${s.color},${a * 0.5})`);
            g.addColorStop(1, `rgba(${s.color},0)`);
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color},${a})`;
          ctx.fill();

          /* cross-spike desktop only */
          if (s.r > 2 && !reduced && !IS_MOBILE) {
            ctx.strokeStyle = `rgba(${s.color},${a * 0.35})`;
            ctx.lineWidth   = 0.5;
            ctx.beginPath();
            ctx.moveTo(s.x - s.r * 4, s.y); ctx.lineTo(s.x + s.r * 4, s.y);
            ctx.moveTo(s.x, s.y - s.r * 4); ctx.lineTo(s.x, s.y + s.r * 4);
            ctx.stroke();
          }
        });
      });

      /* constellation — desktop only */
      if (!reduced && constellationStars.length > 0) {
        const conA = 0.12 + 0.06 * Math.sin(t * 0.3);
        ctx.strokeStyle = `rgba(52,211,153,${conA})`;
        ctx.lineWidth   = 0.6;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        constellationStars.forEach((s, i) => {
          if (i === 0) ctx.moveTo(s.x, s.y);
          else         ctx.lineTo(s.x, s.y);
        });
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);
        constellationStars.forEach((s) => {
          const da = 0.5 + 0.4 * Math.sin(t * 0.8 + s.x);
          ctx.beginPath();
          ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52,211,153,${da})`;
          ctx.fill();
        });
      }

      /* meteors */
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;
        m.x += m.vx;
        m.y += m.vy;

        const p      = m.life / m.max;
        const fadeA  = p < 0.2 ? p / 0.2 : p > 0.7 ? (1 - p) / 0.3 : 1;
        const tailLen = 10 + m.vx * 3.5;

        const grad = ctx.createLinearGradient(
          m.x, m.y,
          m.x - m.vx * tailLen / m.vx,
          m.y - m.vy * tailLen / m.vx
        );
        grad.addColorStop(0,   `rgba(${m.hue},${0.95 * fadeA})`);
        grad.addColorStop(0.4, `rgba(${m.hue},${0.5  * fadeA})`);
        grad.addColorStop(1,   `rgba(${m.hue},0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.8;
        ctx.lineCap     = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * tailLen / m.vx, m.y - m.vy * tailLen / m.vx);
        ctx.stroke();

        /* head glow — skip on mobile */
        if (!IS_MOBILE) {
          const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 5);
          hg.addColorStop(0, `rgba(${m.hue},${0.9 * fadeA})`);
          hg.addColorStop(1, `rgba(${m.hue},0)`);
          ctx.beginPath();
          ctx.arc(m.x, m.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = hg;
          ctx.fill();
        }

        if (m.life > m.max || m.x > W + 50 || m.y > H + 50)
          meteors.splice(i, 1);
      }
    };

    draw();

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      if (meteorTimer) clearInterval(meteorTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">

      {/* deep space */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 120% 80% at 50% -10%, #0c1a1f 0%, #060a11 55%)" }}
      />

      {/* nebula blobs — fewer & smaller on mobile */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className={`absolute rounded-full bg-[#34d399] top-[-10%] left-[-5%] ${
          IS_MOBILE ? "w-[300px] h-[300px] blur-[100px]" : "w-[600px] h-[600px] blur-[160px]"
        }`}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut", delay: 2.5 }}
        className={`absolute rounded-full bg-[#60a5fa] bottom-[-15%] right-[-5%] ${
          IS_MOBILE ? "w-[250px] h-[250px] blur-[80px]" : "w-[500px] h-[500px] blur-[160px]"
        }`}
      />
      {!IS_MOBILE && (
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut", delay: 5 }}
          className="absolute w-[400px] h-[400px] rounded-full blur-[140px] bg-[#a78bfa] top-[30%] right-[20%]"
        />
      )}

      {/* aurora — desktop only */}
      <Aurora />

      {/* floating particles — desktop only */}
      <FloatingParticles />

      {/* celestial bodies */}
      <ParallaxLayer strength={0.012}>
        <Moon />
        <Sun />
      </ParallaxLayer>

      <ParallaxLayer strength={0.022}>
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
      </ParallaxLayer>

      <ParallaxLayer strength={0.035}>
        <Planet
          className="hidden xl:block left-[55%] top-[75%]"
          size={10}
          colors={["#ff9f7f", "#cc5533", "#7a2211"]}
          delay={2}
          duration={12}
        />
      </ParallaxLayer>

      {/* canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_40%,transparent_35%,#060a11_100%)]" />

      {/* top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#060a11]/60 to-transparent" />
    </div>
  );
}