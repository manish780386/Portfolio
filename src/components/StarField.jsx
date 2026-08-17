import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

/* ══════════════════════════════════════════════════
   MOBILE-SAFE 3D SPACE BACKGROUND
   • IS_MOBILE checked inside hooks/effects only
   • Canvas: minimal stars on mobile, skip glow/spikes
   • No blur filters on mobile (GPU killer)
   • No aurora, no floating particles on mobile
   • No parallax on mobile (mousemove = zero cost)
   • Meteors: rare on mobile
══════════════════════════════════════════════════ */

/* ─── MOON ─────────────────────────────────────── */
function Moon({ isMobile }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: isMobile ? "-3rem" : "-4rem",
        right: isMobile ? "-3rem" : "-3rem",
        width: isMobile ? 120 : 220,
        height: isMobile ? 120 : 220,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 35% 32%, #f4f1ea 0%, #cfd3d8 28%, #9aa0aa 55%, #5c626e 100%)",
        boxShadow: isMobile
          ? "inset -12px -8px 20px rgba(0,0,0,0.45)"
          : "0 0 60px 6px rgba(226,232,240,0.08), inset -22px -18px 40px rgba(0,0,0,0.45)",
      }}
    >
      {/* craters */}
      <span className="absolute w-5 h-5 rounded-full bg-black/10 top-[14%] left-[34%]" style={{ filter: "blur(1px)" }} />
      <span className="absolute w-3 h-3 rounded-full bg-black/10 top-[44%] left-[16%]" style={{ filter: "blur(1px)" }} />
      <span className="absolute w-7 h-7 rounded-full bg-black/10 top-[28%] left-[52%]" style={{ filter: "blur(1.5px)" }} />
      <span className="absolute w-4 h-4 rounded-full bg-black/10 top-[60%] left-[38%]" style={{ filter: "blur(1px)" }} />
    </div>
  );
}

/* ─── SUN ───────────────────────────────────────── */
function Sun({ isMobile }) {
  if (isMobile) {
    /* on mobile just a simple static glow — no animation cost */
    return (
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-5rem", left: "-5rem",
          width: 160, height: 160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #ffd58a 0%, #f5a742 40%, transparent 72%)",
        }}
      />
    );
  }
  return (
    <>
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute pointer-events-none"
        style={{
          bottom: "-6rem", left: "-5rem",
          width: 240, height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #ffd58a 0%, #f5a742 35%, rgba(245,167,66,0.25) 60%, transparent 75%)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute pointer-events-none"
        style={{
          bottom: "-8rem", left: "-7rem",
          width: 320, height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,213,138,0.15) 0%, transparent 65%)",
        }}
      />
    </>
  );
}

/* ─── PLANET ────────────────────────────────────── */
function Planet({ style, size, colors, ringColor, dur = 9, delay = 0, isMobile }) {
  if (isMobile) return null; /* planets hidden on mobile */
  return (
    <motion.div
      className="absolute hidden md:block pointer-events-none"
      style={style}
      animate={{ y: [0, -14, 0] }}
      transition={{ repeat: Infinity, duration: dur, ease: "easeInOut", delay }}
    >
      <div style={{ width: size, height: size, position: "relative" }}>
        {ringColor && (
          <div
            style={{
              position: "absolute",
              width: size * 2.1, height: size * 0.62,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%) rotate(-18deg)",
              borderRadius: "50%",
              border: `1px solid ${ringColor}`,
            }}
          />
        )}
        <div
          style={{
            width: "100%", height: "100%",
            borderRadius: "50%",
            background: `radial-gradient(circle at 32% 30%, ${colors[0]}, ${colors[1]} 60%, ${colors[2]} 100%)`,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── AURORA — desktop only ─────────────────────── */
function Aurora() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
      <motion.div
        animate={{ opacity: [0, 0.12, 0.06, 0.14, 0], y: [0, -10, 5, -8, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "14%", left: "-10%", right: "-10%",
          height: 100,
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(52,211,153,0.55) 40%, rgba(96,165,250,0.35) 70%, transparent 100%)",
          filter: "blur(18px)",
        }}
      />
      <motion.div
        animate={{ opacity: [0, 0.08, 0.13, 0.05, 0], y: [0, 12, -6, 10, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute",
          top: "22%", left: "-5%", right: "-5%",
          height: 70,
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.45) 40%, rgba(52,211,153,0.25) 70%, transparent 100%)",
          filter: "blur(22px)",
        }}
      />
    </div>
  );
}

/* ─── FLOATING PARTICLES — desktop only ─────────── */
function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        dur: 7 + Math.random() * 10,
        delay: Math.random() * 8,
        color: i % 3 === 0 ? "#34d399" : i % 3 === 1 ? "#60a5fa" : "#a78bfa",
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.color,
          }}
          animate={{ y: [0, -28, 0], opacity: [0, 0.7, 0] }}
          transition={{ repeat: Infinity, duration: p.dur, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── MOUSE PARALLAX LAYER — desktop only ────────── */
function ParallaxLayer({ children, strength }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.innerWidth < 768) return; /* skip on mobile */

    const onMove = (e) => {
      const x = (e.clientX - window.innerWidth  / 2) * strength;
      const y = (e.clientY - window.innerHeight / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);

  return (
    <div
      ref={ref}
      className="absolute inset-0"
      style={{ willChange: "transform", transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN CANVAS
══════════════════════════════════════════════════ */
function StarCanvas({ isMobile, isTablet }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas  = canvasRef.current;
    const ctx     = canvas.getContext("2d");
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    /* star counts */
    const C = isMobile
      ? { dust: 35, far: 25, mid: 15, near: 8 }
      : isTablet
      ? { dust: 90, far: 65, mid: 40, near: 20 }
      : { dust: 170, far: 130, mid: 75, near: 42 };

    const mkStars = (n, spR, szR) =>
      Array.from({ length: n }, () => ({
        x:    Math.random() * W,
        y:    Math.random() * H,
        r:    szR[0] + Math.random() * (szR[1] - szR[0]),
        a:    0.3  + Math.random() * 0.65,
        ph:   Math.random() * Math.PI * 2,
        spd:  spR[0] + Math.random() * (spR[1] - spR[0]),
        twk:  0.25 + Math.random() * 0.5,
        col:  ["226,232,240","226,232,240","226,232,240","200,220,255","255,230,200"][Math.floor(Math.random()*5)],
      }));

    const layers = [
      mkStars(C.dust, [0.2,0.5], [0.2,0.5]),
      mkStars(C.far,  [0.4,0.9], [0.4,1.1]),
      mkStars(C.mid,  [0.8,1.5], [0.7,1.6]),
      mkStars(C.near, [1.2,2.4], [1.0,2.4]),
    ];

    /* nebulae */
    const NEBULAE = isMobile
      ? [{ x: W*0.12, y: H*0.3, rx:100, ry:40, col:"52,211,153",  a:0.022 }]
      : [
          { x: W*0.12, y: H*0.32, rx:180, ry:80, col:"52,211,153",  a:0.032 },
          { x: W*0.70, y: H*0.18, rx:140, ry:60, col:"96,165,250",  a:0.028 },
          { x: W*0.48, y: H*0.70, rx:200, ry:88, col:"168,85,247",  a:0.022 },
        ];

    /* constellation — desktop only */
    const CONS = isMobile ? [] : [
      { x:W*0.28, y:H*0.18 }, { x:W*0.34, y:H*0.10 },
      { x:W*0.40, y:H*0.20 }, { x:W*0.34, y:H*0.28 },
    ];

    /* meteors */
    const meteors = [];
    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * W * 0.7 + W * 0.1, y: -20,
        vx: 3 + Math.random() * 5,
        vy: 2.5 + Math.random() * 3,
        life: 0, max: 35 + Math.random() * 25,
        hue: Math.random() < 0.4 ? "52,211,153" : "255,255,255",
      });
    };

    const mInterval = isMobile ? 6500 : 2800;
    const mChance   = isMobile ? 0.4  : 0.7;
    const mTimer = reduced ? null : setInterval(() => {
      if (Math.random() < mChance) spawnMeteor();
    }, mInterval);

    /* skip-frame for mobile — draw every 2nd frame */
    let frameSkip = 0;
    const SKIP_FRAMES = isMobile ? 1 : 0;

    let t = 0, raf;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frameSkip++;
      if (frameSkip <= SKIP_FRAMES) return;
      frameSkip = 0;

      t += reduced ? 0 : 0.016;
      ctx.clearRect(0, 0, W, H);

      /* nebulae */
      NEBULAE.forEach(n => {
        const pulse = 1 + 0.14 * Math.sin(t * 0.38 + n.x * 0.01);
        const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.rx * pulse);
        gr.addColorStop(0,   `rgba(${n.col},${n.a * pulse})`);
        gr.addColorStop(0.5, `rgba(${n.col},${n.a * 0.4})`);
        gr.addColorStop(1,   `rgba(${n.col},0)`);
        ctx.save();
        ctx.scale(1, n.ry / n.rx);
        ctx.beginPath();
        ctx.arc(n.x, n.y * (n.rx/n.ry), n.rx * pulse, 0, Math.PI*2);
        ctx.fillStyle = gr;
        ctx.fill();
        ctx.restore();
      });

      /* stars */
      layers.forEach(stars => {
        stars.forEach(s => {
          const wave = reduced ? 0 : s.twk * Math.sin(t * s.spd + s.ph);
          const a = Math.max(0.04, Math.min(1, s.a + wave));

          /* glow — only on desktop for performance */
          if (s.r > 1.5 && !reduced && !isMobile) {
            const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4.5);
            g.addColorStop(0, `rgba(${s.col},${a * 0.45})`);
            g.addColorStop(1, `rgba(${s.col},0)`);
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 4.5, 0, Math.PI*2);
            ctx.fillStyle = g;
            ctx.fill();
          }

          /* star core */
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
          ctx.fillStyle = `rgba(${s.col},${a})`;
          ctx.fill();

          /* cross-spike — desktop only */
          if (s.r > 2 && !reduced && !isMobile) {
            ctx.strokeStyle = `rgba(${s.col},${a * 0.3})`;
            ctx.lineWidth = 0.5;
            const len = s.r * 5;
            ctx.beginPath();
            ctx.moveTo(s.x-len,s.y); ctx.lineTo(s.x+len,s.y);
            ctx.moveTo(s.x,s.y-len); ctx.lineTo(s.x,s.y+len);
            ctx.stroke();
          }
        });
      });

      /* constellation — desktop only */
      if (!reduced && CONS.length > 0) {
        const ca = 0.1 + 0.05 * Math.sin(t * 0.28);
        ctx.strokeStyle = `rgba(52,211,153,${ca})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4,6]);
        ctx.beginPath();
        CONS.forEach((s,i) => i===0 ? ctx.moveTo(s.x,s.y) : ctx.lineTo(s.x,s.y));
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);
        CONS.forEach(s => {
          const da = 0.5 + 0.38 * Math.sin(t * 0.85 + s.x);
          ctx.beginPath();
          ctx.arc(s.x, s.y, 2, 0, Math.PI*2);
          ctx.fillStyle = `rgba(52,211,153,${da})`;
          ctx.fill();
        });
      }

      /* meteors */
      for (let i = meteors.length-1; i >= 0; i--) {
        const m = meteors[i];
        m.life++; m.x += m.vx; m.y += m.vy;
        const p = m.life / m.max;
        const fade = p < 0.2 ? p/0.2 : p > 0.7 ? (1-p)/0.3 : 1;
        const tail = 10 + m.vx * 3.5;

        const gr = ctx.createLinearGradient(m.x, m.y, m.x - m.vx*tail/m.vx, m.y - m.vy*tail/m.vx);
        gr.addColorStop(0,   `rgba(${m.hue},${0.9*fade})`);
        gr.addColorStop(0.4, `rgba(${m.hue},${0.45*fade})`);
        gr.addColorStop(1,   `rgba(${m.hue},0)`);
        ctx.strokeStyle = gr;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx*tail/m.vx, m.y - m.vy*tail/m.vx);
        ctx.stroke();

        /* head glow — desktop only */
        if (!isMobile) {
          const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 5);
          hg.addColorStop(0, `rgba(${m.hue},${0.85*fade})`);
          hg.addColorStop(1, `rgba(${m.hue},0)`);
          ctx.beginPath();
          ctx.arc(m.x, m.y, 5, 0, Math.PI*2);
          ctx.fillStyle = hg;
          ctx.fill();
        }

        if (m.life > m.max || m.x > W+50 || m.y > H+50) meteors.splice(i,1);
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
      if (mTimer) clearInterval(mTimer);
      window.removeEventListener("resize", resize);
    };
  }, [isMobile, isTablet]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

/* ══════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════ */
export default function StarField() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  /* detect inside useEffect — avoids SSR mismatch */
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">

      {/* ── deep space base ── */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 120% 80% at 50% -10%, #0c1a1f 0%, #060a11 55%)" }}
      />

      {/* ── nebula CSS blobs ──
           Mobile: tiny, no blur filter — use opacity instead
           Desktop: big blurred blobs */}
      {isMobile ? (
        /* mobile: simple radial gradients, zero blur, zero animation cost */
        <>
          <div className="absolute rounded-full"
            style={{ width:200, height:200, top:"-5%", left:"-5%",
              background:"radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)" }} />
          <div className="absolute rounded-full"
            style={{ width:180, height:180, bottom:"-10%", right:"-5%",
              background:"radial-gradient(circle, rgba(96,165,250,0.10) 0%, transparent 70%)" }} />
        </>
      ) : (
        /* desktop: full animated blobs with blur */
        <>
          <motion.div
            animate={{ scale:[1,1.1,1], opacity:[0.08,0.16,0.08] }}
            transition={{ repeat:Infinity, duration:9, ease:"easeInOut" }}
            className="absolute rounded-full bg-[#34d399]"
            style={{ width:600, height:600, top:"-12%", left:"-6%", filter:"blur(160px)" }}
          />
          <motion.div
            animate={{ scale:[1,1.12,1], opacity:[0.06,0.13,0.06] }}
            transition={{ repeat:Infinity, duration:11, ease:"easeInOut", delay:2.5 }}
            className="absolute rounded-full bg-[#60a5fa]"
            style={{ width:500, height:500, bottom:"-18%", right:"-6%", filter:"blur(160px)" }}
          />
          <motion.div
            animate={{ scale:[1,1.06,1], opacity:[0.04,0.09,0.04] }}
            transition={{ repeat:Infinity, duration:14, ease:"easeInOut", delay:5 }}
            className="absolute rounded-full bg-[#a78bfa]"
            style={{ width:380, height:380, top:"30%", right:"18%", filter:"blur(130px)" }}
          />
        </>
      )}

      {/* ── aurora — desktop only ── */}
      <Aurora />

      {/* ── floating particles — desktop only ── */}
      <FloatingParticles />

      {/* ── celestial bodies ── */}
      <ParallaxLayer strength={0.012}>
        <div className="absolute inset-0">
          <Moon isMobile={isMobile} />
          <Sun  isMobile={isMobile} />
        </div>
      </ParallaxLayer>

      {/* ── planets — desktop only ── */}
      <ParallaxLayer strength={0.022}>
        <div className="absolute inset-0">
          <Planet
            style={{ left:"8%", top:"62%" }} size={30}
            colors={["#f7c98c","#d98c4a","#7a4a20"]}
            ringColor="rgba(247,201,140,0.35)"
            dur={10} isMobile={isMobile}
          />
          <Planet
            style={{ right:"12%", top:"30%" }} size={16}
            colors={["#8fd6ff","#4c8fc9","#1c3b57"]}
            dur={8} delay={1.2} isMobile={isMobile}
          />
        </div>
      </ParallaxLayer>

      {/* ── canvas: stars + nebulae + meteors + constellations ── */}
      <StarCanvas isMobile={isMobile} isTablet={isTablet} />

      {/* ── vignette ── */}
      <div className="absolute inset-0"
        style={{ background:"radial-gradient(ellipse 80% 80% at 50% 40%, transparent 30%, #060a11 100%)" }}
      />

      {/* ── top fade ── */}
      <div className="absolute top-0 left-0 right-0 h-28"
        style={{ background:"linear-gradient(to bottom, rgba(6,10,17,0.65) 0%, transparent 100%)" }}
      />
    </div>
  );
}