"use client";

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingResumeButton from '../components/FloatingResumeButton';

import TechStack from '../components/TechStack';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>

        <TechStack />

        <div className="section-divider" />
        <section id="about">
          <About />
        </section>

        <div className="section-divider" />
        <section id="services">
          <Services />
        </section>

        <div className="section-divider" />
        <section id="experience">
          <Experience />
        </section>

        <div className="section-divider" />
        <section id="projects">
          <Projects />
        </section>


        <div className="section-divider" />
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
      <FloatingResumeButton />
    </>
  );
}
