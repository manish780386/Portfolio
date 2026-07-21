import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../components/SectionWrapper";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import manish from "../assets/manish.png";

const STATS = [
  { val: 20,  suffix: "+", label: "Projects built" },
  { val: 240, suffix: "+", label: "DSA problems solved" },
  { val: 10,  suffix: "+", label: "Certifications" },
  { val: 1,   suffix: "",  label: "Active internship" },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

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
                <img src={manish} alt="Manish Dange" className="w-full h-full object-cover" />
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" ref={ref}>
              {STATS.map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="text-xl font-bold text-white font-mono-label">
                    {inView ? <CountUp end={s.val} duration={1.6} suffix={s.suffix} /> : `0${s.suffix}`}
                  </div>
                  <div className="text-[10px] text-[#7c8aa0] mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}