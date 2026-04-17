"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCode, FaServer, FaPaintBrush, FaJava, FaBrain, FaRobot, FaDatabase, FaCloud } from 'react-icons/fa';
import './Services.css';

const services = [
  { id: 'web-dev',    title: 'Web Development',          desc: 'Building responsive, high-performance web applications using React, Next.js, and modern JS.', icon: FaCode, color: '#61DAFB' },
  { id: 'devops',     title: 'Cloud & DevOps',           desc: 'Automating AWS infrastructure with Terraform and shipping reliable releases through Docker, Kubernetes, Jenkins, and Tomcat.', icon: FaCloud, color: '#7dd3fc' },
  { id: 'api-design', title: 'API Design & Integration', desc: 'Architecting robust RESTful and GraphQL APIs with secure authentication and scalable endpoints.', icon: FaServer, color: '#FF6B6B' },
  { id: 'ui-ux',      title: 'UI/UX Design',             desc: 'Crafting intuitive interfaces that balance aesthetic appeal with functional efficiency.', icon: FaPaintBrush, color: '#A3A1FB' },
  { id: 'java-dev',   title: 'Java Development',         desc: 'Developing enterprise-grade applications with Java, Spring Boot, and Hibernate.', icon: FaJava, color: '#F89820' },
  { id: 'ai-ml',      title: 'AI/ML Solutions',          desc: 'Implementing machine learning models using TensorFlow and PyTorch for predictive analytics.', icon: FaBrain, color: '#FF9F1C' },
  { id: 'scraping',   title: 'Web Scraping',             desc: 'Creating efficient data extraction pipelines using Selenium and Beautiful Soup.', icon: FaRobot, color: '#2EC4B6' },
  { id: 'db-design',  title: 'Database Design',          desc: 'Architecting efficient SQL and NoSQL database solutions with optimized schemas.', icon: FaDatabase, color: '#3A86FF' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="services-container">
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
          <div className="macos-title">ahmad@macbook: ~/services</div>
        </div>

        <div className="macos-body services-terminal-body">
          <div className="term-prompt">
            <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/services</span>$ <span className="term-cmd">docker-compose ps</span>
          </div>

          <motion.div
            className="term-services-table"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <div className="term-table-header">
              <span className="col-name">NAME</span>
              <span className="col-status">STATUS</span>
              <span className="col-ports">PORTS</span>
              <span className="col-desc">DESCRIPTION</span>
            </div>

            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div key={svc.id} className="term-table-row" variants={rowVariants}>
                  <span className="col-name">
                    <Icon style={{ color: svc.color, marginRight: '8px' }} />
                    {svc.id}
                  </span>
                  <span className="col-status"><span className="status-dot"></span> Up {i + 2} days</span>
                  <span className="col-ports">0.0.0.0:{8080 + i}-&gt;{8080 + i}/tcp</span>
                  <span className="col-desc">{svc.desc}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="term-prompt mt-6">
            <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/services</span>$ <span className="term-cursor" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}