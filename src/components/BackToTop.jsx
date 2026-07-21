import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setShow(scrollTop > 400);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <circle
              cx="24" cy="24" r="20" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 20}
              strokeDashoffset={2 * Math.PI * 20 * (1 - progress / 100)}
              style={{ transition: "stroke-dashoffset 0.2s" }}
            />
          </svg>
          <div className="w-9 h-9 rounded-full bg-[#0d131d] border border-white/10 flex items-center justify-center">
            <ArrowUp size={16} className="text-[#34d399]" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}