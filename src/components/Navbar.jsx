"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaHome, FaUser, FaCogs, FaFolderOpen, FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './Navbar.css';

const navItems = [
  { name: 'Home', to: 'home', icon: FaHome, type: 'nav' },
  { name: 'About', to: 'about', icon: FaUser, type: 'nav' },
  { name: 'Services', to: 'services', icon: FaCogs, type: 'nav' },
  { name: 'Projects', to: 'projects', icon: FaFolderOpen, type: 'nav' },
  { name: 'Contact', to: 'contact', icon: FaEnvelope, type: 'nav' },
];

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ahmad-raza-53482b316/', icon: FaLinkedin, type: 'social' },
  { name: 'GitHub', url: 'https://github.com/Blasty11', icon: FaGithub, type: 'social' },
  { name: 'Instagram', url: 'https://www.instagram.com/ahmzie_e/', icon: FaInstagram, type: 'social' },
];

function DockIcon({ item, mouseX, onClick, isActive }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (mx) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return mx - (bounds.left + bounds.width / 2);
  });

  /* Smooth macOS magnification curve (44px base -> 70px peak) */
  const rawSize = useTransform(distance, [-140, 0, 140], [44, 70, 44]);
  const size = useSpring(rawSize, { stiffness: 320, damping: 24, mass: 0.2 });

  /* Scaling icon font size proportionally (18px -> 28px) */
  const rawIconSize = useTransform(distance, [-140, 0, 140], [18, 28, 18]);
  const iconSize = useSpring(rawIconSize, { stiffness: 320, damping: 24, mass: 0.2 });

  const Icon = item.icon;

  if (item.type === 'social') {
    return (
      <div className="dock-item-wrapper">
        <motion.a
          ref={ref}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className="dock-icon dock-icon--social"
          style={{ width: size, height: size }}
          whileTap={{ scale: 0.88, y: -3 }}
        >
          <motion.div style={{ fontSize: iconSize }} className="dock-icon-inner">
            <Icon />
          </motion.div>
        </motion.a>
        <span className="dock-tooltip">{item.name}</span>
      </div>
    );
  }

  return (
    <div className="dock-item-wrapper">
      <motion.button
        ref={ref}
        id={`dock-${item.to}`}
        className={`dock-icon ${isActive ? 'dock-icon--active' : ''}`}
        style={{ width: size, height: size }}
        whileTap={{ scale: 0.88, y: -3 }}
        onClick={() => onClick(item.to)}
        aria-label={item.name}
      >
        <motion.div style={{ fontSize: iconSize }} className="dock-icon-inner">
          <Icon />
        </motion.div>
        {isActive && <span className="dock-dot" />}
      </motion.button>
      <span className="dock-tooltip">{item.name}</span>
    </div>
  );
}

export default function Navbar({ isLoaded = true }) {
  const mouseX = useMotionValue(Infinity);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'home';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
    setActive(id);
  };

  return (
    <nav className="dock-nav">
      <motion.div
        className="dock-bar"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 100, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.5 }}
      >
        {navItems.map(item => (
          <DockIcon
            key={item.to}
            item={item}
            mouseX={mouseX}
            onClick={scrollTo}
            isActive={active === item.to}
          />
        ))}

        <div className="dock-divider" />

        {socialLinks.map(item => (
          <DockIcon
            key={item.name}
            item={item}
            mouseX={mouseX}
          />
        ))}
      </motion.div>
    </nav>
  );
}