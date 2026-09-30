import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function StarField() {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Stars Generation
    const starCount = isMobile ? 80 : 220;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));

    // Shooting Stars / Meteors
    const meteors = [];
    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 4,
        alpha: 1,
      });
    };

    const interval = setInterval(spawnMeteor, isMobile ? 4000 : 2200);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha >= 1 || star.alpha <= 0.2) {
          star.direction *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      // Draw Meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.speed;
        m.y += m.speed * 0.6;
        m.alpha -= 0.015;

        if (m.alpha <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        const grad = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x - m.length,
          m.y - m.length * 0.6
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.length, m.y - m.length * 0.6);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030712]">
      {/* Sky Atmospheric Gradient Base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% -10%, #0c2340 0%, #030712 80%)",
        }}
      />

      {/* Realistic Moon & Ambient Light */}
      <div
        className="absolute top-8 right-10 md:top-12 md:right-20 w-24 h-24 md:w-36 md:h-36 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 40%, #94a3b8 100%)",
          boxShadow: "0 0 50px 10px rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="absolute w-4 h-4 rounded-full bg-black/10 top-[20%] left-[30%]" />
        <div className="absolute w-6 h-6 rounded-full bg-black/10 top-[45%] left-[50%]" />
        <div className="absolute w-3 h-3 rounded-full bg-black/10 top-[60%] left-[25%]" />
      </div>

      {/* Soft Nebula Clouds */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute -top-20 left-1/4 w-[500px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none"
      />

      {/* Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}