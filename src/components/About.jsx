import React from 'react';
import './About.css';

const skills = [
  { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'React', url: 'https://reactjs.org' },
  { name: 'Node.js', url: 'https://nodejs.org' },
  { name: 'Java', url: 'https://dev.java/' },
  { name: 'CSS/SCSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'HTML5', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'Git', url: 'https://git-scm.com' },
  { name: 'AI/ML', url: 'https://www.tensorflow.org/' },
  { name: 'Web Scraping', url: 'https://www.selenium.dev/' },
  { name: 'Responsive Design', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design' },
  { name: 'UI/UX', url: 'https://www.interaction-design.org/literature/topics/ui-design' }
];

export default function About() {
  return (
    <div className="about-container">
      <div className="about-text">
        <h2>About Me</h2>
        <p>
          I'm a software engineer specializing in building exceptional digital experiences.
          Currently, I'm focused on creating responsive full-stack web applications
          that solve real-world problems.
        </p>
        <p>
          My approach combines technical expertise with creative problem-solving
          to deliver solutions that are both functional and user-friendly.
          I'm constantly learning new technologies and methodologies to stay
          at the forefront of web development.
        </p>
        <p>
          With experience in Java development and a growing interest in AI/ML,
          I also enjoy building data extraction solutions through web scraping.
          This diverse skill set allows me to tackle projects from multiple angles.
        </p>
      </div>
      <div className="skills-container">
        <h3>Skills & Technologies</h3>
        <div className="skills-grid">
          {skills.map(skill => (
            <a 
              href={skill.url} 
              key={skill.name} 
              className="skill-tag"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {skill.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}