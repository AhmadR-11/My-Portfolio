import React from 'react';
import {
  FaCode,
  FaServer,
  FaPaintBrush,
  FaJava,
  FaBrain,
  FaRobot,
  FaDatabase
} from 'react-icons/fa';
import './Services.css';

// Services data with detailed descriptions and professional icons
const services = [
  { 
    title: 'Web Development', 
    desc: 'Building responsive, high-performance web applications using React, Next.js, and modern JavaScript. I focus on creating seamless user experiences with clean code architecture, optimized performance, and accessibility compliance that drives user engagement.',
    icon: <FaCode size={30} />,
    color: '#61DAFB' // React blue
  },
  { 
    title: 'API Design & Integration', 
    desc: 'Architecting robust RESTful and GraphQL APIs that power efficient front-end to back-end communication. I implement secure authentication, optimize query performance, and design scalable endpoints that support your applications growth trajectory.',
    icon: <FaServer size={30} />,
    color: '#FF6B6B' // Warm red
  },
  { 
    title: 'UI/UX Design', 
    desc: 'Crafting intuitive interfaces that balance aesthetic appeal with functional efficiency. I translate user research into wireframes and prototypes, then implement pixel-perfect designs with responsive layouts that adapt seamlessly across all devices.',
    icon: <FaPaintBrush size={30} />,
    color: '#A3A1FB' // Purple
  },
  { 
    title: 'Java Development', 
    desc: 'Developing enterprise-grade applications with Java, Spring Boot, and Hibernate. I build scalable microservices, RESTful backends, and data-intensive applications with a focus on performance optimization, security, and maintainable architecture.',
    icon: <FaJava size={30} />,
    color: '#F89820' // Java orange
  },
  { 
    title: 'AI/ML Solutions', 
    desc: 'Implementing machine learning models and AI-driven features using TensorFlow and PyTorch. I specialize in natural language processing, predictive analytics, and recommendation systems that transform raw data into actionable business intelligence.',
    icon: <FaBrain size={30} />,
    color: '#FF9F1C' // Warm amber
  },
  { 
    title: 'Web Scraping & Automation', 
    desc: 'Creating efficient data extraction solutions using Selenium, Beautiful Soup, and custom scrapers. I develop automated workflows that gather, clean, and structure web data, enabling informed decision-making and competitive analysis.',
    icon: <FaRobot size={30} />,
    color: '#2EC4B6' // Teal
  },
  { 
    title: 'Database Design', 
    desc: 'Architecting efficient database solutions with SQL and NoSQL technologies. I design normalized schemas, optimize query performance, and implement data migration strategies that ensure data integrity while supporting application scalability.',
    icon: <FaDatabase size={30} />,
    color: '#3A86FF' // Blue
  }
];

export default function Services() {
  return (
    <div className="services-section">
      <h2>Services & Expertise</h2>
      <p className="section-subtitle">
        Comprehensive solutions tailored to your technical challenges
      </p>
      
      <div className="services-grid">
        {services.map(service => (
          <div key={service.title} className="service-card">
            <div 
              className="service-icon" 
              style={{ 
                backgroundColor: `${service.color}15`, // Using hex opacity
                color: service.color,
                border: `1px solid ${service.color}30`
              }}
            >
              {service.icon}
            </div>
            <h3 className="service-title">{service.title}</h3>
            <div className="service-description">
              <p>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}