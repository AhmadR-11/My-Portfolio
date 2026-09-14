"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import profileImg from '../assets/1784110990963.png';
import { FaArrowRight, FaCode, FaCloud, FaCheckCircle, FaLaptopCode, FaHandPointer } from 'react-icons/fa';
import './Hero.css';

const ROTATING_WORDS = ['seamless', 'scalable', 'high-performance', 'cloud-native', 'elegant'];

export default function Hero({ isLoaded = true }) {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % ROTATING_WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  /* 3D Mouse Parallax Tilt for Profile Showcase */
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* Drag Spring Motion Values for Inertial Ribbon Stretch */
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Soft low-damping springs for realistic pendulum swinging inertia
  const springX = useSpring(dragX, { stiffness: 180, damping: 14 });
  const springY = useSpring(dragY, { stiffness: 180, damping: 14 });

  /* Dynamic SVG Lanyard Ribbon Paths */
  const ribbonPathLeft = useTransform(
    [springX, springY],
    ([x, y]) => `M 170 -60 Q ${185 + x * 0.35} ${-10 + y * 0.5} ${205 + x} ${32 + y}`
  );

  const ribbonPathRight = useTransform(
    [springX, springY],
    ([x, y]) => `M 270 -60 Q ${255 + x * 0.35} ${-10 + y * 0.5} ${235 + x} ${32 + y}`
  );

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
  };

  return (
    <div className="hero-section">
      {/* Background Ambient Mesh & Radial Rays */}
      <div className="hero-bg-glows" aria-hidden="true">
        <div className="hero-glow-blob hero-glow-1" />
        <div className="hero-glow-blob hero-glow-2" />
        <div className="hero-grid-overlay" />
      </div>

      <div className="hero-container">
        {/* ── LEFT COLUMN: Staggered Content Reveal ── */}
        <div className="hero-left">

          {/* 1. Executive Availability Pill */}
          <motion.div
            className="hero-status-pill"
            initial={{ opacity: 0, y: -20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-status-dot" />
            <span>Available for Software &amp; DevOps Roles</span>
          </motion.div>

          {/* 2. Headline Name */}
          <motion.h1
            className="hero-main-title"
            initial={{ opacity: 0, y: 25 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            Ahmad Raza
          </motion.h1>

          {/* 3. Subheading / Title */}
          <motion.h2
            className="hero-role-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Software Engineer <span className="hero-title-amp">&amp;</span> Cloud Architect
          </motion.h2>

          {/* 4. Rotating Pill Tagline */}
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 18 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.6, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            Building digital experiences that are{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                className="hero-pill-word"
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.94 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {ROTATING_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.p>

          {/* 5. Bio Text */}
          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Specializing in high-performance web applications and cloud infrastructure automation. 
            Delivering maintainable full-stack systems with React, Next.js, Node.js, AWS, and Kubernetes.
          </motion.p>

          {/* 6. CTAs */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              id="hero-view-work-btn"
              className="hero-btn-primary"
              onClick={() => scrollTo('projects')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Explore Projects</span>
              <FaArrowRight className="btn-icon" />
            </motion.button>

            <motion.button
              id="hero-contact-btn"
              className="hero-btn-secondary"
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* 7. Core Tech Stack */}
          <motion.div
            className="hero-stack-area"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <span className="hero-stack-label">Core Tech Stack:</span>
            <div className="hero-stack-pills">
              {['React', 'Next.js', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'].map((tech, i) => (
                <motion.span
                  key={tech}
                  className="hero-tech-pill"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.85 + i * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── RIGHT COLUMN: Inertial Floating Lanyard Card Showcase ── */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, y: -40, scale: 0.92 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -40, scale: 0.92 }}
          transition={{ duration: 0.9, delay: 0.35, type: 'spring', stiffness: 100, damping: 16 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Hanging Ribbon SVG Container */}
          <div className="lanyard-ribbon-wrapper" aria-hidden="true">
            <svg className="lanyard-svg" viewBox="0 0 440 80">
              <motion.path
                d={ribbonPathLeft}
                stroke="url(#ribbonGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <motion.path
                d={ribbonPathRight}
                stroke="url(#ribbonGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Draggable Card Component with Pendulum Inertia */}
          <motion.div
            ref={cardRef}
            className="hero-card-glass"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            drag={true}
            dragConstraints={{ top: -20, bottom: 240, left: -80, right: 80 }}
            dragElastic={0.75} // High flexibility in all directions
            dragSnapToOrigin={true}
            dragTransition={{ bounceStiffness: 140, bounceDamping: 12 }} // Realistic pendulum inertia sway
            onDrag={(e, info) => {
              dragX.set(info.offset.x);
              dragY.set(info.offset.y);
            }}
            onDragEnd={() => {
              dragX.set(0);
              dragY.set(0);
            }}
            whileDrag={{ scale: 1.03, cursor: 'grabbing' }}
            whileHover={{ cursor: 'grab' }}
          >
            {/* Lanyard Top Metallic Ring Clip */}
            <div className="lanyard-card-clip">
              <div className="clip-metal-loop" />
              <div className="drag-hint-pill">
                <FaHandPointer className="hand-icon" />
                <span>Pull &amp; release to swing!</span>
              </div>
            </div>

            {/* Floating Glass Pills around Profile */}
            <motion.div
              className="floating-badge badge-top-left"
              animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaCode className="badge-icon" />
              <span>Full-Stack</span>
            </motion.div>

            <motion.div
              className="floating-badge badge-bottom-right"
              animate={{ y: [0, 8, 0], rotate: [0, -1.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <FaCloud className="badge-icon" />
              <span>Cloud &amp; DevOps</span>
            </motion.div>

            {/* macOS Window Header */}
            <div className="card-window-header">
              <div className="card-window-dots">
                <span className="dot close" />
                <span className="dot minimize" />
                <span className="dot expand" />
              </div>
              <div className="card-window-title">ahmad.profile.json</div>
            </div>

            {/* Window Content */}
            <div className="card-window-body">
              {/* Profile Image Squircle */}
              <div className="profile-img-container">
                <div className="profile-halo" />
                <div className="profile-img-frame">
                  <Image
                    src={profileImg}
                    alt="Ahmad Raza"
                    width={150}
                    height={150}
                    className="profile-img"
                    priority
                  />
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="code-snippet-box">
                <pre>
                  <code>
                    <span className="code-key">"developer"</span>: <span className="code-str">"Ahmad Raza"</span>,<br/>
                    <span className="code-key">"role"</span>: <span className="code-str">"Software Engineer"</span>,<br/>
                    <span className="code-key">"specialty"</span>: <span className="code-str">"Full-Stack &amp; Cloud"</span>,<br/>
                    <span className="code-key">"status"</span>: <span className="code-str">"Ready for Production 🚀"</span>
                  </code>
                </pre>
              </div>

              {/* Quick Feature Badges */}
              <div className="hero-mini-features">
                <div className="mini-feature">
                  <FaCheckCircle className="feat-icon" />
                  <span>Production Ready</span>
                </div>
                <div className="mini-feature">
                  <FaCloud className="feat-icon" />
                  <span>AWS &amp; IaC</span>
                </div>
                <div className="mini-feature">
                  <FaLaptopCode className="feat-icon" />
                  <span>React &amp; Next.js</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Hint */}
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.1 }}
        onClick={() => scrollTo('about')}
      >
        <div className="scroll-indicator">
          <div className="scroll-dot" />
        </div>
        <span>Scroll to Explore</span>
      </motion.div>
    </div>
  );
}