import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Activity, Github, Linkedin, Codepen, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper.jsx";

const SOCIALS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/manish-dange-2a03b6312/", icon: <Linkedin size={16} />, color: "from-blue-500 to-blue-600" },
  { name: "GitHub", url: "https://github.com/manish780386", icon: <Github size={16} />, color: "from-gray-600 to-gray-700" },
  { name: "LeetCode", url: "https://leetcode.com/u/dangemanish/", icon: <Codepen size={16} />, color: "from-yellow-500 to-orange-500" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    toast.success(`Message sent! I'll get back to you soon, ${form.name.split(" ")[0]} 👋`, { duration: 4000 });
  };

  return (
    <SectionWrapper id="contact" className="py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle pre="Let's Talk" main="Contact" accent="Me" />
        <SectionSubtitle>Open for internships, freelance, and collaboration</SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-bold text-white mb-2">Let's Build Together 🚀</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Whether you have a project in mind, want to discuss tech, or are looking
              for a passionate developer — I'd love to connect!
            </p>

            <div className="space-y-3 mb-8">
              {[
                { icon: <Mail size={16} />, label: "Email", value: "dangemanish35@gmail.com" },
                { icon: <MapPin size={16} />, label: "Location", value: "Indore, MP, India" },
                { icon: <Activity size={16} />, label: "Status", value: "Available for Work 🟢" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.025] border border-white/[0.06]"
                >
                  <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">{item.icon}</span>
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-wider">{item.label}</p>
                    <p className="text-gray-200 text-sm font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Find Me On</h4>
            <div className="flex flex-col gap-2">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.url}
                  target="_blank"
                  whileHover={{ x: 4, scale: 1.02 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition group"
                >
                  <div className={`p-1.5 rounded-lg bg-gradient-to-br ${s.color} text-white`}>
                    {s.icon}
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition">{s.name}</span>
                  <span className="ml-auto text-gray-700 group-hover:text-gray-400 transition text-xs">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "name", placeholder: "Your Name", type: "text" },
                  { key: "email", placeholder: "Email Address", type: "email" },
                ].map((field) => (
                  <input
                    key={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/40 transition"
                    required
                  />
                ))}
              </div>

              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/40 transition"
              />

              <textarea
                placeholder="Your message..."
                rows="5"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/40 transition resize-none"
                required
              />

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,200,255,0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 font-bold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-all shadow-lg shadow-cyan-500/15"
              >
                {sending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}