import React from "react";
import StarField from "../components/StarField.jsx";
import Hero from "../sections/Hero";
import SystemMetrics from "../sections/SystemMetrics.jsx";
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
      <StarField />
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