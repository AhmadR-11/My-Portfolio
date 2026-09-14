"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt, 
  FaCopy, FaCheck, FaSearch, FaTimes, FaEye, 
  FaCode, FaTerminal, FaThLarge, FaThList, FaExpandAlt,
  FaChevronLeft, FaChevronRight, FaRocket, FaShieldAlt
} from 'react-icons/fa';
import './Projects.css';

// Enriched metadata for AhmadR-11 repositories (grounded from CV & GitHub)
const enrichedRepoMap = {
  'Projectify': {
    title: 'Projectify SaaS Platform',
    desc: 'Multi-tenant FYP lifecycle management platform featuring Cohere AI vector similarity search, automated supervisor group matching, and role-based access control.',
    tech: ['Next.js 16', 'Node.js', 'PostgreSQL', 'Cohere AI', 'Pinecone', 'Socket.IO', 'Docker'],
    category: 'fullstack',
    featured: true,
    isStarred: true
  },
  'PatchPilot': {
    title: 'PatchPilot — Autonomous DevOps AI Agent',
    desc: 'Autonomous AI agent intercepting broken CI/CD pipelines, analyzing error logs with LLMs, and streaming automated code patches to live dashboards.',
    tech: ['Next.js', 'FastAPI', 'LangGraph', 'OpenAI', 'WebSockets', 'Python'],
    category: 'ai',
    featured: true,
    isStarred: true
  },
  'NovaHire': {
    title: 'NovaHire Microservices Platform',
    desc: 'Asynchronous microservices recruitment platform with RabbitMQ messaging, spaCy NLP resume scoring, and privacy-first candidate tracking.',
    tech: ['Next.js', 'Node.js/Express', 'Python', 'MongoDB', 'RabbitMQ', 'spaCy'],
    category: 'fullstack',
    featured: true,
    isStarred: true
  },
  'talentflow-ai': {
    title: 'TalentFlow AI Recruitment Engine',
    desc: 'Autonomous AI recruitment pipeline scraping candidates via Apify, computing Qdrant vector match scores, and running async GPT-4o interviews.',
    tech: ['Next.js 14', 'PostgreSQL', 'Prisma', 'GPT-4o', 'Qdrant', 'Apify', 'Resend'],
    category: 'ai',
    featured: true,
    isStarred: true
  },
  'SkillSwap': {
    title: 'SkillSwap Peer Learning Platform',
    desc: 'Interactive skill-sharing peer network with real-time session booking, instant messaging, and user rating reviews.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Tailwind CSS'],
    category: 'fullstack',
    featured: false,
    isStarred: true
  },
  'Recipe-Generator': {
    title: 'AI Recipe Generator App',
    desc: 'Single-page MERN application integrating LLM recipe generation and token-based authentication for custom meal discovery.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'],
    category: 'ai',
    featured: false,
    isStarred: true
  },
  'Blog-Summariser': {
    title: 'AI Blog & Content Summariser',
    desc: 'Bilingual content summarization engine combining web scraping with LLM integration for rapid article consumption.',
    tech: ['JavaScript', 'Node.js', 'BeautifulSoup', 'OpenAI API'],
    category: 'ai',
    featured: false,
    isStarred: true
  },
  'enterprise-knowledge-assistant': {
    title: 'Enterprise Knowledge Assistant (RAG)',
    desc: 'Enterprise RAG knowledge base utilizing vector embeddings, document chunking, and role-based document access control.',
    tech: ['TypeScript', 'Next.js', 'Pinecone', 'OpenAI API', 'Vector DB'],
    category: 'ai',
    featured: false,
    isStarred: true
  },
  'devops-infrastructure-pipelines': {
    title: 'AWS Cloud & IaC Automation Pipelines',
    desc: 'Automated AWS infrastructure codebase with Terraform modules, Packer AMI builders, Docker containers, and Kubernetes manifests.',
    tech: ['Terraform', 'AWS VPC', 'Packer', 'Docker', 'Kubernetes', 'CloudWatch'],
    category: 'devops',
    featured: false,
    isStarred: true
  },
  'Facemask-Detection': {
    title: 'Face Mask Detection Computer Vision',
    desc: 'Real-time computer vision deep learning model detecting mask compliance on live video feeds with OpenCV & TensorFlow.',
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Computer Vision'],
    category: 'ai',
    featured: false,
    isStarred: true
  },
  'nodejs-k8s-project': {
    title: 'Node.js Containerized Kubernetes Cluster',
    desc: 'Production-ready Node.js application deployed on Kubernetes with Horizontal Pod Autoscaling (HPA) and PVC persistence.',
    tech: ['Node.js', 'Docker', 'Kubernetes', 'HPA', 'Nginx'],
    category: 'devops',
    featured: false,
    isStarred: true
  },
  'AI-ML-Projects': {
    title: 'AI & Machine Learning Research Notebooks',
    desc: 'Collection of neural network experiments, exploratory data analysis, and predictive model training notebooks.',
    tech: ['Python', 'Jupyter', 'PyTorch', 'TensorFlow', 'Scikit-Learn'],
    category: 'ai',
    featured: false,
    isStarred: true
  }
};

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('starred');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedRepo, setCopiedRepo] = useState(null);
  const [inspectedRepo, setInspectedRepo] = useState(null);
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);
  const [viewLayout, setViewLayout] = useState('grid'); // 'grid' | 'compact'

  const username = 'AhmadR-11';
  const ref = useRef(null);
  const scrollRefInline = useRef(null);
  const scrollRefModal = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
      .then(r => {
        if (!r.ok) throw new Error('GitHub API error');
        return r.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          // Process and enrich repositories from AhmadR-11
          const processed = data.map(repo => {
            const enriched = enrichedRepoMap[repo.name] || {};
            return {
              ...repo,
              displayTitle: enriched.title || repo.name.replace(/-/g, ' '),
              displayDesc: enriched.desc || repo.description || 'Open source software engineering repository by Ahmad Raza.',
              techStack: enriched.tech || (repo.topics?.length ? repo.topics : [repo.language || 'Software Engine']),
              category: enriched.category || (repo.language === 'Python' ? 'ai' : repo.language === 'HCL' ? 'devops' : 'fullstack'),
              featured: enriched.featured || repo.name === 'Projectify' || repo.name === 'PatchPilot',
              isStarred: repo.stargazers_count > 0 || enriched.isStarred || repo.name === 'SkillSwap'
            };
          });

          // Sort: Featured first, then starred
          processed.sort((a, b) => (b.featured ? 2 : b.isStarred ? 1 : 0) - (a.featured ? 2 : a.isStarred ? 1 : 0));
          setRepos(processed);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('GitHub fetch error:', err);
        // Fallback list
        const fallbackRepos = Object.entries(enrichedRepoMap).map(([name, info], idx) => ({
          id: idx + 100,
          name,
          displayTitle: info.title,
          displayDesc: info.desc,
          techStack: info.tech,
          category: info.category,
          featured: info.featured,
          isStarred: info.isStarred,
          stargazers_count: info.featured ? 2 : 1,
          forks_count: 0,
          html_url: `https://github.com/AhmadR-11/${name}`,
          clone_url: `https://github.com/AhmadR-11/${name}.git`,
          language: info.tech[0] || 'TypeScript'
        }));
        fallbackRepos.sort((a, b) => (b.featured ? 2 : 1) - (a.featured ? 2 : 1));
        setRepos(fallbackRepos);
        setLoading(false);
      });
  }, [username]);

  // Horizontal scroll handler for filter buttons
  const handleScroll = (targetRef, direction) => {
    if (targetRef.current) {
      const amount = direction === 'left' ? -200 : 200;
      targetRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Filter repositories based on category and search
  const filteredRepos = repos.filter(repo => {
    if (activeCategory === 'starred' && !repo.isStarred) return false;
    if (activeCategory !== 'starred' && activeCategory !== 'all' && repo.category !== activeCategory) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        repo.name.toLowerCase().includes(q) ||
        repo.displayTitle.toLowerCase().includes(q) ||
        repo.displayDesc.toLowerCase().includes(q) ||
        repo.techStack.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Always fix the inline card display on the main page to top 3 matching filtered repos
  const topFlagshipRepos = filteredRepos.slice(0, 3);

  const handleCopyClone = (cloneUrl, repoName) => {
    navigator.clipboard.writeText(`git clone ${cloneUrl}`);
    setCopiedRepo(repoName);
    setTimeout(() => setCopiedRepo(null), 2500);
  };

  return (
    <div ref={ref} className="projects-section" id="projects">
      <div className="projects-container-inner">

        {/* Section Header */}
        <div className="projects-header-area">
          <div className="projects-badge">
            <FaGithub className="badge-icon" />
            <span>@AhmadR-11 Repositories</span>
          </div>
          <h2 className="projects-section-title">Featured Projects &amp; Open Source</h2>
          <p className="projects-section-subtitle">
            Curated selection of production SaaS platforms, autonomous AI agents, and software engineering repositories live from GitHub.
          </p>
        </div>

        {/* Inline macOS Window — FIXED COMPACT HEIGHT (Top 3 Projects Only) */}
        <motion.div 
          className="macos-window projects-macos-window"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* macOS Title Bar */}
          <div className="macos-header projects-window-header">
            <div className="macos-buttons">
              <span className="macos-btn close" title="Close" />
              <span className="macos-btn minimize" title="Minimize" />
              <span className="macos-btn expand" onClick={() => setIsFullModalOpen(true)} title="Expand Full View Modal" />
            </div>
            <div className="projects-window-title">
              <span className="user-prompt">AhmadR-11@macbook</span>:<span className="dir-prompt">~/projects/flagship-starred</span>
            </div>
            <div className="projects-status-pill">
              <FaStar className="star-icon-gold" />
              <span>Flagship Starred Repos</span>
            </div>
          </div>

          {/* Controls Toolbar with Left & Right Arrow Scroll Navigation */}
          <div className="projects-toolbar">
            
            {/* Category Filter Pills with Left/Right Arrows */}
            <div className="segmented-nav-wrapper">
              <button 
                className="nav-scroll-btn left" 
                onClick={() => handleScroll(scrollRefInline, 'left')}
                title="Scroll categories left"
              >
                <FaChevronLeft />
              </button>

              <div className="segmented-control-scroll-container" ref={scrollRefInline}>
                <div className="projects-category-pills">
                  <button 
                    className={`cat-pill ${activeCategory === 'starred' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('starred')}
                  >
                    <FaStar className="pill-icon-star" /> Starred Top Picks
                  </button>
                  <button 
                    className={`cat-pill ${activeCategory === 'fullstack' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('fullstack')}
                  >
                    Full-Stack &amp; SaaS
                  </button>
                  <button 
                    className={`cat-pill ${activeCategory === 'ai' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('ai')}
                  >
                    AI &amp; LLM Agents
                  </button>
                  <button 
                    className={`cat-pill ${activeCategory === 'devops' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('devops')}
                  >
                    Cloud &amp; DevOps
                  </button>
                  <button 
                    className={`cat-pill ${activeCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('all')}
                  >
                    All Repos ({repos.length})
                  </button>
                </div>
              </div>

              <button 
                className="nav-scroll-btn right" 
                onClick={() => handleScroll(scrollRefInline, 'right')}
                title="Scroll categories right"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Right Tools: Search Bar & View Layout Toggle */}
            <div className="projects-toolbar-actions">
              <div className="projects-search-box">
                <FaSearch className="search-box-icon" />
                <input 
                  type="text" 
                  placeholder="Search repos or tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="projects-search-input"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="search-clear-btn" title="Clear search">
                    <FaTimes />
                  </button>
                )}
              </div>

              <div className="view-mode-toggle">
                <button 
                  className={`view-toggle-btn ${viewLayout === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewLayout('grid')}
                  title="Card Grid View"
                >
                  <FaThLarge />
                </button>
                <button 
                  className={`view-toggle-btn ${viewLayout === 'compact' ? 'active' : ''}`}
                  onClick={() => setViewLayout('compact')}
                  title="Compact List View"
                >
                  <FaThList />
                </button>
              </div>
            </div>

          </div>

          {/* Inline Window Body Content (Top 3 Matching Repositories) */}
          <div className="projects-window-body">
            
            {loading ? (
              <div className="projects-loading-grid">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton-card" />
                ))}
              </div>
            ) : topFlagshipRepos.length === 0 ? (
              <div className="no-repos-found">
                <FaTerminal className="no-found-icon" />
                <p>No repositories match your filter &quot;{searchQuery}&quot;.</p>
              </div>
            ) : viewLayout === 'grid' ? (
              <div className="projects-bento-grid">
                {topFlagshipRepos.map((repo, i) => {
                  const isHeroCard = i === 0;
                  const langExt = repo.language === 'Python' ? 'py' : repo.language === 'JavaScript' ? 'js' : repo.language === 'Java' ? 'java' : 'ts';
                  
                  return (
                    <motion.div
                      key={repo.id || repo.name}
                      className={`project-card ${isHeroCard ? 'hero-spotlight-card' : ''}`}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      {/* Top Header */}
                      <div className="card-top-header">
                        <div className="macos-buttons">
                          <span className="macos-btn close" />
                          <span className="macos-btn minimize" />
                          <span className="macos-btn expand" />
                        </div>
                        <span className="card-filename">{repo.name.toLowerCase()}.{langExt}</span>
                        <div className="card-header-right">
                          <span className="starred-badge">
                            <FaStar className="star-gold-sm" /> Featured Starred
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="card-body">
                        <div className="card-meta-line">
                          <span className="card-lang-tag">{(repo.language || 'ENGINEERING').toUpperCase()}</span>
                          <div className="card-stats">
                            <span className="stat-item"><FaStar className="stat-icon-gold" /> {repo.stargazers_count}</span>
                            <span className="stat-item"><FaCodeBranch className="stat-icon" /> {repo.forks_count}</span>
                          </div>
                        </div>

                        <h3 className="card-title">{repo.displayTitle}</h3>
                        <p className="card-desc">{repo.displayDesc}</p>

                        {/* Tech Chips */}
                        <div className="card-tech-chips">
                          {repo.techStack.map((tech, j) => (
                            <span key={j} className="tech-chip">{tech}</span>
                          ))}
                        </div>

                        {/* Git Clone Prompt */}
                        <div className="card-clone-box">
                          <span className="prompt-symbol">$</span>
                          <span className="clone-cmd">git clone https://github.com/AhmadR-11/{repo.name}.git</span>
                          <button 
                            className="copy-clone-btn"
                            onClick={() => handleCopyClone(repo.clone_url || `https://github.com/AhmadR-11/${repo.name}.git`, repo.name)}
                            title="Copy clone command"
                          >
                            {copiedRepo === repo.name ? <FaCheck className="copied-check" /> : <FaCopy />}
                          </button>
                        </div>

                        {/* Footer Actions */}
                        <div className="card-footer">
                          <button 
                            className="card-inspect-btn"
                            onClick={() => setInspectedRepo(repo)}
                          >
                            <FaEye />
                            <span>Inspect Architecture</span>
                          </button>

                          <a 
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-github-btn"
                          >
                            <FaGithub />
                            <span>GitHub</span>
                            <FaExternalLinkAlt className="ext-icon" />
                          </a>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* COMPACT LIST VIEW FOR INLINE WINDOW */
              <div className="projects-compact-list">
                {topFlagshipRepos.map((repo) => (
                  <div key={repo.id || repo.name} className="compact-row">
                    <div className="compact-left">
                      <div className="compact-icon-box">
                        <FaCode className="compact-icon" />
                      </div>
                      <div className="compact-info">
                        <h4 className="compact-title">{repo.displayTitle}</h4>
                        <p className="compact-desc">{repo.displayDesc}</p>
                      </div>
                    </div>

                    <div className="compact-tech">
                      {repo.techStack.map((t, i) => (
                        <span key={i} className="tech-chip-sm">{t}</span>
                      ))}
                    </div>

                    <div className="compact-actions">
                      <span className="compact-stars">
                        <FaStar className="star-gold-sm" /> {repo.stargazers_count}
                      </span>
                      <button 
                        className="compact-btn inspect"
                        onClick={() => setInspectedRepo(repo)}
                      >
                        <FaEye /> Inspect
                      </button>
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="compact-btn primary"
                      >
                        <FaGithub /> Repo
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Window Footer Status Bar with EXPAND MODAL trigger button */}
          <div className="projects-window-footer">
            <div className="footer-left-txt">
              <span>GITHUB PROFILE: </span>
              <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="footer-gh-link">
                github.com/AhmadR-11
              </a>
            </div>

            {/* EXPAND MODAL BUTTON (Skill Section Pattern) */}
            <button className="projects-expand-btn" onClick={() => setIsFullModalOpen(true)}>
              <FaExpandAlt className="expand-icon" />
              <span>Expand All Repositories ({repos.length})</span>
            </button>
          </div>

        </motion.div>

        {/* Global GitHub CTA */}
        <div className="projects-footer-cta">
          <button
            onClick={() => setIsFullModalOpen(true)}
            className="projects-github-cta-btn"
          >
            <FaExpandAlt />
            <span>Open All Repositories Finder Window</span>
          </button>
        </div>

      </div>

      {/* FULL REPOSITORIES FINDER MODAL OVERLAY (Skill Section Pattern) */}
      <AnimatePresence>
        {isFullModalOpen && (
          <div className="modal-backdrop" onClick={() => setIsFullModalOpen(false)}>
            <motion.div 
              className="projects-full-modal macos-window"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Title Bar */}
              <div className="macos-header modal-window-header">
                <div className="macos-buttons">
                  <button className="macos-btn close" onClick={() => setIsFullModalOpen(false)} title="Close" />
                  <span className="macos-btn minimize" />
                  <span className="macos-btn expand" />
                </div>
                <div className="modal-title-path">
                  <span>macOS Finder: </span>
                  <span className="highlight-path">~/github/AhmadR-11/all-repositories</span>
                </div>
                <button className="modal-close-x" onClick={() => setIsFullModalOpen(false)} title="Close Modal">
                  <FaTimes />
                </button>
              </div>

              {/* Modal Controls Toolbar */}
              <div className="modal-toolbar">
                
                {/* Category Filters with Arrows */}
                <div className="segmented-nav-wrapper">
                  <button 
                    className="nav-scroll-btn left" 
                    onClick={() => handleScroll(scrollRefModal, 'left')}
                    title="Scroll categories left"
                  >
                    <FaChevronLeft />
                  </button>

                  <div className="segmented-control-scroll-container" ref={scrollRefModal}>
                    <div className="projects-category-pills">
                      <button 
                        className={`cat-pill ${activeCategory === 'starred' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('starred')}
                      >
                        <FaStar className="pill-icon-star" /> Starred Picks
                      </button>
                      <button 
                        className={`cat-pill ${activeCategory === 'fullstack' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('fullstack')}
                      >
                        Full-Stack &amp; SaaS
                      </button>
                      <button 
                        className={`cat-pill ${activeCategory === 'ai' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('ai')}
                      >
                        AI &amp; LLM Agents
                      </button>
                      <button 
                        className={`cat-pill ${activeCategory === 'devops' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('devops')}
                      >
                        Cloud &amp; DevOps
                      </button>
                      <button 
                        className={`cat-pill ${activeCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('all')}
                      >
                        All Repos ({repos.length})
                      </button>
                    </div>
                  </div>

                  <button 
                    className="nav-scroll-btn right" 
                    onClick={() => handleScroll(scrollRefModal, 'right')}
                    title="Scroll categories right"
                  >
                    <FaChevronRight />
                  </button>
                </div>

                {/* Search & Layout Toggle */}
                <div className="projects-toolbar-actions">
                  <div className="projects-search-box">
                    <FaSearch className="search-box-icon" />
                    <input 
                      type="text" 
                      placeholder="Search repos or tech..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="projects-search-input"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="search-clear-btn" title="Clear search">
                        <FaTimes />
                      </button>
                    )}
                  </div>

                  <div className="view-mode-toggle">
                    <button 
                      className={`view-toggle-btn ${viewLayout === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewLayout('grid')}
                      title="Card Grid"
                    >
                      <FaThLarge />
                    </button>
                    <button 
                      className={`view-toggle-btn ${viewLayout === 'compact' ? 'active' : ''}`}
                      onClick={() => setViewLayout('compact')}
                      title="Compact List View"
                    >
                      <FaThList />
                    </button>
                  </div>
                </div>

              </div>

              {/* Modal Body Grid or Compact List */}
              <div className="modal-repos-body">
                {filteredRepos.length === 0 ? (
                  <div className="no-repos-found">
                    <FaTerminal className="no-found-icon" />
                    <p>No repositories match your filter &quot;{searchQuery}&quot;.</p>
                  </div>
                ) : viewLayout === 'grid' ? (
                  <div className="projects-bento-grid">
                    {filteredRepos.map((repo) => (
                      <div key={repo.id || repo.name} className="project-card">
                        <div className="card-top-header">
                          <div className="macos-buttons">
                            <span className="macos-btn close" />
                            <span className="macos-btn minimize" />
                            <span className="macos-btn expand" />
                          </div>
                          <span className="card-filename">{repo.name.toLowerCase()}</span>
                          <div className="card-header-right">
                            {repo.isStarred && (
                              <span className="starred-badge">
                                <FaStar className="star-gold-sm" /> Starred
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="card-body">
                          <div className="card-meta-line">
                            <span className="card-lang-tag">{(repo.language || 'ENGINEERING').toUpperCase()}</span>
                            <div className="card-stats">
                              <span className="stat-item"><FaStar className="stat-icon-gold" /> {repo.stargazers_count}</span>
                              <span className="stat-item"><FaCodeBranch className="stat-icon" /> {repo.forks_count}</span>
                            </div>
                          </div>

                          <h3 className="card-title">{repo.displayTitle}</h3>
                          <p className="card-desc">{repo.displayDesc}</p>

                          <div className="card-tech-chips">
                            {repo.techStack.map((tech, j) => (
                              <span key={j} className="tech-chip">{tech}</span>
                            ))}
                          </div>

                          <div className="card-clone-box">
                            <span className="prompt-symbol">$</span>
                            <span className="clone-cmd">git clone https://github.com/AhmadR-11/{repo.name}.git</span>
                            <button 
                              className="copy-clone-btn"
                              onClick={() => handleCopyClone(repo.clone_url || `https://github.com/AhmadR-11/${repo.name}.git`, repo.name)}
                            >
                              {copiedRepo === repo.name ? <FaCheck className="copied-check" /> : <FaCopy />}
                            </button>
                          </div>

                          <div className="card-footer">
                            <button 
                              className="card-inspect-btn"
                              onClick={() => setInspectedRepo(repo)}
                            >
                              <FaEye />
                              <span>Inspect</span>
                            </button>
                            <a 
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="card-github-btn"
                            >
                              <FaGithub />
                              <span>Repo</span>
                              <FaExternalLinkAlt className="ext-icon" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* COMPACT LIST VIEW - CLEAN STYLED ROW FOR MODAL */
                  <div className="projects-compact-list">
                    {filteredRepos.map((repo) => (
                      <div key={repo.id || repo.name} className="compact-row">
                        <div className="compact-left">
                          <div className="compact-icon-box">
                            <FaCode className="compact-icon" />
                          </div>
                          <div className="compact-info">
                            <h4 className="compact-title">{repo.displayTitle}</h4>
                            <p className="compact-desc">{repo.displayDesc}</p>
                          </div>
                        </div>

                        <div className="compact-tech">
                          {repo.techStack.map((t, i) => (
                            <span key={i} className="tech-chip-sm">{t}</span>
                          ))}
                        </div>

                        <div className="compact-actions">
                          <span className="compact-stars">
                            <FaStar className="star-gold-sm" /> {repo.stargazers_count}
                          </span>
                          <button 
                            className="compact-btn inspect"
                            onClick={() => setInspectedRepo(repo)}
                          >
                            <FaEye /> Inspect
                          </button>
                          <a 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="compact-btn primary"
                          >
                            <FaGithub /> Repo
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="modal-inspector-footer">
                <span className="modal-footer-count">Showing {filteredRepos.length} of {repos.length} repositories</span>
                <button className="modal-action-btn secondary" onClick={() => setIsFullModalOpen(false)}>
                  Close Window
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUICK LOOK INSPECTOR MODAL */}
      <AnimatePresence>
        {inspectedRepo && (
          <div className="modal-backdrop" onClick={() => setInspectedRepo(null)} style={{ zIndex: 1000 }}>
            <motion.div 
              className="repo-inspector-modal macos-window"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="macos-header modal-window-header">
                <div className="macos-buttons">
                  <button className="macos-btn close" onClick={() => setInspectedRepo(null)} />
                  <span className="macos-btn minimize" />
                  <span className="macos-btn expand" />
                </div>
                <div className="modal-title-path">
                  <span>Repository Inspector: </span>
                  <span className="highlight-path">AhmadR-11/{inspectedRepo.name}</span>
                </div>
                <button className="modal-close-x" onClick={() => setInspectedRepo(null)}>
                  <FaTimes />
                </button>
              </div>

              {/* Body */}
              <div className="modal-inspector-body">
                <div className="modal-repo-header">
                  <div className="modal-icon-box">
                    <FaCode />
                  </div>
                  <div>
                    <h3 className="modal-repo-title">{inspectedRepo.displayTitle}</h3>
                    <p className="modal-repo-sub">AhmadR-11/{inspectedRepo.name}</p>
                  </div>
                  <div className="modal-stats-group">
                    <span className="modal-stat-pill">
                      <FaStar className="star-gold-sm" /> {inspectedRepo.stargazers_count} Stars
                    </span>
                    <span className="modal-stat-pill">
                      <FaCodeBranch /> {inspectedRepo.forks_count} Forks
                    </span>
                  </div>
                </div>

                <div className="modal-section-block">
                  <h4 className="modal-block-heading">Repository Overview</h4>
                  <p className="modal-repo-desc">{inspectedRepo.displayDesc}</p>
                </div>

                <div className="modal-section-block">
                  <h4 className="modal-block-heading">Tech Stack &amp; Frameworks</h4>
                  <div className="modal-tech-chips">
                    {inspectedRepo.techStack.map((t, idx) => (
                      <span key={idx} className="modal-tech-chip">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-section-block">
                  <h4 className="modal-block-heading">Quick Clone String</h4>
                  <div className="modal-clone-box">
                    <span>$ git clone https://github.com/AhmadR-11/{inspectedRepo.name}.git</span>
                    <button 
                      className="modal-copy-btn"
                      onClick={() => handleCopyClone(inspectedRepo.clone_url || `https://github.com/AhmadR-11/${inspectedRepo.name}.git`, inspectedRepo.name)}
                    >
                      {copiedRepo === inspectedRepo.name ? <FaCheck className="copied-check" /> : <FaCopy />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-inspector-footer">
                <a 
                  href={inspectedRepo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-action-btn primary"
                >
                  <FaGithub />
                  <span>Open GitHub Repository</span>
                </a>
                <button 
                  className="modal-action-btn secondary" 
                  onClick={() => setInspectedRepo(null)}
                >
                  Close Inspector
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}