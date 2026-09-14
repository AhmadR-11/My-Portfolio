"use client";

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  FaUser, FaCode, FaCloud, FaBrain, FaTerminal, 
  FaFileDownload, FaEnvelope, FaCheckCircle, FaLaptopCode, 
  FaCertificate, FaGlobe, FaRocket, FaLayerGroup, FaShieldAlt
} from 'react-icons/fa';
import './About.css';

const stats = [
  { label: 'Years Experience', value: '3+', icon: FaRocket },
  { label: 'Production Deploys', value: '50+', icon: FaLayerGroup },
  { label: 'System Uptime', value: '99.9%', icon: FaShieldAlt },
];

const specializations = [
  { 
    title: 'Full-Stack Architecture', 
    desc: 'Designing reactive UIs with React 19 & Next.js 16 coupled with Node.js and Java microservices.',
    icon: FaLaptopCode,
    skills: ['React.js', 'Next.js', 'Node.js', 'Java', 'TypeScript']
  },
  { 
    title: 'Cloud & DevOps Engineering', 
    desc: 'Provisioning automated infrastructure with Terraform, AWS (EC2/S3/Lambda), Docker & Kubernetes.',
    icon: FaCloud,
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD']
  },
  { 
    title: 'AI/ML & Data Pipelines', 
    desc: 'Integrating OpenAI LLMs, PyTorch neural models, and automated data extraction scrapers.',
    icon: FaBrain,
    skills: ['PyTorch', 'TensorFlow', 'OpenAI API', 'Selenium', 'Python']
  }
];

export default function About() {
  const [activeTab, setActiveTab] = useState('overview');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="about-section">
      <div className="about-container-inner">

        {/* Section Header */}
        <div className="about-header-area">
          <div className="about-badge">
            <FaUser className="badge-icon" />
            <span>Developer Profile</span>
          </div>
          <h2 className="about-section-title">Architecting Digital Excellence</h2>
          <p className="about-section-subtitle">
            A software engineer dedicated to building scalable web applications, cloud infrastructure, and AI-driven automation.
          </p>
        </div>

        {/* macOS Main Application Window */}
        <motion.div 
          className="macos-window about-macos-window"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* macOS Title Bar */}
          <div className="macos-header about-window-header">
            <div className="macos-buttons">
              <span className="macos-btn close" title="Close" />
              <span className="macos-btn minimize" title="Minimize" />
              <span className="macos-btn expand" title="Expand" />
            </div>
            <div className="about-window-breadcrumb">
              <span className="about-user-path">ahmad@macbook</span>:<span className="about-dir-path">~/about/developer-profile</span>
            </div>
          </div>

          {/* Window Main Content (2 Columns: Left Profile Card + Right Interactive Inspector) */}
          <div className="about-window-content">

            {/* Left Column — Developer Card */}
            <div className="about-profile-card">
              
              {/* Profile Avatar Frame with Glow & Online Indicator */}
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar-glow" />
                <div className="profile-avatar-container">
                  <Image 
                    src="/profile.png" 
                    alt="Ahmad Raza" 
                    width={140} 
                    height={140} 
                    className="profile-avatar-img"
                    priority
                  />
                </div>
                <div className="profile-status-badge" title="Available for Engineering Roles">
                  <span className="status-ping" />
                  <span>Online</span>
                </div>
              </div>

              {/* Developer Details */}
              <div className="profile-details">
                <h3 className="profile-name">Ahmad Raza</h3>
                <p className="profile-role">Software Engineer &amp; AI Architect</p>
                <div className="profile-location">
                  <FaGlobe className="loc-icon" />
                  <span>Islamabad / Remote Worldwide</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="profile-stats-grid">
                {stats.map((st, i) => {
                  const Icon = st.icon;
                  return (
                    <div key={i} className="profile-stat-box">
                      <Icon className="stat-box-icon" />
                      <span className="stat-box-val">{st.value}</span>
                      <span className="stat-box-lbl">{st.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="profile-actions">
                <a 
                  href="/Ahmad-Raza-Software-Engineer.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="profile-btn primary-btn"
                >
                  <FaFileDownload />
                  <span>Download CV</span>
                </a>
                <a 
                  href="#contact" 
                  className="profile-btn secondary-btn"
                >
                  <FaEnvelope />
                  <span>Get In Touch</span>
                </a>
              </div>

            </div>

            {/* Right Column — Tabbed Inspector */}
            <div className="about-inspector">
              
              {/* Inspector Header Tabs */}
              <div className="inspector-tabs-header">
                <button 
                  className={`inspector-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FaUser className="tab-btn-icon" />
                  <span>Overview</span>
                </button>

                <button 
                  className={`inspector-tab-btn ${activeTab === 'specializations' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specializations')}
                >
                  <FaCode className="tab-btn-icon" />
                  <span>Specializations</span>
                </button>

                <button 
                  className={`inspector-tab-btn ${activeTab === 'terminal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('terminal')}
                >
                  <FaTerminal className="tab-btn-icon" />
                  <span>Terminal Bio</span>
                </button>
              </div>

              {/* Tab Content Panels */}
              <div className="inspector-body">
                <AnimatePresence mode="wait">
                  
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <motion.div 
                      key="overview"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="tab-panel"
                    >
                      <h4 className="panel-heading">Engineering Mindset &amp; Philosophy</h4>
                      <p className="panel-bio">
                        I am a full-stack software engineer passionate about constructing high-performance, fault-tolerant web applications. My development methodology bridges modern frontend aesthetics with resilient backend microservices and automated DevOps infrastructure.
                      </p>
                      <p className="panel-bio">
                        With extensive experience in Java enterprise development and modern React/Next.js architectures, I specialize in transforming complex business workflows into seamless, pixel-perfect digital experiences.
                      </p>

                      {/* Core Highlights Cards */}
                      <div className="highlights-grid">
                        <div className="highlight-card">
                          <FaCheckCircle className="hl-icon" />
                          <div>
                            <h5>Full-Stack Expertise</h5>
                            <p>End-to-end web apps with React, Next.js, Node, &amp; Java</p>
                          </div>
                        </div>

                        <div className="highlight-card">
                          <FaCheckCircle className="hl-icon" />
                          <div>
                            <h5>Cloud Native &amp; IaC</h5>
                            <p>Automated provisioning with Terraform, AWS, &amp; K8s</p>
                          </div>
                        </div>

                        <div className="highlight-card">
                          <FaCheckCircle className="hl-icon" />
                          <div>
                            <h5>AI Models &amp; Scrapers</h5>
                            <p>LLM integrations, PyTorch models, &amp; web automation</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Specializations Tab */}
                  {activeTab === 'specializations' && (
                    <motion.div 
                      key="specializations"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="tab-panel"
                    >
                      <h4 className="panel-heading">Domain Expertise</h4>
                      <div className="spec-list">
                        {specializations.map((spec, i) => {
                          const Icon = spec.icon;
                          return (
                            <div key={i} className="spec-card">
                              <div className="spec-card-header">
                                <div className="spec-icon-box">
                                  <Icon />
                                </div>
                                <h5 className="spec-title">{spec.title}</h5>
                              </div>
                              <p className="spec-desc">{spec.desc}</p>
                              <div className="spec-skills-chips">
                                {spec.skills.map((sk, j) => (
                                  <span key={j} className="spec-chip">{sk}</span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Terminal Bio Tab */}
                  {activeTab === 'terminal' && (
                    <motion.div 
                      key="terminal"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="tab-panel terminal-panel"
                    >
                      <div className="term-prompt">
                        <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/about</span>$ <span className="term-cmd">cat bio.txt</span>
                      </div>
                      <div className="term-output-box">
                        <p>I&apos;m a software engineer specializing in building exceptional digital experiences. Currently, I&apos;m focused on creating responsive full-stack web applications that solve real-world problems.</p>
                        <br />
                        <p>My approach combines technical expertise with creative problem-solving to deliver solutions that are both functional and user-friendly. I&apos;m constantly learning new technologies to stay at the forefront of engineering.</p>
                        <br />
                        <p>With experience in Java development and a growing interest in AI/ML, I also build data extraction pipelines via web scraping.</p>
                      </div>

                      <div className="term-prompt mt-4">
                        <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/about</span>$ <span className="term-cmd">./status --check</span>
                      </div>
                      <div className="term-output-box term-status-output">
                        <span className="term-green-dot" /> Status: 100% Operational &amp; Available for Hire
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>

          </div>

          {/* Window Footer */}
          <div className="about-window-footer">
            <span className="footer-status-txt">System Info: Apple M-Series Silicon — macOS Sonoma Dark</span>
            <span className="footer-copyright-txt">© {new Date().getFullYear()} Ahmad Raza. All rights reserved.</span>
          </div>

        </motion.div>

      </div>
    </div>
  );
}