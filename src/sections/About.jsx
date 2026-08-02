import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import { useInView } from "react-intersection-observer";
import manish from "../assets/manish.png";

const READOUT_LINES = [
  { key: "role", value: '"Full-Stack Developer"' },
  { key: "focus", value: '"Cyber Security"' },
  { key: "stack", value: '["React", "Django", "PostgreSQL"]' },
  { key: "currently_building", value: '"AI ticketing assistant"' },
  { key: "dsa_problems_solved", value: "500+" },
  { key: "status", value: '"open_to_work"' },
];

/* Terminal-style readout — line-by-line reveal with a blinking cursor at
   the end, instead of generic vanity-metric cards. */
function TerminalReadout() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (shown >= READOUT_LINES.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 220);
    return () => clearTimeout(t);
  }, [inView, shown]);

  return (
    <div ref={ref} className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0f17]">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f2545b]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#f5b942]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]/70" />
        <span className="ml-3 font-mono-label text-[10px] text-[#4b5768]">whoami.json</span>
      </div>
      <div className="p-5 font-mono text-[12.5px] leading-[1.9]">
        <p className="text-[#4b5768]">$ whoami --verbose</p>
        <p className="text-[#c7d0dc]">{"{"}</p>
        {READOUT_LINES.map((line, i) => (
          <motion.p
            key={line.key}
            initial={{ opacity: 0, x: -8 }}
            animate={shown > i ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="pl-4"
          >
            <span className="text-[#60a5fa]">"{line.key}"</span>
            <span className="text-[#4b5768]">: </span>
            <span className="text-[#34d399]">{line.value}</span>
            {i < READOUT_LINES.length - 1 && <span className="text-[#c7d0dc]">,</span>}
          </motion.p>
        ))}
        <p className="text-[#c7d0dc]">
          {"}"}
          {shown >= READOUT_LINES.length && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
              className="inline-block w-2 h-3.5 bg-[#34d399] ml-1 align-middle"
            />
          )}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <SectionWrapper id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle index="01" label="Who am I" main="About" accent="me" />
        <SectionSubtitle>A quick read before you check the receipts below.</SectionSubtitle>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* PHOTO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-[#34d399]/10 to-[#60a5fa]/10 rounded-3xl blur-2xl" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                <img src={manish} alt="Manish Dange" className="w-full h-full object-cover"  loading="lazy"    
  decoding="async" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { icon: <MapPin size={13} />, text: "Indore, Madhya Pradesh, India" },
                { icon: <Mail size={13} />,   text: "dangemanish35@gmail.com" },
                { icon: <Phone size={13} />,  text: "+91 78038 61195" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[#7c8aa0] text-xs">
                  <span className="text-[#34d399]">{c.icon}</span>{c.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <p className="text-gray-200 mb-4 leading-8 text-[15px]">
              I'm a <span className="text-[#34d399] font-medium">Computer Science undergraduate</span> at
              Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV), Indore, specializing in Information &amp;
              Cyber Security — currently in my 3rd year.
            </p>
            <p className="text-[#7c8aa0] mb-6 leading-7 text-sm">
              Day to day, I build full-stack products with React on the front end and Django REST
              Framework on the back — job portals, student note-sharing platforms, and CRM tools that
              are actually in use, not just tutorial clones. The cyber security specialization shapes how
              I build: auth flows, input validation, and API security aren't an afterthought for me.
              Outside of shipping, I spend time on LeetCode and HackerRank sharpening data structures
              and algorithms.
            </p>

            <TerminalReadout />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}