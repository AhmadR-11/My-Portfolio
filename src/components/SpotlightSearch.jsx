"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTerminal, FaCode, FaBriefcase, FaEnvelope, FaFileDownload, FaArrowRight, FaTimes } from 'react-icons/fa';
import './SpotlightSearch.css';

const spotlightData = [
  { id: 'nav-home', title: 'Hero & Home', category: 'Navigation', icon: FaTerminal, action: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-tech', title: 'Tech Ecosystem & Skills', category: 'Navigation', icon: FaCode, action: () => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-about', title: 'About Ahmad Raza', category: 'Navigation', icon: FaTerminal, action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-services', title: 'Services & Solutions', category: 'Navigation', icon: FaBriefcase, action: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-experience', title: 'Experience & History', category: 'Navigation', icon: FaBriefcase, action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-projects', title: 'Featured Projects', category: 'Navigation', icon: FaCode, action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-contact', title: 'Contact & Hire Me', category: 'Navigation', icon: FaEnvelope, action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  
  /* Skills */
  { id: 'skill-react', title: 'React.js / Next.js 16', category: 'Skill', icon: FaCode, action: () => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'skill-pytorch', title: 'PyTorch & Deep Learning', category: 'Skill', icon: FaCode, action: () => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'skill-openai', title: 'OpenAI LLM Integration', category: 'Skill', icon: FaCode, action: () => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'skill-devops', title: 'AWS, Docker & Kubernetes', category: 'Skill', icon: FaTerminal, action: () => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' }) },

  /* Actions */
  { id: 'action-resume', title: 'Download Resume / CV (PDF)', category: 'Action', icon: FaFileDownload, action: () => window.open('/Ahmad-Raza-Software-Engineer.pdf', '_blank') },
  { id: 'action-email', title: 'Send Email to Ahmad', category: 'Action', icon: FaEnvelope, action: () => window.location.href = 'mailto:ahmadraza.dev@gmail.com' }
];

export default function SpotlightSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = spotlightData.filter(item => 
    query.trim() === '' || 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    item.action();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="spotlight-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="spotlight-card macos-window"
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="spotlight-header">
              <FaSearch className="spotlight-search-icon" />
              <input 
                type="text" 
                className="spotlight-input"
                placeholder="Spotlight Search (Type section, skill, project or action)..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                autoFocus
              />
              <button className="spotlight-close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            {/* Results List */}
            <div className="spotlight-results">
              {results.length > 0 ? (
                results.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.id}
                      className={`spotlight-item ${idx === selectedIndex ? 'selected' : ''}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="spotlight-item-left">
                        <div className="spotlight-item-icon">
                          <Icon />
                        </div>
                        <span className="spotlight-item-title">{item.title}</span>
                      </div>
                      <div className="spotlight-item-right">
                        <span className="spotlight-item-cat">{item.category}</span>
                        <FaArrowRight className="spotlight-arrow" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="spotlight-empty">
                  <p>No matching commands found for &quot;{query}&quot;</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="spotlight-footer">
              <span>Press <kbd>↵</kbd> to select</span>
              <span>Press <kbd>ESC</kbd> to exit</span>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
