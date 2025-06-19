import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: offsetTop - 70,
              behavior: 'auto'
            });
          }, 100);
        }
      }
    };
    
    handleInitialHash();
    
    // Also handle hash changes
    window.addEventListener('hashchange', handleInitialHash);
    return () => window.removeEventListener('hashchange', handleInitialHash);
  }, []);
  
  return (
    <>
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <div className="section-divider"></div>
        <section id="about">
          <About />
        </section>
        
        <div className="section-divider"></div>
        <section id="services">
          <Services />
        </section>
        
        <div className="section-divider"></div>
        <section id="projects">
          <Projects />
        </section>
        
        <div className="section-divider"></div>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;