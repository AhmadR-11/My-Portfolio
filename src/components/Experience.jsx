"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Experience.css';

const bootLogs = [
  { time: '0.000000', status: 'OK', message: 'Booting DevOps Infrastructure Subsystem...' },
  { time: '0.014231', status: 'OK', message: 'Starting Docker daemon...' },
  { time: '0.045192', status: 'OK', message: 'Initializing Kubernetes control plane...' },
  { time: '0.089221', status: 'INFO', message: 'Terraform: Analyzing Infrastructure as Code (IaC) state...' },
  { time: '0.124501', status: 'OK', message: 'AWS: Authenticated successfully. Regions active.' },
  { time: '0.150221', status: 'OK', message: 'Jenkins CI/CD pipeline listener started on port 8080.' },
  { time: '0.180532', status: 'OK', message: 'Apache Tomcat server deploying application WARs...' },
  { time: '0.210444', status: 'INFO', message: 'Verifying container orchestration metrics...' },
  { time: '0.250111', status: 'OK', message: 'System fully operational. All DevOps modules loaded.' }
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const lineVariants = {
  hidden: { opacity: 0, x: -10 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.1 } },
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [showPrompt, setShowPrompt] = useState(false);

  // Show the final prompt only after all logs have "booted"
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, bootLogs.length * 200 + 500); // Wait for stagger animation to finish
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div ref={ref} className="exp-container">
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
          <div className="macos-title">ahmad@macbook: ~/experience/devops</div>
        </div>

        <div className="macos-body exp-terminal-body">
          <motion.div
            className="boot-log-container"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {bootLogs.map((log, i) => (
              <motion.div key={i} className="boot-line" variants={lineVariants}>
                <span className="boot-time">[{log.time}]</span>
                <span className={`boot-status status-${log.status.toLowerCase()}`}>
                  {log.status === 'OK' ? '  OK  ' : ' INFO '}
                </span>
                <span className="boot-message">{log.message}</span>
              </motion.div>
            ))}
          </motion.div>

          {showPrompt && (
            <motion.div 
              className="term-prompt mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/experience/devops</span>$ <span className="term-cmd">cat summary.md</span>
              
              <div className="exp-summary">
                <h3>Cloud &amp; DevOps Engineering</h3>
                <p>
                  Specialized in designing, deploying, and maintaining scalable infrastructure. 
                  Experienced with <strong>Infrastructure as Code (IaC)</strong> using <strong>Terraform</strong> on <strong>AWS</strong>. 
                  Proficient in containerization and orchestration using <strong>Docker</strong> and <strong>Kubernetes</strong>. 
                  Strong background in configuring CI/CD pipelines with <strong>Jenkins</strong> and deploying applications via <strong>Tomcat</strong>.
                </p>
              </div>

              <div className="term-prompt mt-4">
                <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/experience/devops</span>$ <span className="term-cursor" />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
