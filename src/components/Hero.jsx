"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

/* Rotating words */
const ROTATING_WORDS = ['innovative', 'scalable', 'fast', 'elegant', 'modern'];

export default function Hero() {

  /* ── Particles: generated client-side only to avoid hydration mismatch ── */
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        x:        Math.random() * 100,
        y:        Math.random() * 100,
        size:     Math.random() * 2.2 + 0.6,
        delay:    Math.random() * 4,
        duration: Math.random() * 4 + 3,
      }))
    );
  }, []);

  /* ── Rotating word ── */
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % ROTATING_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  /* ── Blinking cursor ── */
  const [cursorOn, setCursorOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
  };

  return (
    <div className="hero-inner">

      {/* Grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Floating particles — only rendered after client mounts */}
      <div className="hero-particles" aria-hidden="true">
        {particles.map(p => (
          <span
            key={p.id}
            className="hero-particle"
            style={{ 
              left: `${p.x}%`, 
              top: `${p.y}%`, 
              width: p.size, 
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Horizontal glow streak */}
      <div className="hero-streak" aria-hidden="true">
        <motion.div
          className="hero-streak-line"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: 1.0, ease: 'easeOut' }}
        />
        <motion.div
          className="hero-streak-glow"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3.5, delay: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        />
      </div>

      {/* Ambient corner glows */}
      <div className="hero-glow hero-glow--tl" aria-hidden="true" />
      <div className="hero-glow hero-glow--br" aria-hidden="true" />

      {/* Main content */}
      <div className="hero-content">

        {/* Label */}
        <motion.p
          className="hero-label"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          HELLO, I'M
        </motion.p>

        {/* Name row with terminal prompt */}
        <motion.div
          className="hero-name-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, type: 'spring', stiffness: 90 }}
        >
          <span className="hero-prompt" aria-hidden="true">
            &gt;
            <span className={`hero-cursor ${cursorOn ? 'hero-cursor--on' : ''}`} />
          </span>
          <h1 className="hero-name">Ahmad Raza</h1>
        </motion.div>

        {/* Role badge */}
        <motion.div
          className="hero-role"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="hero-role-dot" />
          Software Engineer
          <span className="hero-role-dot" />
        </motion.div>

        {/* Subtitle with rotating word */}
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          Building web experiences that are{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              className="hero-rotating-word"
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.92 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {ROTATING_WORDS[wordIdx]}
            </motion.span>
          </AnimatePresence>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
        >
          <motion.button
            id="hero-view-work-btn"
            className="hero-btn hero-btn--primary"
            onClick={() => scrollTo('projects')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            View Projects
          </motion.button>
          <motion.button
            id="hero-contact-btn"
            className="hero-btn hero-btn--ghost"
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Tech stack tags */}
        <motion.div
          className="hero-stack"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          {['React', 'Next.js', 'Node.js', 'AWS', 'Docker', 'Kubernetes'].map((t, i) => (
            <motion.span
              key={t}
              className="hero-tag"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + i * 0.07 }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.55 }}
        >
          DevOps focus: Terraform, Jenkins, and Tomcat-based delivery pipelines.
        </motion.p>

      </div>

      {/* Scroll hint */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          className="hero-scroll-line"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span>scroll</span>
      </motion.div>

    </div>
  );
}