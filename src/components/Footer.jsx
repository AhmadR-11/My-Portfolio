"use client";

import { useEffect, useState } from 'react';
import { 
  FaCircle, FaGithub, FaLinkedin, FaInstagram, 
  FaCodeBranch, FaTerminal, FaArrowUp, FaCode, 
  FaExternalLinkAlt, FaFileDownload, FaEnvelope, 
  FaMapMarkerAlt, FaCheckCircle 
} from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const [time, setTime] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    setYear(String(new Date().getFullYear()));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="portfolio-footer-root">
      
      {/* Upper Executive macOS Footer Window */}
      <div className="footer-container">
        <div className="macos-window footer-macos-card">
          
          {/* Window Title Bar */}
          <div className="macos-header footer-window-header">
            <div className="macos-buttons">
              <span className="macos-btn close" title="System Normal" />
              <span className="macos-btn minimize" title="Background Idle" />
              <span className="macos-btn expand" title="Active Pipeline" />
            </div>
            <div className="footer-window-title">
              <span className="user-prompt">AhmadR-11@macbook</span>:<span className="dir-prompt">~/portfolio/system-summary</span>
            </div>
            <div className="footer-status-pill">
              <FaCheckCircle className="status-check-icon" />
              <span>Available for Hire</span>
            </div>
          </div>

          {/* Window Body Grid */}
          <div className="footer-window-body">
            
            {/* Column 1: Brand & Executive Identity */}
            <div className="footer-col footer-col-brand">
              <div className="footer-brand-header">
                <div className="footer-brand-icon">
                  <FaTerminal />
                </div>
                <div>
                  <h3 className="footer-brand-title">Ahmad Raza</h3>
                  <span className="footer-brand-handle">@AhmadR-11</span>
                </div>
              </div>
              <p className="footer-brand-bio">
                Full-Stack Software Engineer &amp; AI Systems Developer. Crafting high-performance SaaS platforms, autonomous LLM agents, and cloud automation pipelines.
              </p>
              <div className="footer-location-badge">
                <FaMapMarkerAlt className="loc-icon" />
                <span>Lahore, Pakistan &bull; Remote &amp; Onsite</span>
              </div>
            </div>

            {/* Column 2: System Sitemap */}
            <div className="footer-col footer-col-nav">
              <h4 className="footer-col-heading">
                <FaCode className="heading-icon" /> System Sitemap
              </h4>
              <ul className="footer-nav-list">
                <li>
                  <button onClick={() => scrollToSection('home')} className="footer-nav-link">
                    <span className="nav-prefix">~/</span>home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="footer-nav-link">
                    <span className="nav-prefix">~/</span>about
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="footer-nav-link">
                    <span className="nav-prefix">~/</span>services
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('experience')} className="footer-nav-link">
                    <span className="nav-prefix">~/</span>experience
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('projects')} className="footer-nav-link">
                    <span className="nav-prefix">~/</span>projects
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="footer-nav-link">
                    <span className="nav-prefix">~/</span>contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Tech Ecosystem Stack */}
            <div className="footer-col footer-col-tech">
              <h4 className="footer-col-heading">
                <FaTerminal className="heading-icon" /> Core Tech Stack
              </h4>
              <div className="footer-tech-chips">
                <span className="footer-tech-badge">Next.js 16</span>
                <span className="footer-tech-badge">React</span>
                <span className="footer-tech-badge">Node.js</span>
                <span className="footer-tech-badge">Python / FastAPI</span>
                <span className="footer-tech-badge">PostgreSQL</span>
                <span className="footer-tech-badge">MongoDB</span>
                <span className="footer-tech-badge">Docker &amp; K8s</span>
                <span className="footer-tech-badge">Cohere AI / RAG</span>
                <span className="footer-tech-badge">Tailwind CSS</span>
              </div>
            </div>

            {/* Column 4: Actions & Quick Connect */}
            <div className="footer-col footer-col-actions">
              <h4 className="footer-col-heading">
                <FaArrowUp className="heading-icon" /> Quick Actions
              </h4>
              <div className="footer-actions-group">
                <button onClick={scrollToTop} className="footer-action-btn primary">
                  <FaArrowUp />
                  <span>Scroll To Top</span>
                </button>
                
                <a href="/Ahmad-Raza-CV.pdf" download className="footer-action-btn secondary">
                  <FaFileDownload />
                  <span>Download CV</span>
                </a>

                <button onClick={() => scrollToSection('contact')} className="footer-action-btn outline">
                  <FaEnvelope />
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>

          </div>

          {/* System Terminal Execution Banner */}
          <div className="footer-sys-banner">
            <div className="banner-cmd-line">
              <span className="prompt-sym">$</span>
              <span className="cmd-txt">echo &quot;Architected with Next.js 16, Framer Motion, and macOS Sonoma Dark Glassmorphism.&quot;</span>
            </div>
            <div className="banner-copy-txt">
              &copy; {year} Ahmad Raza. All rights reserved.
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Neovim Powerline Statusbar */}
      <div className="term-footer">
        
        {/* Left Segment: Powerline Mode & File */}
        <div className="tf-left">
          <span className="tf-block tf-mode">
            <FaTerminal className="tf-mode-icon" /> NORMAL
          </span>
          <span className="tf-block tf-branch">
            <FaCodeBranch /> main
          </span>
          <span className="tf-block tf-file">
            ~/portfolio/index.jsx
          </span>
        </div>
        
        {/* Center Segment: Copyright Notice */}
        <div className="tf-center">
          <span className="tf-text">&copy; {year} Ahmad Raza &bull; Full-Stack Software Engineer</span>
        </div>
        
        {/* Right Segment: Socials, Status Indicator, and Clock */}
        <div className="tf-right">
          <span className="tf-block tf-socials">
            <a 
              href="https://github.com/AhmadR-11/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile" 
              title="GitHub (@AhmadR-11)"
            >
              <FaGithub />
            </a>
            <a 
              href="http://linkedin.com/in/ahmad-raza-53482b316/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile" 
              title="LinkedIn (Ahmad Raza)"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://www.instagram.com/ahmzie_e/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram Profile" 
              title="Instagram (@ahmzie_e)"
            >
              <FaInstagram />
            </a>
          </span>
          <span className="tf-block tf-status" title="Status: Online & Available for Hire">
            <FaCircle className="status-blinker" /> ONLINE
          </span>
          <span className="tf-block tf-time" title="Pakistan Standard Time (PKT)">
            {time} PKT
          </span>
        </div>

      </div>

    </footer>
  );
}