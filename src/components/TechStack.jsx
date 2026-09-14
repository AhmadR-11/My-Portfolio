"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaAws, FaTerminal, FaBrain, FaRobot, 
  FaSearch, FaTimes, FaExpandAlt, FaCompressAlt,
  FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';
import { 
  SiPython, SiNodedotjs, SiReact, SiNextdotjs, 
  SiJenkins, SiApachetomcat, SiTerraform, 
  SiDocker, SiKubernetes, SiLinux, SiUbuntu, SiGithub,
  SiTensorflow, SiPytorch, SiOpenai, SiSelenium
} from 'react-icons/si';
import './TechStack.css';

const categories = [
  { id: 'all', label: 'All Stack' },
  { id: 'frontend', label: 'Frontend & Full-Stack' },
  { id: 'devops', label: 'Cloud & DevOps' },
  { id: 'backend', label: 'Backend & Tools' },
  { id: 'aiml', label: 'AI & Machine Learning' },
  { id: 'automation', label: 'Data & Automation' },
];

const techData = [
  { name: "React.js",    category: 'frontend',   Icon: SiReact,        color: '#61dafb', tag: 'UI Library',    desc: 'Component architecture, Hooks, State management' },
  { name: "Next.js",     category: 'frontend',   Icon: SiNextdotjs,     color: '#ffffff', tag: 'Framework',     desc: 'App Router, SSR, SSG, Turbopack' },
  { name: "Node.js",     category: 'backend',    Icon: SiNodedotjs,    color: '#339933', tag: 'Runtime',       desc: 'REST APIs, Express, Event-driven architecture' },
  { name: "Python",      category: 'backend',    Icon: SiPython,       color: '#3776ab', tag: 'Language',      desc: 'Automation, ML pipelines, Data Extraction' },
  { name: "AWS",         category: 'devops',     Icon: FaAws,          color: '#ff9900', tag: 'Cloud Provider',desc: 'EC2, S3, IAM, VPC, CloudFront' },
  { name: "Docker",      category: 'devops',     Icon: SiDocker,       color: '#2496ed', tag: 'Containers',    desc: 'Multi-stage builds, Containerization' },
  { name: "Kubernetes",  category: 'devops',     Icon: SiKubernetes,   color: '#326ce5', tag: 'Orchestration', desc: 'Deployments, Pods, Helm Charts' },
  { name: "Terraform",   category: 'devops',     Icon: SiTerraform,    color: '#844fba', tag: 'IaC',           desc: 'Infrastructure provisioning, State management' },
  { name: "Jenkins",     category: 'devops',     Icon: SiJenkins,      color: '#d33833', tag: 'CI/CD',         desc: 'Automated build & delivery pipelines' },
  { name: "Tomcat",      category: 'backend',    Icon: SiApachetomcat, color: '#f8dc75', tag: 'App Server',    desc: 'Java WAR deployments, Servlet engine' },
  { name: "Linux",       category: 'devops',     Icon: SiLinux,        color: '#facc15', tag: 'OS',            desc: 'Shell scripting, System administration' },
  { name: "Ubuntu",      category: 'devops',     Icon: SiUbuntu,       color: '#e95420', tag: 'Distro',        desc: 'Server configuration & hardening' },
  { name: "GitHub",      category: 'backend',    Icon: SiGithub,       color: '#f8fafc', tag: 'VCS',           desc: 'Git workflows, Actions, Code review' },
  
  /* AI / ML & Automation Addition */
  { name: "OpenAI / LLMs", category: 'aiml',     Icon: SiOpenai,       color: '#10a37f', tag: 'Generative AI', desc: 'API integration, Prompt engineering, Fine-tuning' },
  { name: "PyTorch",       category: 'aiml',     Icon: SiPytorch,      color: '#ee4c2c', tag: 'Deep Learning', desc: 'Neural networks, Tensor computation' },
  { name: "TensorFlow",    category: 'aiml',     Icon: SiTensorflow,   color: '#ff6f00', tag: 'ML Framework', desc: 'Model building, Training & Inference' },
  { name: "NLP & Scraping",category: 'automation',Icon: SiSelenium,    color: '#43b02a', tag: 'Automation',   desc: 'Web scraping, Data extraction pipelines' },
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollContainerRef = useRef(null);
  const modalScrollRef = useRef(null);

  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredTech = techData.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="tech-stack-section">
      <div className="tech-stack-container-inner">

        {/* Section Header */}
        <div className="tech-header-area">
          <div className="tech-badge">
            <FaTerminal className="badge-icon" />
            <span>Tech Ecosystem</span>
          </div>
          <h2 className="tech-section-title">Engineered for Scale &amp; Performance</h2>
          <p className="tech-section-subtitle">
            A curated suite of modern frameworks, cloud tools, AI/ML models, and DevOps infrastructure powering my applications.
          </p>
        </div>

        {/* macOS Terminal Window Container */}
        <div className="macos-window tech-macos-window">

          {/* Window Header Bar */}
          <div className="macos-header tech-window-header">
            <div className="macos-buttons">
              <span className="macos-btn close" title="Reset Filters" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} />
              <span className="macos-btn minimize" title="Clear Search" onClick={() => setSearchQuery('')} />
              <span className="macos-btn expand" title="Expand Full View" onClick={() => setIsModalOpen(true)} />
            </div>

            <div className="tech-window-breadcrumb">
              <span className="tech-user-path">ahmad@macbook</span>:<span className="tech-dir-path">~/skills</span>
            </div>
          </div>

          {/* macOS Apple Toolbar Ribbon (Top-Left Search + Arrow-Navigated Category Filters) */}
          <div className="tech-toolbar-strip">
            
            {/* Top Left Search Input Box */}
            <div className="tech-search-container">
              <FaSearch className="tech-search-icon" />
              <input 
                type="text" 
                className="tech-search-input"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="tech-search-clear" onClick={() => setSearchQuery('')} title="Clear search">
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Category Navigation with Left/Right Arrows */}
            <div className="mac-segmented-nav">
              <button 
                className="nav-scroll-btn left" 
                onClick={() => handleScroll(scrollContainerRef, 'left')}
                title="Scroll categories left"
              >
                <FaChevronLeft />
              </button>

              <div className="mac-segmented-control-wrapper" ref={scrollContainerRef}>
                <div className="mac-segmented-control">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className={`mac-seg-btn ${activeCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                className="nav-scroll-btn right" 
                onClick={() => handleScroll(scrollContainerRef, 'right')}
                title="Scroll categories right"
              >
                <FaChevronRight />
              </button>
            </div>

          </div>

          {/* Window Body Grid Container with Max Height & Glass Scrollbar */}
          <div className="macos-body tech-window-body">
            <div className="tech-scroll-container">
              <motion.div 
                className="tech-grid"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredTech.length > 0 ? (
                    filteredTech.map((tech) => {
                      const Icon = tech.Icon;
                      return (
                        <motion.div
                          key={tech.name}
                          layout
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          transition={{ duration: 0.2 }}
                          className="tech-card-tile"
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {/* Dynamic Color Glow Backdrop */}
                          <div 
                            className="tech-card-glow" 
                            style={{ background: `radial-gradient(circle at center, ${tech.color}20 0%, transparent 70%)` }}
                          />

                          {/* Tile Top Row: Icon + Tag */}
                          <div className="tech-tile-top-row">
                            <div className="tech-tile-icon-box" style={{ borderColor: `${tech.color}35` }}>
                              <Icon className="tech-tile-icon" style={{ color: tech.color }} />
                            </div>
                            <span className="tech-tile-tag">{tech.tag}</span>
                          </div>

                          {/* Tile Info */}
                          <div className="tech-tile-info">
                            <h3 className="tech-tile-name">{tech.name}</h3>
                            <p className="tech-tile-desc">{tech.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="tech-no-results">
                      <p>No matching skills found for &quot;{searchQuery}&quot;</p>
                      <button className="tech-reset-btn" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                        Reset Search Filters
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Footer Terminal Command with Absolutely Centered Status Pill */}
            <div className="tech-terminal-footer">
              <div className="term-prompt-left">
                <span className="term-prompt-user">ahmad@macbook</span>:<span className="term-prompt-dir">~/skills</span>$&nbsp;
                <span className="term-prompt-cmd">./status --check</span>
              </div>

              {/* Centered Operational Systems Pill */}
              <div className="term-status-pill">
                <span className="term-status-dot" />
                <span>Showing {filteredTech.length} of {techData.length} core systems</span>
              </div>

              {/* Expand View Option Button */}
              <button className="tech-expand-btn" onClick={() => setIsModalOpen(true)}>
                <FaExpandAlt className="expand-icon" />
                <span>Expand Full Window View</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Expanded macOS Full Window View Modal (Opens separately on top of screen) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="tech-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className="tech-modal-window macos-window"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Title Bar */}
              <div className="macos-header tech-window-header">
                <div className="macos-buttons">
                  <span className="macos-btn close" title="Close Window" onClick={() => setIsModalOpen(false)} />
                  <span className="macos-btn minimize" onClick={() => setIsModalOpen(false)} />
                  <span className="macos-btn expand" onClick={() => setIsModalOpen(false)} />
                </div>
                <div className="tech-window-breadcrumb">
                  <span className="tech-user-path">ahmad@macbook</span>:<span className="tech-dir-path">~/skills/full-ecosystem.json</span>
                </div>
                <button className="tech-modal-close-btn" onClick={() => setIsModalOpen(false)}>
                  <FaTimes /> Esc
                </button>
              </div>

              {/* Modal Toolbar */}
              <div className="tech-toolbar-strip">
                <div className="tech-search-container">
                  <FaSearch className="tech-search-icon" />
                  <input 
                    type="text" 
                    className="tech-search-input"
                    placeholder="Search full stack..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button className="tech-search-clear" onClick={() => setSearchQuery('')}>
                      <FaTimes />
                    </button>
                  )}
                </div>

                <div className="mac-segmented-nav">
                  <button 
                    className="nav-scroll-btn left" 
                    onClick={() => handleScroll(modalScrollRef, 'left')}
                  >
                    <FaChevronLeft />
                  </button>

                  <div className="mac-segmented-control-wrapper" ref={modalScrollRef}>
                    <div className="mac-segmented-control">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          className={`mac-seg-btn ${activeCategory === cat.id ? 'active' : ''}`}
                          onClick={() => setActiveCategory(cat.id)}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="nav-scroll-btn right" 
                    onClick={() => handleScroll(modalScrollRef, 'right')}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>

              {/* Modal Body Grid */}
              <div className="tech-modal-body">
                <div className="tech-modal-grid">
                  {filteredTech.map((tech) => {
                    const Icon = tech.Icon;
                    return (
                      <div key={tech.name} className="tech-card-tile modal-tile">
                        <div 
                          className="tech-card-glow" 
                          style={{ background: `radial-gradient(circle at center, ${tech.color}25 0%, transparent 70%)`, opacity: 1 }}
                        />
                        <div className="tech-tile-top-row">
                          <div className="tech-tile-icon-box" style={{ borderColor: `${tech.color}50` }}>
                            <Icon className="tech-tile-icon" style={{ color: tech.color }} />
                          </div>
                          <span className="tech-tile-tag">{tech.tag}</span>
                        </div>
                        <div className="tech-tile-info">
                          <h3 className="tech-tile-name">{tech.name}</h3>
                          <p className="tech-tile-desc">{tech.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="tech-terminal-footer modal-footer">
                <span>Showing {filteredTech.length} of {techData.length} operational systems</span>
                <button className="tech-expand-btn close-modal-btn" onClick={() => setIsModalOpen(false)}>
                  <FaCompressAlt /> Close Window
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


