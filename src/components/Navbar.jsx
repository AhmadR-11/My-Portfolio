import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './Navbar.css';

const links = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Services', to: 'services' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

const socialLinks = [
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/ahmad-raza-53482b316/', ariaLabel: 'LinkedIn' },
  { icon: <FaGithub />, url: 'https://github.com/Blasty11', ariaLabel: 'GitHub' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/ahmzie_e/', ariaLabel: 'Instagram' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine which section is currently in view
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150 && 
            window.scrollY < sectionTop + sectionHeight - 150) {
          currentSection = section.id;
        }
      });
      
      // Update active section and URL hash without triggering scroll
      if (activeSection !== currentSection) {
        setActiveSection(currentSection);
        // Update URL hash without scrolling
        history.replaceState(null, null, `#${currentSection}`);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Update URL hash
      window.location.hash = id;
      
      // Scroll to section
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 70, // Adjust for navbar height
        behavior: 'smooth'
      });
      
      setActiveSection(id);
      setMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#home" onClick={(e) => handleClick(e, 'home')}>
            <span className="logo-text">AR</span>
          </a>
        </div>
        
        <div className="navbar-right">
          <ul className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
            {links.map(({ name, to }) => (
              <li key={to}>
                <a 
                  href={`#${to}`}
                  onClick={(e) => handleClick(e, to)}
                  className={activeSection === to ? 'active' : ''}
                >
                  {name}
                  {activeSection === to && <span className="nav-indicator"></span>}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="social-icons">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="social-icon"
              >
                {link.icon}
              </a>
            ))}
          </div>
          
          <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
}