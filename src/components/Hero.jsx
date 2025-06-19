import React from 'react';
import profilePic from '../assets/profile.jpg';
import './Hero.css';

export default function Hero() {
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
    }
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <div className="info">
          <span className="greeting">Hello, I'm</span>
          <h1>Ahmad Raza</h1>
          <h2 className="title">Software Engineer</h2>
          <p>Passionate about crafting interactive web experiences and building elegant solutions to complex problems. Also passionate about learning AI/ML.</p>
          <div className="cta-buttons">
            <a 
              href="#projects" 
              className="primary-btn"
              onClick={(e) => handleClick(e, 'projects')}
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="secondary-btn"
              onClick={(e) => handleClick(e, 'contact')}
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="profile-container">
          <img src={profilePic} alt="Your Name" className="profile-image" />
          <div className="profile-background"></div>
        </div>
      </div>
    </div>
  );
}