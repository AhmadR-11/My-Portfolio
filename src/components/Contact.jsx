import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

export default function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus({ type: 'loading', message: 'Sending message...' });
    
    // EmailJS configuration
    // These are the actual parameters you need to set up in your EmailJS account
    emailjs.sendForm(
      'ahmad123', // Replace with your EmailJS service ID
      'template_t4ieqoy', // Replace with your EmailJS template ID
      form.current,
      '7cTTSxgl7eEw_8akp' // Replace with your EmailJS public key
    )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setStatus({ 
          type: 'success', 
          message: 'Message sent successfully! I\'ll get back to you soon.' 
        });
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setStatus({ 
          type: 'error', 
          message: 'Failed to send message. Please try again or contact me directly at ahmadraza792003@gmail.com' 
        });
      });
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <p>Have a question or want to work together? Feel free to reach out!</p>
      
      <form className="contact-form" ref={form} onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <textarea
            name="message"
            rows="5"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'error' : ''}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>
        
        <button 
          type="submit" 
          disabled={status.type === 'loading'}
          className={status.type === 'loading' ? 'loading' : ''}
        >
          {status.type === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
        
        {status.message && (
          <p className={`form-status ${status.type}`}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}