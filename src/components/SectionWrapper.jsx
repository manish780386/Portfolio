import React from "react";
import { motion } from "framer-motion";

export function SectionWrapper({ id, children, className = "" }) {
  return (
    <section id={id} className={`relative z-10 ${className}`}>
      {children}
    </section>
  );
}

export function SectionTitle({ pre, main, accent }) {
  return (
    <div className="text-center mb-4">
      {pre && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-cyan-500 text-sm font-semibold tracking-widest uppercase mb-3"
        >
          {pre}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-black tracking-tight"
      >
        {main}{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
          {accent}
        </span>
      </motion.h2>
    </div>
  );
}

export function SectionSubtitle({ children }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-center text-gray-500 text-base max-w-xl mx-auto mb-14"
    >
      {children}
    </motion.p>
  );
}

export function GlassCard({ children, className = "", hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      transition={{ duration: 0.2 }}
      className={`p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}