import React from "react";
import ParticleField from "../components/ParticleField.jsx";
import Hero from "../sections/Hero.jsx";
import Stats from "../sections/Stats.jsx";
import About from "../sections/About.jsx";
import GithubStats from "../sections/GithubStats.jsx";
import LeetCodeStats from "../sections/LeetCodeStats.jsx";
import Experience from "../sections/Experience.jsx";
import Certifications from "../sections/Certifications.jsx";
import Projects from "../sections/Projects.jsx";
import Skills from "../sections/Skills.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <>
      <ParticleField />
      <Hero />
      <Stats />
      <About />
      <GithubStats />
      <LeetCodeStats />
      <Experience />
      <Certifications />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}