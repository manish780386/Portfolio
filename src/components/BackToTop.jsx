import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => scroll.scrollToTop({ duration: 600 })}
          className="fixed bottom-10 right-10 p-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-full shadow-lg hover:scale-110 hover:rotate-12 hover:shadow-cyan-400/50 transition-all cursor-pointer z-50"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <ArrowUp size={24} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;
