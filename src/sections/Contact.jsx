import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Code2, Send, CheckCircle2, Copy, Sparkles, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import StatusChip from "../components/StatusChip";

const SOCIALS = [
  { 
    name: "LinkedIn", 
    url: "https://www.linkedin.com/in/manish-dange-2a03b6312/", 
    icon: <Linkedin size={18} />, 
    handle: "@manish-dange",
    color: "from-blue-500/20 to-cyan-500/10" 
  },
  { 
    name: "GitHub", 
    url: "https://github.com/manish780386", 
    icon: <Github size={18} />, 
    handle: "@manish780386",
    color: "from-purple-500/20 to-pink-500/10" 
  },
  { 
    name: "LeetCode", 
    url: "https://leetcode.com/u/dangemanish/", 
    icon: <Code2 size={18} />, 
    handle: "@dangemanish",
    color: "from-amber-500/20 to-orange-500/10" 
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("dangemanish35@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // Simulated API call
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setIsSubmitted(true);
    toast.success(`Thanks ${form.name.split(" ")[0] || ""}! Message sent successfully.`);
    setForm({ name: "", email: "", message: "" });

    // Reset success animation state after a few seconds
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <SectionWrapper id="contact" className="py-24 relative overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#34d399]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionTitle label="Let's talk" main="Get in" accent="touch" />
        <SectionSubtitle>
          Open to internships, freelance work, and exciting collaborations. Feel free to drop a line!
        </SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-10 items-stretch mt-12">
          {/* LEFT COLUMN: INFO & SOCIALS */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between space-y-8"
          >
            <div>
              <div className="inline-block mb-6">
                <StatusChip tone="active" pulse>Available for work</StatusChip>
              </div>

              {/* Direct Info Cards */}
              <div className="space-y-4">
                {/* Email Card with Copy Functionality */}
                <div 
                  onClick={copyEmail}
                  className="group relative flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:border-[#34d399]/40 hover:bg-white/[0.05] transition-all cursor-pointer shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <span className="p-3 rounded-xl bg-[#34d399]/10 text-[#34d399] group-hover:scale-110 transition-transform">
                      <Mail size={18} />
                    </span>
                    <div>
                      <p className="text-[10px] text-[#8e9bb0] font-mono tracking-wider uppercase">Email Me</p>
                      <p className="text-gray-100 text-sm font-medium">dangemanish35@gmail.com</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="p-2 text-[#7c8aa0] group-hover:text-[#34d399] transition-colors"
                    title="Copy Email"
                  >
                    {copied ? <CheckCircle2 size={16} className="text-[#34d399]" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Location Card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08]">
                  <span className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="text-[10px] text-[#8e9bb0] font-mono tracking-wider uppercase">Location</p>
                    <p className="text-gray-100 text-sm font-medium">Indore, MP, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links Grid */}
              <h4 className="text-xs font-mono tracking-wider uppercase text-[#7c8aa0] mt-8 mb-4 flex items-center gap-2">
                <Sparkles size={14} className="text-[#34d399]" /> Connect with me
              </h4>

              <div className="grid gap-3">
                {SOCIALS.map((s) => (
                  <motion.a 
                    key={s.name} 
                    href={s.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r ${s.color} bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.18] transition-all group`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-xl bg-white/[0.05] text-gray-300 group-hover:text-[#34d399] transition-colors">
                        {s.icon}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-200 group-hover:text-white">{s.name}</p>
                        <p className="text-xs text-[#6b7688] font-mono">{s.handle}</p>
                      </div>
                    </div>
                    <ExternalLink size={15} className="text-[#525f73] group-hover:text-[#34d399] transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] relative flex flex-col justify-center shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-[#34d399]/20 text-[#34d399] rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-sm text-gray-400 max-w-xs mx-auto">
                    Thanks for reaching out! I've received your message and will reply shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    Send a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#8e9bb0] uppercase">Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="John Doe" 
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#4b5768] text-sm focus:outline-none focus:border-[#34d399] focus:bg-white/[0.05] transition-all" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#8e9bb0] uppercase">Email</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="john@example.com" 
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#4b5768] text-sm focus:outline-none focus:border-[#34d399] focus:bg-white/[0.05] transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#8e9bb0] uppercase">Message</label>
                    <textarea 
                      required 
                      placeholder="Hi Manish, I'd like to talk about a potential project..." 
                      rows="4" 
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#4b5768] text-sm focus:outline-none focus:border-[#34d399] focus:bg-white/[0.05] transition-all resize-none" 
                    />
                  </div>

                  <motion.button 
                    type="submit" 
                    disabled={sending} 
                    whileHover={{ scale: 1.01 }} 
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl bg-[#34d399] hover:bg-[#2ebd87] font-bold text-[#060a11] text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#34d399]/20 disabled:opacity-60 transition-all cursor-pointer"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#060a11]/30 border-t-[#060a11] rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-[11px] text-[#6b7688] pt-2">
                    Prefer direct mail?{" "}
                    <a href="mailto:dangemanish35@gmail.com" className="text-[#34d399] hover:underline font-medium">
                      dangemanish35@gmail.com
                    </a>
                  </p>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}