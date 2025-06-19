import React, { useState, useEffect } from 'react';
import './Projects.css';

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = 'Blasty11'; // Your GitHub username

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=5`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [username]);

  return (
    <div>
      <h2>Latest Projects</h2>
      {loading ? (
        <p className="loading">Loading projects...</p>
      ) : (
        <>
          <div className="projects-container">
            {repos.length > 0 ? (
              repos.map(repo => (
                <div key={repo.id} className="project-card floating">
                  <div className="project-content">
                    <h3 className="project-title">{repo.name}</h3>
                    <div className="project-details">
                      <p>{repo.description || 'No description available'}</p>
                      <div className="project-meta">
                        {repo.language && <span className="project-language">{repo.language}</span>}
                        <span className="project-stars">⭐ {repo.stargazers_count}</span>
                      </div>
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No projects found. Check back soon!</p>
            )}
          </div>
          <div className="more-projects">
            <p>
              For more projects, visit <a 
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                my GitHub
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  );
}