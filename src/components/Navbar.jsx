"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaHome, FaUser, FaCogs, FaFolderOpen, FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './Navbar.css';

const navItems = [
  { name: 'Home', to: 'home', icon: FaHome },
  { name: 'About', to: 'about', icon: FaUser },
  { name: 'Services', to: 'services', icon: FaCogs },
  { name: 'Projects', to: 'projects', icon: FaFolderOpen },
  { name: 'Contact', to: 'contact', icon: FaEnvelope },
];

const socialLinks = [
  { icon: FaLinkedin, url: 'https://www.linkedin.com/in/ahmad-raza-53482b316/', label: 'LinkedIn' },
  { icon: FaGithub, url: 'https://github.com/Blasty11', label: 'GitHub' },
  { icon: FaInstagram, url: 'https://www.instagram.com/ahmzie_e/', label: 'Instagram' },
];

/* ─────────────────────────────────────────────────────────────
   DockIcon — size driven by the dock-bar's mouseX motion value.
   Only magnifies when cursor is over the dock bar.
───────────────────────────────────────────────────────────── */
function DockIcon({ item, mouseX, onClick, isActive }) {
  const ref = useRef(null);

  // distance = cursor X  –  icon centre X
  const distance = useTransform(mouseX, (mx) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return mx - (bounds.left + bounds.width / 2);
  });

  // map distance → size  (far away = 40 px, dead-centre = 72 px)
  const rawSize = useTransform(distance, [-120, 0, 120], [40, 72, 40]);
  const size = useSpring(rawSize, { stiffness: 280, damping: 22, mass: 0.4 });

  const Icon = item.icon;

  return (
    <div className="dock-item-wrapper">
      <motion.button
        ref={ref}
        id={`dock-${item.to}`}
        className={`dock-icon ${isActive ? 'dock-icon--active' : ''}`}
        style={{ width: size, height: size }}
        whileTap={{ scale: 0.88 }}
        onClick={() => onClick(item.to)}
        aria-label={item.name}
      >
        <Icon />
        {isActive && <span className="dock-dot" />}
      </motion.button>
      <span className="dock-tooltip">{item.name}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Navbar — mouseX is set only from the dock bar's events.
   When cursor leaves, mouseX → Infinity so all icons shrink back.
───────────────────────────────────────────────────────────── */
export default function Navbar() {
  // Infinity = "cursor not on dock" → all icons stay at base size
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
        /* Track cursor ONLY while it's inside the dock bar */
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.3 }}
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

        {socialLinks.map(({ icon: Icon, url, label }) => (
          <div className="dock-item-wrapper" key={label}>
            <motion.a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="dock-icon dock-icon--social"
              whileHover={{ scale: 1.25, y: -4 }}
              whileTap={{ scale: 0.88 }}
            >
              <Icon />
            </motion.a>
            <span className="dock-tooltip">{label}</span>
          </div>
        ))}
      </motion.div>
    </nav>
  );
}