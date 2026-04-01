import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

const CERTS = [
  { title: "Internet of Things (IoT)", org: "NPTEL", icon: "🌐", color: "from-blue-500 to-indigo-500", year: "2024" },
  { title: "Soft Skills for Professionals", org: "NPTEL", icon: "🤝", color: "from-green-500 to-teal-500", year: "2024" },
  { title: "Artificial Intelligence", org: "Physics Wallah", icon: "🤖", color: "from-purple-500 to-pink-500", year: "2023" },
  { title: "Python Essentials", org: "Cisco", icon: "🐍", color: "from-yellow-500 to-orange-500", year: "2023" },
  { title: "Intro to Cybersecurity", org: "Cisco", icon: "🔒", color: "from-red-500 to-rose-500", year: "2023" },
  { title: "CSICI Certified Instructor", org: "TheTechUnique Academy", icon: "🎓", color: "from-cyan-500 to-blue-500", year: "2024" },
  { title: "Python Programming", org: "Infosys", icon: "💻", color: "from-indigo-500 to-purple-500", year: "2023" },
  { title: "React Bootcamp", org: "LetsUpgrade", icon: "⚛️", color: "from-cyan-400 to-teal-500", year: "2023" },
];

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle pre="Always Learning" main="My" accent="Certifications" />
        <SectionSubtitle>Continuous learning is the foundation of expertise</SectionSubtitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -5 }}
              className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] cursor-pointer overflow-hidden"
            >
              {/* HOVER GLOW */}
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 rounded-2xl`} />

              {/* YEAR BADGE */}
              <div className="absolute top-4 right-4 text-[10px] text-gray-600 font-medium">{c.year}</div>

              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1 leading-tight pr-6">{c.title}</h3>
              <p className="text-gray-600 text-[11px] mb-4">{c.org}</p>

              {/* BOTTOM LINE ANIMATION */}
              <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${c.color} transition-all duration-500 rounded`} />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}