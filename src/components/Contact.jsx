"use client";

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

export default function Contact() {
  const formRef = useRef(null);
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status,   setStatus]   = useState({ type: '', message: '' });
  const [errors,   setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = 'ERR: name is required';
    if (!formData.email.trim())   e.email   = 'ERR: email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = 'ERR: email is invalid';
    if (!formData.message.trim()) e.message = 'ERR: message cannot be empty';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ type: 'loading', message: '[*] Establishing secure connection...' });

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    )
    .then(() => {
      setStatus({ type: 'success', message: "[+] Message transmitted successfully. Awaiting reply." });
      setFormData({ name: '', email: '', message: '' });
    })
    .catch(() => {
      setStatus({ type: 'error', message: '[-] Connection refused. Please email directly: ahmadraza792003@gmail.com' });
    });
  };

  return (
    <div ref={ref} className="contact-container">
      <motion.div
        className="macos-window"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="macos-header">
          <div className="macos-buttons">
            <span className="macos-btn close" />
            <span className="macos-btn minimize" />
            <span className="macos-btn expand" />
          </div>
          <div className="macos-title">ahmad@macbook: ~/contact.sh</div>
        </div>

        <div className="macos-body contact-terminal-body">
          <div className="term-prompt">
            <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/contact</span>$ <span className="term-cmd">./send_message.sh</span>
          </div>
          
          <div className="term-init">
            Initializing communication protocol...<br/>
            Please provide your credentials below:
          </div>

          <form ref={formRef} className="term-form" onSubmit={handleSubmit}>
            
            <div className="term-input-group">
              <label htmlFor="name" className="term-input-label">
                <span className="prompt-arrow">➜</span> name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="_"
                value={formData.name}
                onChange={handleChange}
                className={`term-input ${errors.name ? 'input-error' : ''}`}
                autoComplete="off"
              />
              {errors.name && <div className="term-error-text">{errors.name}</div>}
            </div>

            <div className="term-input-group">
              <label htmlFor="email" className="term-input-label">
                <span className="prompt-arrow">➜</span> email:
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="_"
                value={formData.email}
                onChange={handleChange}
                className={`term-input ${errors.email ? 'input-error' : ''}`}
                autoComplete="off"
                spellCheck="false"
              />
              {errors.email && <div className="term-error-text">{errors.email}</div>}
            </div>

            <div className="term-input-group term-textarea-group">
              <label htmlFor="message" className="term-input-label">
                <span className="prompt-arrow">➜</span> message_body:
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                className={`term-input term-textarea ${errors.message ? 'input-error' : ''}`}
              />
              {errors.message && <div className="term-error-text">{errors.message}</div>}
            </div>

            <div className="term-submit-row">
              <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/contact</span>$ 
              <motion.button
                type="submit"
                id="contact-submit-btn"
                className="term-submit-btn"
                disabled={status.type === 'loading'}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(99,179,237,0.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                {status.type === 'loading' ? 'executing...' : './submit'}
              </motion.button>
            </div>

            {status.message && (
              <motion.div
                className={`term-status-text status-${status.type}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {status.message}
              </motion.div>
            )}
          </form>
          
        </div>
      </motion.div>
    </div>
  );
}