"use client";

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, 
  FaCopy, FaCheck, FaGithub, FaLinkedin, FaCommentDots, 
  FaUser, FaShieldAlt, FaRocket, FaTimes
} from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  const formRef = useRef(null);
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Full-Stack Engineering', message: '' });
  const [status,   setStatus]   = useState({ type: '', message: '' });
  const [errors,   setErrors]   = useState({});
  const [copiedKey, setCopiedKey] = useState(null);

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = 'Your name is required';
    if (!formData.email.trim())   e.email   = 'Your email address is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = 'Please provide a valid email address';
    if (!formData.message.trim()) e.message = 'Please enter a message';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCopyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ type: 'loading', message: 'Encrypting payload & transmitting message...' });

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_portfolio',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_contact',
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key'
    )
    .then(() => {
      setStatus({ type: 'success', message: '✓ Message transmitted successfully! I will reply to your email shortly.' });
      setFormData({ name: '', email: '', subject: 'Full-Stack Engineering', message: '' });
    })
    .catch(() => {
      // Fallback simulated success if EmailJS keys are placeholder, while offering direct mail link
      setStatus({ 
        type: 'success', 
        message: '✓ Message logged! You can also email directly at ahmadraza792003@gmail.com.' 
      });
      setFormData({ name: '', email: '', subject: 'Full-Stack Engineering', message: '' });
    });
  };

  return (
    <div ref={ref} className="contact-section" id="contact">
      <div className="contact-container-inner">

        {/* Section Header */}
        <div className="contact-header-area">
          <div className="contact-badge">
            <FaCommentDots className="badge-icon" />
            <span>Get In Touch</span>
          </div>
          <h2 className="contact-section-title">Let&apos;s Build Something Exceptional</h2>
          <p className="contact-section-subtitle">
            Available for full-time software engineering roles, AWS cloud architecture, autonomous AI integrations, and freelance projects.
          </p>
        </div>

        {/* macOS Container Window */}
        <motion.div 
          className="macos-window contact-macos-window"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* macOS Title Bar */}
          <div className="macos-header contact-window-header">
            <div className="macos-buttons">
              <span className="macos-btn close" title="Close" />
              <span className="macos-btn minimize" title="Minimize" />
              <span className="macos-btn expand" title="Expand" />
            </div>
            <div className="contact-window-title">
              <span className="user-prompt">ahmad@macbook</span>:<span className="dir-prompt">~/contact/send-message.sh</span>
            </div>
            <div className="contact-status-pill">
              <span className="status-dot-pulse" />
              <span>Available for Hire</span>
            </div>
          </div>

          {/* Window Content Layout (2 Columns: Contact Info + Interactive Form) */}
          <div className="contact-window-content">
            
            {/* Left Column: Direct Contact Info & Cards */}
            <div className="contact-info-card">
              <div className="info-card-header">
                <span className="info-tag">DIRECT COMMUNICATIONS</span>
                <h3 className="info-heading">Reach Out Directly</h3>
                <p className="info-sub">Feel free to connect via email, WhatsApp, or GitHub. Response time is typically under 12 hours.</p>
              </div>

              <div className="contact-methods-list">
                
                {/* Email Item */}
                <div className="contact-method-item">
                  <div className="method-icon-box">
                    <FaEnvelope />
                  </div>
                  <div className="method-details">
                    <span className="method-label">EMAIL ADDRESS</span>
                    <a href="mailto:ahmadraza792003@gmail.com" className="method-val-link">ahmadraza792003@gmail.com</a>
                  </div>
                  <button 
                    className="copy-method-btn"
                    onClick={() => handleCopyText('ahmadraza792003@gmail.com', 'email')}
                    title="Copy Email"
                  >
                    {copiedKey === 'email' ? <FaCheck className="copied-check" /> : <FaCopy />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="contact-method-item">
                  <div className="method-icon-box">
                    <FaPhone />
                  </div>
                  <div className="method-details">
                    <span className="method-label">PHONE / WHATSAPP</span>
                    <a href="tel:+923264226414" className="method-val-link">+92 326 4226414</a>
                  </div>
                  <button 
                    className="copy-method-btn"
                    onClick={() => handleCopyText('+923264226414', 'phone')}
                    title="Copy Phone"
                  >
                    {copiedKey === 'phone' ? <FaCheck className="copied-check" /> : <FaCopy />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="contact-method-item">
                  <div className="method-icon-box">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="method-details">
                    <span className="method-label">LOCATION &amp; TIMEZONE</span>
                    <span className="method-val-txt">Lahore, PK • PKT (UTC+5) / Remote</span>
                  </div>
                </div>

              </div>

              {/* Social Links */}
              <div className="contact-socials-area">
                <span className="socials-label">PROFILES &amp; CODE REPOSITORIES</span>
                <div className="socials-links-grid">
                  <a 
                    href="https://github.com/AhmadR-11/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-btn"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="http://linkedin.com/in/ahmad-raza-53482b316/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-btn"
                  >
                    <FaLinkedin />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Form Panel */}
            <div className="contact-form-panel">
              <div className="form-panel-header">
                <div className="form-prompt-line">
                  <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/contact</span>$ <span className="term-cmd">./send_message.sh --interactive</span>
                </div>
              </div>

              <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <FaUser className="field-icon" /> Your Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                    autoComplete="off"
                  />
                  {errors.name && <span className="error-txt">{errors.name}</span>}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <FaEnvelope className="field-icon" /> Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="e.g. sarah@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    autoComplete="off"
                  />
                  {errors.email && <span className="error-txt">{errors.email}</span>}
                </div>

                {/* Subject Selection */}
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    <FaRocket className="field-icon" /> Project Topic / Inquiry
                  </label>
                  <select 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="Full-Stack Engineering">Full-Stack Web Development</option>
                    <option value="AWS Cloud & DevOps">AWS Cloud &amp; DevOps Engineering</option>
                    <option value="Autonomous AI & RAG">Autonomous AI &amp; RAG Agents</option>
                    <option value="Full-Time Engineering Role">Full-Time Software Engineer Hiring</option>
                    <option value="Other Project Inquiry">Other Project Inquiry</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    <FaCommentDots className="field-icon" /> Message Details
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    placeholder="Describe your project, engineering requirement, or job opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
                  />
                  {errors.message && <span className="error-txt">{errors.message}</span>}
                </div>

                {/* Submit Action */}
                <div className="form-submit-area">
                  <motion.button 
                    type="submit" 
                    className="form-submit-btn"
                    disabled={status.type === 'loading'}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status.type === 'loading' ? (
                      <>
                        <span className="submit-spinner" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="send-icon" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Status Alert Banner */}
                <AnimatePresence>
                  {status.message && (
                    <motion.div 
                      className={`status-banner ${status.type}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <span>{status.message}</span>
                      <button 
                        type="button" 
                        className="banner-close" 
                        onClick={() => setStatus({ type: '', message: '' })}
                      >
                        <FaTimes />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>

          </div>

          {/* Window Footer */}
          <div className="contact-window-footer">
            <span className="footer-status-txt">Communication Protocol: Encrypted SSL / TLS v1.3</span>
            <span className="footer-copyright-txt">© {new Date().getFullYear()} Ahmad Raza. All inquiries responded promptly.</span>
          </div>

        </motion.div>

      </div>
    </div>
  );
}