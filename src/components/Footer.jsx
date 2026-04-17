"use client";

import { useEffect, useState } from 'react';
import { FaCircle, FaGithub, FaLinkedin, FaInstagram, FaCodeBranch } from 'react-icons/fa';
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
    const int = setInterval(updateTime, 1000);
    return () => clearInterval(int);
  }, []);

  return (
    <footer className="term-footer">
      <div className="tf-left">
        <span className="tf-block tf-mode">NORMAL</span>
        <span className="tf-block tf-branch"><FaCodeBranch /> main</span>
        <span className="tf-block tf-file">~/portfolio/index.jsx</span>
      </div>
      
      <div className="tf-center">
        <span className="tf-text">© {year} Ahmad Raza. All rights reserved.</span>
      </div>
      
      <div className="tf-right">
        <span className="tf-block tf-socials">
          <a href="https://github.com/Blasty11" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/ahmad-raza-53482b316/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://www.instagram.com/ahmzie_e/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
        </span>
        <span className="tf-block tf-status"><FaCircle className="status-blinker" /> ONLINE</span>
        <span className="tf-block tf-time">{time}</span>
      </div>
    </footer>
  );
}