"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import './Projects.css';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Projects() {
  const [repos,   setRepos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const username = 'Blasty11';

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`)
      .then(r => {
        if (!r.ok) throw new Error('GitHub API error');
        return r.json();
      })
      .then(data => {
        if (Array.isArray(data)) setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('GitHub fetch error:', err);
        setLoading(false);
      });
  }, [username]);

  return (
    <div ref={ref} className="projects-container">
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2>Featured Projects</h2>
        <p className="projects-subtitle">Real problems, real solutions, live from GitHub.</p>
      </motion.div>

      {loading ? (
        <div className="projects-loading-grid">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`project-bento-card skeleton-card ${i === 0 ? 'featured-card' : ''}`} />
          ))}
        </div>
      ) : repos.length === 0 ? (
        <div className="projects-error">Error fetching projects from GitHub.</div>
      ) : (
        <motion.div
          className="projects-bento-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {repos.map((repo, i) => {
            const isFeatured = i === 0;
            const ext = repo.language === 'JavaScript' ? 'js' : repo.language === 'Java' ? 'java' : repo.language === 'Python' ? 'py' : 'ts';
            
            return (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-bento-card ${isFeatured ? 'featured-card' : ''}`}
                variants={cardVariants}
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,179,237,0.3)' }}
              >
                {/* macOS Card Header */}
                <div className="bento-header">
                  <div className="macos-buttons">
                    <span className="macos-btn close" />
                    <span className="macos-btn minimize" />
                    <span className="macos-btn expand" />
                  </div>
                  <div className="bento-filename">{repo.name.toLowerCase()}.{ext}</div>
                  <div className="bento-status">
                    <span className="status-dot"></span> {isFeatured ? 'featured' : 'deployed'}
                  </div>
                </div>

                {/* Card Body */}
                <div className="bento-body">
                  <div className="bento-category">{repo.language ? repo.language.toUpperCase() : 'OPEN SOURCE'}</div>
                  <h3 className="bento-title">{repo.name.replace(/-/g, ' ')}</h3>
                  <p className="bento-desc">{repo.description || 'No description provided for this repository.'}</p>
                  
                  <div className="bento-stats-row">
                    <div className="bento-stat">
                      <span className="stat-val"><FaStar className="stat-icon" /> {repo.stargazers_count}</span>
                      <span className="stat-label">Stars</span>
                    </div>
                    <div className="bento-stat">
                      <span className="stat-val"><FaCodeBranch className="stat-icon" /> {repo.forks_count}</span>
                      <span className="stat-label">Forks</span>
                    </div>
                  </div>

                  <div className="bento-tags">
                    {repo.topics && repo.topics.slice(0, 3).map(topic => (
                      <span key={topic} className="bento-tag">{topic}</span>
                    ))}
                    {!repo.topics?.length && repo.language && (
                      <span className="bento-tag">{repo.language}</span>
                    )}
                  </div>

                  <div className="bento-cmd-prompt">
                    <span className="cmd-symbol">$</span> git clone {repo.clone_url}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      )}

      <motion.div
        className="projects-more"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="projects-github-btn"
        >
          <FaGithub /> View All on GitHub
        </a>
      </motion.div>
    </div>
  );
}