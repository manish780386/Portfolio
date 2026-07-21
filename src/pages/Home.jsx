import React from "react";
import Hero from "../sections/Hero";
import SystemMetrics from "../sections/SystemMetrics";
import About from "../sections/About";
import Experience from "../sections/Experience";
import CodingProfiles from "../sections/CodingProfiles";
import Certifications from "../sections/Certifications";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <SystemMetrics />
      <About />
      <Experience />
      <CodingProfiles />
      <Certifications />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}