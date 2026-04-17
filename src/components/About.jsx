"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const skills = [
  { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'React',      url: 'https://reactjs.org' },
  { name: 'Next.js',    url: 'https://nextjs.org' },
  { name: 'Node.js',    url: 'https://nodejs.org' },
  { name: 'Java',       url: 'https://dev.java/' },
  { name: 'AWS',        url: 'https://aws.amazon.com/' },
  { name: 'Terraform',  url: 'https://www.terraform.io/' },
  { name: 'Docker',     url: 'https://www.docker.com/' },
  { name: 'Kubernetes', url: 'https://kubernetes.io/' },
  { name: 'Jenkins',    url: 'https://www.jenkins.io/' },
  { name: 'Apache Tomcat', url: 'https://tomcat.apache.org/' },
  { name: 'CSS/SCSS',   url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'HTML5',      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'Git',        url: 'https://git-scm.com' },
  { name: 'AI/ML',      url: 'https://www.tensorflow.org/' },
  { name: 'Web Scraping', url: 'https://www.selenium.dev/' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

function getDeterministicSize(name, index) {
  const seed = name
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0) + index * 97;
  return String((seed % 4000) + 1000).padStart(5, ' ');
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="about-container">
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
          <div className="macos-title">ahmad@macbook: ~/about</div>
        </div>

        <div className="macos-body about-terminal-body">
          {/* Bio Command */}
          <div className="term-prompt">
            <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/about</span>$ <span className="term-cmd">cat bio.txt</span>
          </div>
          <motion.div
            className="term-output"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            I'm a software engineer specializing in building exceptional digital experiences.
            Currently, I'm focused on creating responsive full-stack web applications
            that solve real-world problems.
            <br /><br />
            My approach combines technical expertise with creative problem-solving
            to deliver solutions that are both functional and user-friendly.
            I'm constantly learning new technologies and methodologies to stay
            at the forefront of web development.
            <br /><br />
            With experience in Java development and a growing interest in AI/ML,
            I also enjoy building data extraction solutions through web scraping.
            This diverse skill set allows me to tackle projects from multiple angles.
          </motion.div>

          {/* Skills Command */}
          <div className="term-prompt mt-6">
            <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/about</span>$ <span className="term-cmd">ls -l ./skills</span>
          </div>
          <motion.div
            className="term-skills-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {skills.map((skill, i) => {
              const fileName = skill.name.toLowerCase().replace(/[\/\s]/g, '_') + '.sh';
              const date = `Oct ${String(10 + (i % 15)).padStart(2, '0')} 14:${String(i * 3).padStart(2, '0')}`;
              return (
                <motion.a
                  key={skill.name}
                  href={skill.url}
                  className="term-skill-row"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ x: 5, color: '#63b3ed' }}
                >
                  <span className="term-perms">-rwxr-xr-x</span>
                  <span className="term-links">1</span>
                  <span className="term-owner">ahmad</span>
                  <span className="term-group">staff</span>
                  <span className="term-size">{getDeterministicSize(skill.name, i)}</span>
                  <span className="term-date">{date}</span>
                  <span className="term-filename">{fileName}</span>
                </motion.a>
              );
            })}
          </motion.div>
          
          <div className="term-prompt mt-4">
            <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/about</span>$ <span className="term-cursor" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}