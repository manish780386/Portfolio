import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Code2, Send } from "lucide-react";
import toast from "react-hot-toast";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import StatusChip from "../components/StatusChip";

const SOCIALS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/manish-dange-2a03b6312/", icon: <Linkedin size={15} /> },
  { name: "GitHub", url: "https://github.com/manish780386", icon: <Github size={15} /> },
  { name: "LeetCode", url: "https://leetcode.com/u/dangemanish/", icon: <Code2 size={15} /> },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // NOTE: no backend/email service is wired up yet — this only simulates
    // the send so the UI has feedback. Wire this to Formspree, EmailJS, or
    // a small serverless function before relying on it for real leads;
    // until then the mailto link below is the reliable path.
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    toast.success(`Thanks ${form.name.split(" ")[0] || ""}! I'll get back to you soon.`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <SectionWrapper id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle index="07" label="Let's talk" main="Get in" accent="touch" />
        <SectionSubtitle>Open to internships, freelance work and interesting collaborations.</SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <StatusChip tone="active" pulse>Available for work</StatusChip>

            <div className="space-y-3 mt-6 mb-8">
              {[
                { icon: <Mail size={15} />, label: "Email", value: "dangemanish35@gmail.com", href: "mailto:dangemanish35@gmail.com" },
                { icon: <MapPin size={15} />, label: "Location", value: "Indore, MP, India" },
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition">
                  <span className="p-2 rounded-lg bg-[#34d399]/10 text-[#34d399]">{item.icon}</span>
                  <div>
                    <p className="text-[10px] text-[#4b5768] font-mono-label uppercase">{item.label}</p>
                    <p className="text-gray-200 text-sm font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <h4 className="text-xs font-mono-label uppercase text-[#4b5768] mb-3">Find me on</h4>
            <div className="flex flex-col gap-2">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition group">
                  <span className="text-[#7c8aa0] group-hover:text-[#34d399] transition">{s.icon}</span>
                  <span className="text-sm text-[#7c8aa0] group-hover:text-white transition">{s.name}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="Your name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#4b5768] text-sm focus:outline-none focus:border-[#34d399]/50 transition" />
                <input required type="email" placeholder="Email address" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#4b5768] text-sm focus:outline-none focus:border-[#34d399]/50 transition" />
              </div>
              <textarea required placeholder="Your message..." rows="5" value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#4b5768] text-sm focus:outline-none focus:border-[#34d399]/50 transition resize-none" />
              <motion.button type="submit" disabled={sending} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-[#34d399] font-bold text-[#060a11] text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-all">
                {sending ? (
                  <><span className="w-4 h-4 border-2 border-[#060a11]/30 border-t-[#060a11] rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><Send size={15} /> Send Message</>
                )}
              </motion.button>
              <p className="text-center text-[10px] text-[#4b5768]">
                Prefer email? Reach me directly at{" "}
                <a href="mailto:dangemanish35@gmail.com" className="text-[#34d399] hover:underline">dangemanish35@gmail.com</a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}