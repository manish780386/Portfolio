import React from "react";
import ParticleField from "../components/ParticleField";
import Hero from "../sections/Hero";
import Stats from "../sections/Stats";
import About from "../sections/About";
import GithubStats from "../sections/GithubStats";
import LeetCodeStats from "../sections/LeetCodeStats";
import Experience from "../sections/Experience";
import Certifications from "../sections/Certifications";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";

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