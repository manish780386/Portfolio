
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import image1 from './assets/image1.png'; // Replace with your image path
import BackToTop from "./components/BackToTop";






/* ================= APP ================= */
export default function App() {
  return (
    <div className="bg-[#06070d] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Experience />
      <Certifications />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

/* ================= NAVBAR ================= */


function Navbar() {
  const links = ["home", "about", "projects", "skills", "contact"];
  const [openFeatures, setOpenFeatures] = React.useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="fixed top-0 w-full z-50 
      bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 
      backdrop-blur-xl border-b border-pink-500/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <motion.span
          className="text-xl font-black 
          bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 
          bg-clip-text text-transparent cursor-pointer"
          whileHover={{
            scale: 1.1,
            rotate: [0, 5, -5, 0],
            textShadow: "0px 0px 20px rgba(255,0,255,0.8)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
        >
          Manish Dange
        </motion.span>

        <div className="hidden md:flex gap-8 items-center">

          {links.map((l) => (
            <motion.div key={l}>
              <Link
                to={l}
                smooth
                offset={-80}
                duration={600}
                className="relative text-sm text-gray-300 cursor-pointer 
                hover:text-pink-400 transition duration-300"
              >
                {l.toUpperCase()}
                <motion.span
                  className="absolute left-0 -bottom-1 w-full h-[2px] 
                  bg-gradient-to-r from-pink-400 to-blue-400 rounded"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </Link>
            </motion.div>
          ))}

          {/* FEATURES DROPDOWN */}
          <motion.div
            className="relative"
            onHoverStart={() => setOpenFeatures(true)}
            onHoverEnd={() => setOpenFeatures(false)}
          >
            <motion.span
              className="cursor-pointer text-sm text-gray-300 
              px-3 py-2 rounded-lg 
              hover:text-pink-400 
              hover:bg-white/5 
              transition-all"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 15px #ff00ff"
              }}
            >
              FEATURES ▾
            </motion.span>

            <AnimatePresence>
              {openFeatures && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute top-10 left-0 w-48 
                  bg-gradient-to-b from-gray-900 to-black 
                  border border-pink-500/20 
                  rounded-xl overflow-hidden shadow-2xl"
                >
                  <Link
                    to="experience"
                    smooth
                    offset={-80}
                    className="block px-4 py-3 text-gray-300 
                    hover:bg-pink-500/10 
                    hover:text-pink-400 transition"
                  >
                    Experience
                  </Link>
                  <Link
                    to="certifications"
                    smooth
                    offset={-80}
                    className="block px-4 py-3 text-gray-300 
                    hover:bg-blue-500/10 
                    hover:text-blue-400 transition"
                  >
                    Certifications
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </motion.nav>
  );
}



/* ================= HERO ================= */
function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden 
      bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white"
    >
      {/* BACKGROUND BLUR CIRCLES */}
      <motion.div
        animate={{ x: [0, 200, 0], y: [0, -200, 0] }}
        transition={{ repeat: Infinity, duration: 20 }}
        className="absolute w-96 h-96 bg-pink-500/30 blur-[140px] rounded-full top-10 left-10"
      />
      <motion.div
        animate={{ x: [0, -200, 0], y: [0, 200, 0] }}
        transition={{ repeat: Infinity, duration: 25 }}
        className="absolute w-96 h-96 bg-blue-500/30 blur-[140px] rounded-full bottom-10 right-10"
      />

      {/* MAIN HERO CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center px-6"
      >
        {/* NAME */}
        <motion.h1
          className="text-6xl md:text-8xl font-black cursor-pointer"
          animate={{ y: [0, -10, 0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          whileHover={{
            scale: 1.05,
            textShadow: "0px 0px 25px rgba(255,0,255,0.7)",
          }}
        >
          Hi, I’m{" "}
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Manish Dange
          </span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Creative Web Developer and Cyber Security Enthusiast | Driven Computer
          Science undergraduate specializing in Cyber Security at SVVV
          University. Passionate about building full-stack web applications that
          seamlessly integrate AI solutions and data-driven insights.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Primary Button */}
          <motion.a
            href="#projects"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 30px rgba(255,0,255,0.6)",
            }}
            className="px-8 py-4 rounded-full 
            bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
            font-semibold text-white transition duration-300"
          >
            View My Work
          </motion.a>

          {/* Secondary Button */}
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 30px rgba(0,255,255,0.6)",
            }}
            className="px-8 py-4 rounded-full 
            border border-cyan-400 text-cyan-300 
            hover:bg-cyan-400/10 
            font-semibold transition duration-300"
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* SCROLL DOWN INDICATOR */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <span className="text-gray-400 mb-2 animate-pulse">
          Scroll Down
        </span>
        <motion.div
          className="w-3 h-3 rounded-full bg-pink-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ================= STATS ================= */
function Stats() {
  const stats = [
    { num: "20+", label: "Projects" },
    { num: "10+", label: "Certifications" },
    { num: "3+", label: "Years Learning" },
    { num: "∞", label: "Growth" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-[#0b0f1f]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            whileHover={{
              scale: 1.1,
              rotate: [0, 5, -5, 0],
              boxShadow: "0px 0px 30px rgba(0,255,255,0.6)",
            }}
            className="text-center p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-lg cursor-pointer transition-all"
          >
            <h3 className="text-5xl md:text-6xl font-extrabold text-cyan-400 mb-2">
              {s.num}
            </h3>
            <p className="text-gray-400 text-lg md:text-xl">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ================= ABOUT ================= */
function About() {
  const skills = ["Python", "Java", "React", "React Native", "JavaScript", "TypeScript", "HTML/CSS", "Django", "Cyber Security", "SQL", "Tailwind CSS",];
  const colors = [
    "bg-blue-500/20 text-blue-300 border-blue-400/30",
    "bg-orange-500/20 text-orange-300 border-orange-400/30",
    "bg-green-500/20 text-green-300 border-green-400/30",
    "bg-pink-500/20 text-pink-300 border-pink-400/30",
    "bg-purple-500/20 text-purple-300 border-purple-400/30",
  ];

  return (
    <section id="about" className="py-32 max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* PROFILE IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-cyan-400/50"
        >
          <img
            src={image1}// Replace with your image URL
            alt="Manish Dange"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ABOUT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-5xl font-bold mb-6">
            About <span className="text-cyan-400">Me</span>
          </h2>

          <p className="text-gray-300 mb-4 leading-8">
            Passionate Developer & AI Enthusiast. I’m a Computer Science undergraduate at{" "}
            <span className="text-white">SVVV Indore</span>, specializing in Information and Cyber Security.
          </p>

          <p className="text-gray-300 mb-6 leading-7">
            I enjoy solving real-world problems by integrating AI with intuitive software solutions. My experience includes
            building sentiment analysis tools, anomaly detection systems, and working on backend development for real-time applications.
          </p>

          <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Skills</h3>


          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {skills.map((s, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.15, rotate: [0, 3, -3, 0] }}
                className={`px-4 py-2 rounded-full border text-sm cursor-pointer transition
        ${colors[i % colors.length]}`}
              >
                {s}
              </motion.span>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}




import { Briefcase, Book } from "lucide-react";

/* ================= EXPERIENCE ================= */
function Experience() {
  const experience = [
    {
      title: "Full Stack Developer Intern",
      org: "The Prime Step",
      time: "2023 - Present",
      desc: "Frontend and backend development using React, Django, and SQL.",
      icon: <Briefcase size={24} />,

    },
    {
      title: "Web Development Intern",
      org: "Cod Soft",
      time: "2023 - 2024",
      desc: "Frontend development using React and JavaScript.",
      icon: <Briefcase size={24} />,
    },
  ];

  const education = [
    {
      title: "B.Tech CSE (Cyber Security)",
      org: "SVVV Indore",
      time: "2023 - 2027",
      desc: "Pursuing a Bachelor's in Computer Science with a focus on Cyber Security and AI.",
      icon: <Book size={24} />,
    },
    {
      title: "High School",
      org: " Govt. Excellence Higher Secondary School",
      time: "2020- 2023",
      desc: "Focus on Mathematics & Science.",
      icon: <Book size={24} />,
    },
  ];

  return (
    <section id="experience" className="py-32 bg-[#0b0f1f] relative overflow-hidden">
      {/* Floating background animation */}
      <motion.div
        animate={{ x: [0, 300, 0], y: [0, -150, 0] }}
        transition={{ repeat: Infinity, duration: 25 }}
        className="absolute w-80 h-80 bg-indigo-500/20 blur-[140px] rounded-full top-10 left-10"
      />
      <motion.div
        animate={{ x: [0, -300, 0], y: [0, 150, 0] }}
        transition={{ repeat: Infinity, duration: 30 }}
        className="absolute w-80 h-80 bg-cyan-500/20 blur-[140px] rounded-full bottom-10 right-10"
      />

      <h2 className="text-5xl font-bold text-center mb-16 text-white relative z-10">
        Experience & Education
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 relative z-10">
        {/* EXPERIENCE LEFT */}
        <div className="space-y-8">
          <h3 className="text-3xl text-cyan-400 font-semibold mb-6 text-center md:text-left">
            Experience
          </h3>
          {experience.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,255,255,0.2)" }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 cursor-pointer transition-all"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.3, color: "#00ffff" }}
                transition={{ duration: 0.6 }}
                className="mb-3 text-cyan-400"
              >
                {d.icon}
              </motion.div>
              <h4 className="text-xl text-cyan-400 font-semibold">{d.title}</h4>
              <p className="text-gray-400">{d.org}</p>
              <p className="text-sm text-gray-500">{d.time}</p>
              <p className="mt-2 text-gray-300 text-sm">{d.desc}</p>
            </motion.div>







          ))}
        </div>

        {/* EDUCATION RIGHT */}
        <div className="space-y-8">
          <h3 className="text-3xl text-cyan-400 font-semibold mb-6 text-center md:text-left">
            Education
          </h3>
          {education.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,255,255,0.2)" }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 cursor-pointer transition-all"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.3, color: "#00ffff" }}
                transition={{ duration: 0.6 }}
                className="mb-3 text-cyan-400"
              >
                {d.icon}
              </motion.div>
              <h4 className="text-xl text-cyan-400 font-semibold">{d.title}</h4>
              <p className="text-gray-400">{d.org}</p>
              <p className="text-sm text-gray-500">{d.time}</p>
              <p className="mt-2 text-gray-300 text-sm">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



import { Award, Star, } from "lucide-react";

/* ================= CERTIFICATIONS ================= */
function Certifications() {
  const certs = [
    {
      title: "internet of Things (IoT)",
      org: "NPTEL",
      desc: "introduction to IoT concepts, architecture, and applications.",
      url: "",
      icon: <Award size={20} />,
    },
    {
      title: "Soft Skills for Professionals",
      org: "NPTEL",
      desc: "Communication, teamwork, and problem-solving skills for the workplace.",
      url: "#",
      icon: <Star size={20} />,
    },
    {
      title: "Artificial intelligence",
      org: "Physics Wallah (PW)",
      desc: "Fundamentals of AI, including machine learning, neural networks, and real-world applications.",
      url: "#",
      icon: <Star size={20} />,
    },
    {
      title: "Python Essentials",
      org: "Cisco",
      desc: "Explored Python libraries for analysis and visualization.",
      url: "#",
      icon: <Award size={20} />,
    },
    {
      title: "Introduction to Cybersecurity",
      org: "Cisco",
      desc: "covered cybersecurity principles, threats, and best practices.",
      url: "#",
      icon: <Star size={20} />,
    },
    {
      title: "CyberSecurity Institute Certified Instructor (CSICI)",
      org: "TheTechUnique Academy",
      desc: "hands-on training in cybersecurity concepts, tools, and techniques.",
      url: "#",
      icon: <Star size={20} />,
    },
    {
      title: "Online Python programming training ",
      org: "Infosys",
      desc: "covered Python programming concepts, data structures, and applications.",
      url: "#",
      icon: <Star size={20} />,
    },
    {
      title: "React Bootcamp ",
      org: "LetsUpgrade",
      desc: "covered React fundamentals, hooks, and component architecture.",
      url: "#",
      icon: <Star size={20} />,
    },
  ];

  return (
    <section id="certifications" className="py-32 bg-[#0b0f1f] relative overflow-hidden">
      {/* Floating background animation */}
      <motion.div
        animate={{ x: [0, 300, 0], y: [0, -150, 0] }}
        transition={{ repeat: Infinity, duration: 25 }}
        className="absolute w-80 h-80 bg-indigo-500/20 blur-[140px] rounded-full top-10 left-10"
      />
      <motion.div
        animate={{ x: [0, -300, 0], y: [0, 150, 0] }}
        transition={{ repeat: Infinity, duration: 30 }}
        className="absolute w-80 h-80 bg-cyan-500/20 blur-[140px] rounded-full bottom-10 right-10"
      />

      <h2 className="text-5xl font-bold text-center mb-16 text-white relative z-10">
        Certifications
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 relative z-10">
        {certs.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg hover:shadow-cyan-400/20 transition-all"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.3, color: "#00ffff" }}
              transition={{ duration: 0.6 }}
              className="text-cyan-400 mb-3"
            >
              {c.icon}
            </motion.div>
            <h3 className="text-cyan-400 font-semibold text-xl">{c.title}</h3>
            <p className="text-gray-300 text-sm mt-1 font-medium">{c.org}</p>
            <p className="text-gray-400 text-sm mt-2">{c.desc}</p>

            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 inline-block px-6 py-2 rounded-full 
  text-white font-semibold text-sm 
  transition-all duration-300 
  hover:scale-110 hover:shadow-2xl
  ${i % 3 === 0
                  ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-pink-500/40"
                  : i % 3 === 1
                    ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 hover:shadow-cyan-500/40"
                    : "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 hover:shadow-rose-500/40"
                }`}
            >
              View
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}



/* ================= PROJECTS ================= */
function Projects() {
  const projects = [
    {
      name: "Portfolio Website",
      desc: "A modern, animated portfolio showcasing projects with smooth scroll, dark mode UI, and interactive elements using React, Tailwind CSS, and Framer Motion.",
      tech: ["React", "Tailwind", "Framer Motion"],
      url: "#", // live project link
    },
    {
      name: "SVVV-Notes-Website",
      desc: "SVVV Notes – A simple and reliable platform for students to access quality notes anytime, anywhere.",
      tech: ["React", "CSS", "JavaScript", "python", "Django", "SQL"],
      url: "https://svvv-notes-website-poij.vercel.app/",
    },
    {
      name: "E-Commerce-Platform",
      desc: "A full-stack shopping platform featuring product catalogs, shopping cart, payment integration, and real-time inventory updates using React, Node.js, and MongoDB.",
      tech: ["React", "Tailwind", "python", "Django", "SQL"],
      url: "https://simple-e-commerce-website-beta.vercel.app/",
    },
    {
      name: "JobSt@ack",
      desc: "A modern Job Portal Web Application. Search Jobs,Apply Jobs,Save Jobs ,Track Applications, Manage Profile,Resume Builder,Premium Services,Admin Job Posting",
      tech: ["React", "CSS", "Python", "Django"],
      url: "https://github.com/manish780386/JobStack.git",
    },
    {
      name: "☕ Velvet Brew Café Website",
      desc: "A visually appealing and user-friendly website for a local café, featuring a menu, online ordering, and reservation system using React, Tailwind CSS, and Framer Motion and add admin panel for manage the website",
      tech: ["React", "Tailwind", "Python", "Django","Framer Motion","Three.js"],
      url: "https://github.com/manish780386/Velvet-Brew-Cafe-Website.git",
    },
    {
      name: "🌾 KisanMitra – Smart Farmer Assistant Platform",
      desc: "A platform for farmers to access market information, sell their produce, and connect with potential buyers.",
      tech: ["React", "TypeScript", "tailwind"],
      url: "https://github.com/manish780386/-KisanMitra.git",
    }

  ];

  return (
    <section id="projects" className="py-32 bg-[#0b0f1f]">
      <h2 className="text-5xl font-bold text-center mb-16 text-white">Projects</h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, y: -10, rotate: 1 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-lg hover:shadow-cyan-400/20 transition-all cursor-pointer"
          >
            <h3 className="text-xl text-cyan-400 font-semibold">{p.name}</h3>
            <p className="text-gray-300 text-sm mt-3 leading-6">{p.desc}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {p.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs bg-white/10 rounded-full text-gray-200 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-6 inline-block px-6 py-2 rounded-full 
  font-semibold text-sm text-white 
  bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
  transition-all duration-300
  hover:scale-110 hover:shadow-[0_0_25px_rgba(255,0,255,0.6)]
  overflow-hidden group"
            >
              <span className="relative z-10">View Project</span>

              {/* Shine Effect */}
              <span className="absolute inset-0 bg-white/20 
  translate-x-[-100%] group-hover:translate-x-[100%] 
  transition-transform duration-700"></span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


import {
  Code,
  Server,
  Database,
  Zap,
  Users,

  Figma,
  Terminal,
  Cloud,
  HardDrive,
} from "lucide-react";

/* ================= SKILLS ================= */
function Skills() {
  const skills = {
    Frontend: [
      { name: "React", icon: <Code size={20} /> },       // React icon
      { name: "Tailwind", icon: <Code size={20} /> },    // Tailwind
      { name: "Framer Motion", icon: <Zap size={20} /> },
      { name: "Next.js", icon: <Code size={20} /> },
      { name: "HTML", icon: <Code size={20} /> },
      { name: "CSS", icon: <Code size={20} /> },
      { name: "JavaScript", icon: <Code size={20} /> },
      { name: "BootStrap", icon: <Code size={20} /> },
      { name: "React Native", icon: <Code size={20} /> },
      { name: "TypeScript", icon: <Code size={20} /> },

    ],
    Backend: [

      { name: "Django", icon: <Server size={20} /> },
      { name: "Python", icon: <Server size={20} /> },

      { name: "REST APIs", icon: <Terminal size={20} /> },

    ],
    Database: [

      { name: "MySQL", icon: <Database size={20} /> },
      { name: "PostgreSQL", icon: <Database size={20} /> },
      { name: "Firebase", icon: <Cloud size={20} /> },
    ],
    Tools: [


      { name: "Linux", icon: <Terminal size={20} /> },
      { name: "VS Code", icon: <Code size={20} /> },
      { name: "Postman", icon: <Terminal size={20} /> },
      { name: "Git", icon: <Terminal size={20} /> },
      { name: "Docker", icon: <HardDrive size={20} /> },

    ],
    Learning: [
      { name: "AI / ML", icon: <Zap size={20} /> },
      { name: "System Design", icon: <Zap size={20} /> },
      { name: "Cyber Security", icon: <Zap size={20} /> },
      { name: "Data Analytics", icon: <Zap size={20} /> },
    ],
    SoftSkills: [
      { name: "Problem Solving", icon: <Users size={20} /> },
      { name: "Teamwork", icon: <Users size={20} /> },
      { name: "Communication", icon: <Users size={20} /> },
      { name: "Adaptability", icon: <Users size={20} /> },
    ],
  };

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-[#0b0f1f]">
      {/* Floating background blobs */}
      <motion.div
        animate={{ x: [0, 300, 0], y: [0, -200, 0] }}
        transition={{ repeat: Infinity, duration: 25 }}
        className="absolute w-96 h-96 bg-indigo-500/20 blur-[140px] rounded-full top-10 left-10"
      />
      <motion.div
        animate={{ x: [0, -300, 0], y: [0, 200, 0] }}
        transition={{ repeat: Infinity, duration: 30 }}
        className="absolute w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full bottom-10 right-10"
      />

      <h2 className="text-5xl font-bold text-center mb-16 text-white relative z-10">
        Skills
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6 relative z-10">
        {Object.entries(skills).map(([title, list], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            whileHover={{
              scale: 1.07,
              rotate: 1,
              boxShadow: "0 20px 40px rgba(0,255,255,0.2)",
            }}
            className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 cursor-pointer transition-all"
          >
            <h3 className="text-cyan-400 mb-4 text-xl font-semibold">{title}</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              {list.map((l, idx) => (
                <motion.li
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2 hover:text-cyan-400 transition-all"
                >
                  <motion.span
                    whileHover={{ rotate: 360, scale: 1.3, color: "#00ffff" }}
                    transition={{ duration: 0.6 }}
                    className="text-cyan-400"
                  >
                    {l.icon}
                  </motion.span>
                  • {l.name}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}






import { Linkedin, Github, Codepen } from "lucide-react"; // Codepen as placeholder for LeetCode/HackerRank
import { useState } from "react";

/* ================= CONTACT ================= */
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const socials = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/manish-dange-2a03b6312/", icon: <Linkedin size={20} /> },
    { name: "GitHub", url: "https://github.com/manish780386", icon: <Github size={20} /> },
    { name: "LeetCode", url: "https://leetcode.com/u/dangemanish/", icon: <Codepen size={20} /> },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sweet alert style
    alert(`✨ Thank you, ${formData.name}! Your message has been submitted successfully. We'll reach out soon! 🚀`);

    // Clear form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[#0b0f1f]">
      {/* Floating background blobs */}
      <motion.div
        animate={{ x: [0, 300, 0], y: [0, -150, 0] }}
        transition={{ repeat: Infinity, duration: 20 }}
        className="absolute w-80 h-80 bg-indigo-500/20 blur-[140px] rounded-full top-10 left-10"
      />
      <motion.div
        animate={{ x: [0, -300, 0], y: [0, 150, 0] }}
        transition={{ repeat: Infinity, duration: 25 }}
        className="absolute w-80 h-80 bg-cyan-500/20 blur-[140px] rounded-full bottom-10 right-10"
      />

      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold mb-12 text-white text-center relative z-10"
      >
        Contact Me
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-xl mx-auto space-y-6 px-6 relative z-10"
      >
        <motion.input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your Name"
          whileFocus={{ scale: 1.02, borderColor: "#00ffff" }}
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 transition-all"
          required
        />
        <motion.input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          whileFocus={{ scale: 1.02, borderColor: "#00ffff" }}
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 transition-all"
          type="email"
          required
        />
        <motion.textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Message"
          rows="4"
          whileFocus={{ scale: 1.02, borderColor: "#00ffff" }}
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 transition-all"
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,255,0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-bold text-white transition-all"
        >
          Send Message
        </motion.button>
      </motion.form>

      <div className="flex flex-wrap justify-center gap-6 mt-10 relative z-10">
        {socials.map((s, i) => (
          <motion.a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.1,
              rotate: 360,
              transition: { duration: 0.8, type: "spring", stiffness: 300 },
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 font-semibold text-white transition-all cursor-pointer"
          >
            {s.icon}
            {s.name}
          </motion.a>
        ))}
      </div>
    </section>
  );
}



/* ================= FOOTER ================= */
function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="py-6 text-center text-gray-400 border-t border-white/10 relative overflow-hidden bg-[#0b0f1f]"
    >
      <motion.p
        whileHover={{ scale: 1.05, color: "#00ffff", textShadow: "0 0 10px #00ffff" }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-sm"
      >
        © 2026 Manish Dange. All rights reserved. Built with React & Tailwind CSS.
      </motion.p>

      {/* Optional: small floating animation blobs */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 20 }}
        className="absolute w-32 h-32 bg-indigo-500/20 blur-[100px] rounded-full top-2 left-10"
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 25 }}
        className="absolute w-32 h-32 bg-cyan-500/20 blur-[100px] rounded-full bottom-2 right-10"
      />
    </motion.footer>
  );
}

