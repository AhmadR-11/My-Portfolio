import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaHeart } from 'react-icons/fa';
import './Footer.css';

const socialLinks = [
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/ahmad-raza-53482b316/', ariaLabel: 'LinkedIn' },
  { icon: <FaGithub />, url: 'https://github.com/Blasty11', ariaLabel: 'GitHub' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/ahmzie_e/', ariaLabel: 'Instagram' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">AR</span>
          </div>
          
          <p className="footer-tagline">
            Building digital experiences with passion <FaHeart className="heart-icon" />
          </p>
          
          <div className="footer-social">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="footer-social-icon"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Ahmad Raza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}