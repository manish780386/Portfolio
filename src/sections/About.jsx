import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Activity, ExternalLink } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";

const SKILLS = [
  { name: "Python", color: "bg-blue-500/20 text-blue-300 border-blue-500/20" },
  { name: "React", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/20" },
  { name: "TypeScript", color: "bg-blue-400/20 text-blue-300 border-blue-400/20" },
  { name: "Django", color: "bg-green-500/20 text-green-300 border-green-500/20" },
  { name: "React Native", color: "bg-purple-500/20 text-purple-300 border-purple-500/20" },
  { name: "Next.js", color: "bg-gray-400/20 text-gray-300 border-gray-400/20" },
  { name: "Cyber Security", color: "bg-red-500/20 text-red-300 border-red-500/20" },
  { name: "SQL", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/20" },
  { name: "Tailwind", color: "bg-teal-500/20 text-teal-300 border-teal-500/20" },
  { name: "JavaScript", color: "bg-yellow-400/20 text-yellow-200 border-yellow-400/20" },
  { name: "Docker", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/20" },
  { name: "Git", color: "bg-orange-500/20 text-orange-300 border-orange-500/20" },
];

export default function About() {
  return (
    <SectionWrapper id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle pre="Who am I?" main="About" accent="Me" />
        <SectionSubtitle>Passionate developer, curious by nature, builder at heart</SectionSubtitle>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-900/40 to-indigo-900/40 flex items-center justify-center">
                <span className="text-8xl">👨‍💻</span>
                {/* Replace above with: <img src={image1} className="w-full h-full object-cover" alt="Manish" /> */}
              </div>
              {/* FLOATING CARDS */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-4 -right-4 bg-[#0d1117] border border-cyan-500/20 px-3 py-2 rounded-xl text-xs font-semibold text-cyan-400 shadow-xl"
              >
                🚀 Open to Work
              </motion.div>
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ repeat: Infinity, duration: 3.5 }}
                className="absolute -top-4 -left-4 bg-[#0d1117] border border-indigo-500/20 px-3 py-2 rounded-xl text-xs font-semibold text-indigo-400 shadow-xl"
              >
                🎓 SVVV Indore
              </motion.div>
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-3"
          >
            <p className="text-gray-300 mb-4 leading-8 text-base">
              I'm a <span className="text-cyan-400 font-semibold">Computer Science undergraduate</span> at SVVV Indore,
              specializing in Information and Cyber Security. I love building products that merge technology with creativity.
            </p>
            <p className="text-gray-500 mb-8 leading-7 text-sm">
              From sentiment analysis tools to anomaly detection systems to full-stack web applications —
              I enjoy solving real-world problems with clean, efficient code. Currently deepening my expertise in
              AI/ML integration and advanced backend architecture with Django & REST APIs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: <MapPin size={15} />, label: "Location", value: "Indore, MP, India" },
                { icon: <Mail size={15} />, label: "Email", value: "dangemanish780386@gmail.com", small: true },
                { icon: <Activity size={15} />, label: "Status", value: "Available 🟢" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-cyan-400 mt-0.5 shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className={`text-gray-300 font-medium ${item.small ? "text-[11px]" : "text-xs"}`}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-widest">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-default ${s.color}`}
                >
                  {s.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}