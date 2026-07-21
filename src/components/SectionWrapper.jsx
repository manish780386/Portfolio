import React from "react";
import { motion } from "framer-motion";

export function SectionWrapper({ id, children, className = "" }) {
  return (
    <section id={id} className={`relative z-10 scroll-mt-20 ${className}`}>
      {children}
    </section>
  );
}

export function SectionTitle({ index, label, main, accent }) {
  return (
    <div className="mb-4">
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-[#34d399] font-mono-label text-xs uppercase mb-3"
        >
          {index && <span className="text-[#4b5768]">{index}</span>}
          {label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold tracking-tight text-white"
      >
        {main}{" "}
        {accent && <span className="text-[#7c8aa0] font-normal">{accent}</span>}
      </motion.h2>
    </div>
  );
}

export function SectionSubtitle({ children }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
      className="text-[#7c8aa0] text-sm max-w-xl mb-12 leading-relaxed"
    >
      {children}
    </motion.p>
  );
}