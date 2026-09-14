"use client";

import { useState } from 'react';
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
import PageLoader from '../components/PageLoader';
import MacMenuBar from '../components/MacMenuBar';
import SpotlightSearch from '../components/SpotlightSearch';
import ActivityMonitorModal from '../components/ActivityMonitorModal';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  return (
    <>
      <PageLoader onComplete={() => setIsLoaded(true)} />
      
      {/* Top macOS Sonoma Menu Bar */}
      <MacMenuBar 
        onOpenSpotlight={() => setIsSpotlightOpen(true)}
        onOpenActivityMonitor={() => setIsActivityOpen(true)}
      />

      <Navbar isLoaded={isLoaded} />

      <main style={{ paddingTop: '30px' }}>
        <section id="home">
          <Hero isLoaded={isLoaded} />
        </section>

        <TechStack onOpenActivityMonitor={() => setIsActivityOpen(true)} />

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

      {/* macOS Spotlight Search Modal (⌘K) */}
      <SpotlightSearch 
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
      />

      {/* macOS Activity Monitor Diagnostics Modal */}
      <ActivityMonitorModal 
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
      />
    </>
  );
}

