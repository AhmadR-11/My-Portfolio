"use client";

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FaCode, FaCloud, FaBrain, FaRobot, FaServer, FaEye, 
  FaCheckCircle, FaTerminal, FaLayerGroup, FaLock, 
  FaThList, FaThLarge, FaSearch, FaNetworkWired, FaCubes,
  FaTimes, FaRocket, FaShieldAlt, FaHdd, FaMicrochip
} from 'react-icons/fa';
import './Services.css';

const servicesData = [
  {
    id: 'web-architecture',
    name: 'web-dev-engine',
    title: 'Full-Stack Web Development & SaaS Systems',
    category: 'web',
    icon: FaCode,
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(37, 99, 235, 0.15))',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    port: '0.0.0.0:8080->8080/tcp',
    status: 'Up 99.9%',
    uptimeDays: '14 days',
    desc: 'Engineering high-performance, responsive full-stack applications and multi-tenant SaaS platforms built with Next.js 16/14, React, NestJS, and Node.js.',
    techStack: ['Next.js 16', 'React', 'NestJS', 'Node.js', 'PostgreSQL', 'MongoDB', 'Tailwind CSS'],
    capabilities: [
      'Multi-tenant SaaS architecture with role-based access control (RBAC)',
      'Real-time feed updates and instant messaging via WebSockets (Socket.IO)',
      'Secure third-party integrations (Stripe payments, Twilio SMS, Firebase)',
      'Full-Text Search indexing and optimized PostgreSQL relational schemas'
    ],
    envPreview: {
      FRAMEWORK: 'Next.js 16 (App Router)',
      DATABASE: 'PostgreSQL / Prisma ORM',
      AUTH: 'Multi-stage JWT + RBAC',
      STATE: 'React Server Components + Zustand'
    }
  },
  {
    id: 'cloud-infrastructure',
    name: 'cloud-devops-node',
    title: 'AWS Cloud Architecture & IaC Automation',
    category: 'cloud',
    icon: FaCloud,
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(147, 51, 234, 0.15))',
    borderColor: 'rgba(129, 140, 248, 0.3)',
    port: '0.0.0.0:8081->8081/tcp',
    status: 'Up 99.9%',
    uptimeDays: '28 days',
    desc: 'Provisioning secure, highly available AWS environments using Terraform and Packer, and automating zero-downtime deployments via Docker & Kubernetes.',
    techStack: ['AWS (VPC/EC2/S3/RDS)', 'Terraform', 'Packer', 'Docker', 'Kubernetes', 'Nginx', 'CI/CD'],
    capabilities: [
      'Automated Infrastructure as Code (IaC) with encrypted S3 state & DynamoDB locking',
      'Custom AWS VPC networking (public/private subnets, ALBs, ASG, NAT Gateways)',
      'Kubernetes cluster orchestration with Horizontal Pod Autoscaling (HPA) & PVCs',
      'Production server security hardening via IAM roles, SSM, and CloudWatch alarms'
    ],
    envPreview: {
      PROVIDER: 'Amazon Web Services (AWS)',
      PROVISIONER: 'Terraform v1.8 + Packer',
      CONTAINERS: 'Docker + Kubernetes HPA',
      SECURITY: 'IAM Least-Privilege + AWS SSM'
    }
  },
  {
    id: 'ai-rag-engine',
    name: 'ai-agent-service',
    title: 'Autonomous AI Agents & RAG Architectures',
    category: 'ai',
    icon: FaBrain,
    color: '#c084fc',
    gradient: 'linear-gradient(135deg, rgba(192, 132, 252, 0.15), rgba(219, 39, 119, 0.15))',
    borderColor: 'rgba(192, 132, 252, 0.3)',
    port: '0.0.0.0:8082->8082/tcp',
    status: 'Up 99.9%',
    uptimeDays: '12 days',
    desc: 'Building autonomous AI agents and Retrieval-Augmented Generation (RAG) engines using OpenAI LLMs, LangGraph, Python, and vector similarity search.',
    techStack: ['OpenAI GPT-4o', 'LangGraph', 'Python', 'Cohere AI', 'pg-vector', 'Pinecone', 'Qdrant'],
    capabilities: [
      'Autonomous DevOps AI agents that intercept CI/CD errors and patch code (PatchPilot)',
      'Semantic document plagiarism & feasibility engines using cosine similarity search',
      'Automated candidate screening & JD-matching pipelines with GPT-4o & Qdrant',
      'Custom LLM prompt chains, token usage optimization, and structured output'
    ],
    envPreview: {
      LLM_ENGINE: 'OpenAI GPT-4o / Cohere',
      ORCHESTRATION: 'LangGraph + Python AsyncIO',
      VECTOR_DB: 'Pinecone / pg-vector / Qdrant',
      EMBEDDINGS: '1024-dim Cosine Similarity'
    }
  },
  {
    id: 'data-pipelines',
    name: 'data-scraper-daemon',
    title: 'Automated Web Scraping & Data Extraction',
    category: 'data',
    icon: FaRobot,
    color: '#34d399',
    gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(5, 150, 105, 0.15))',
    borderColor: 'rgba(52, 211, 153, 0.3)',
    port: '0.0.0.0:8083->8083/tcp',
    status: 'Up 99.9%',
    uptimeDays: '19 days',
    desc: 'Creating resilient, high-throughput web scraping pipelines and asynchronous data processing engines to extract structured intelligence at scale.',
    techStack: ['Python', 'Apify', 'Selenium', 'BeautifulSoup', 'RabbitMQ', 'Redis', 'spaCy NLP'],
    capabilities: [
      'Headless browser scraping across complex dynamic websites (Apify, Selenium)',
      'Asynchronous task queues powered by RabbitMQ & Redis message brokers',
      'Structured NLP resume parsing and candidate intelligence extraction (spaCy)',
      'Anti-bot bypass strategies, proxy rotation, and resilient retry middleware'
    ],
    envPreview: {
      SCRAPER_ENGINE: 'Apify SDK + Selenium Webdriver',
      QUEUE_BROKER: 'RabbitMQ + Redis Adapter',
      NLP_PROCESSOR: 'spaCy Pipelines',
      DATA_FORMAT: 'Clean JSON / PostgreSQL'
    }
  },
  {
    id: 'api-microservices',
    name: 'api-gateway-cluster',
    title: 'Enterprise API Design & Microservices',
    category: 'web',
    icon: FaServer,
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(225, 29, 72, 0.15))',
    borderColor: 'rgba(244, 63, 94, 0.3)',
    port: '0.0.0.0:8084->8084/tcp',
    status: 'Up 99.9%',
    uptimeDays: '45 days',
    desc: 'Designing robust RESTful & GraphQL API gateways following 3-layered architecture, SOLID principles, and strict enterprise security standards.',
    techStack: ['Node.js', 'NestJS', 'Java', 'Express', 'GraphQL', 'REST API', 'TestNG'],
    capabilities: [
      'Three-layered modular architecture (Facade, Abstract Factory, Proxy patterns)',
      'Decoupled microservices communication with REST API gateways & RMI callbacks',
      'Comprehensive automated unit & integration testing suite (TestNG & Jest)',
      'Rate-limiting, CORS policy enforcement, and payload sanitization'
    ],
    envPreview: {
      ARCHITECTURE: '3-Tier Microservices / Gateway',
      PATTERN: 'Facade + Proxy + SOLID',
      SECURITY: 'CORS + Rate Limiter + JWT',
      TESTING: 'TestNG + Jest Integration'
    }
  },
  {
    id: 'cv-computer-vision',
    name: 'computer-vision-node',
    title: 'Computer Vision & Deep Learning Analytics',
    category: 'ai',
    icon: FaEye,
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(217, 119, 6, 0.15))',
    borderColor: 'rgba(251, 191, 36, 0.3)',
    port: '0.0.0.0:8085->8085/tcp',
    status: 'Up 99.9%',
    uptimeDays: '30 days',
    desc: 'Developing real-time computer vision classifiers and deep learning models for automated detection streams and visual data analysis.',
    techStack: ['TensorFlow', 'Keras', 'PyTorch', 'OpenCV', 'Python', 'NumPy'],
    capabilities: [
      'Real-time object & face mask detection pipelines operating on live video feeds',
      'Deep Convolutional Neural Network (CNN) training with custom datasets',
      'OpenCV frame bounding box extraction & immediate visual feedback overlays',
      'Model serialization, inference latency optimization, and NumPy acceleration'
    ],
    envPreview: {
      MODEL_TYPE: 'CNN (TensorFlow / Keras)',
      VISION_LIB: 'OpenCV 4.x + Python',
      INFERENCE: 'Real-time Video Stream',
      ACCURACY: '98.5% High Classification'
    }
  }
];

export default function Services() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'docker'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedService, setInspectedService] = useState(null);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Filter services by category and search query
  const filteredServices = servicesData.filter(svc => {
    const matchesCat = activeCategory === 'all' || svc.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      svc.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div ref={ref} className="services-section" id="services">
      <div className="services-container-inner">

        {/* Section Header */}
        <div className="services-header-area">
          <div className="services-badge">
            <FaCubes className="badge-icon" />
            <span>Engineering Services</span>
          </div>
          <h2 className="services-section-title">Production-Grade Solutions & System Architecture</h2>
          <p className="services-section-subtitle">
            Transforming complex requirements into scalable full-stack web applications, automated AWS cloud infrastructure, autonomous AI agents, and high-throughput data pipelines.
          </p>
        </div>

        {/* macOS Main Containerized Services Window */}
        <motion.div 
          className="macos-window services-macos-window"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* macOS Title Bar */}
          <div className="macos-header services-window-header">
            <div className="macos-buttons">
              <span className="macos-btn close" title="Close" />
              <span className="macos-btn minimize" title="Minimize" />
              <span className="macos-btn expand" title="Expand" />
            </div>
            <div className="services-window-title">
              <span className="user-prompt">ahmad@macbook</span>:<span className="dir-prompt">~/services/docker-orchestrator</span>
            </div>
            <div className="services-status-pill">
              <span className="status-dot-pulse" />
              <span>6 Containers Active</span>
            </div>
          </div>

          {/* Orchestrator Control Toolbar */}
          <div className="services-toolbar">
            
            {/* Category Filter Pills */}
            <div className="services-category-pills">
              <button 
                className={`cat-pill ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All Services ({servicesData.length})
              </button>
              <button 
                className={`cat-pill ${activeCategory === 'web' ? 'active' : ''}`}
                onClick={() => setActiveCategory('web')}
              >
                Full-Stack &amp; APIs
              </button>
              <button 
                className={`cat-pill ${activeCategory === 'cloud' ? 'active' : ''}`}
                onClick={() => setActiveCategory('cloud')}
              >
                Cloud &amp; DevOps
              </button>
              <button 
                className={`cat-pill ${activeCategory === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveCategory('ai')}
              >
                AI &amp; RAG Agents
              </button>
              <button 
                className={`cat-pill ${activeCategory === 'data' ? 'active' : ''}`}
                onClick={() => setActiveCategory('data')}
              >
                Data &amp; Scraping
              </button>
            </div>

            {/* Right Tools: Search Bar & View Mode Toggle */}
            <div className="services-toolbar-actions">
              
              {/* Quick Filter Search */}
              <div className="services-search-box">
                <FaSearch className="search-box-icon" />
                <input 
                  type="text" 
                  placeholder="Search service or tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="services-search-input"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="search-clear-btn">
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* View Switcher */}
              <div className="view-mode-toggle">
                <button 
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Visual Card Grid"
                >
                  <FaThLarge />
                  <span>Grid</span>
                </button>
                <button 
                  className={`view-toggle-btn ${viewMode === 'docker' ? 'active' : ''}`}
                  onClick={() => setViewMode('docker')}
                  title="Docker CLI Table"
                >
                  <FaTerminal />
                  <span>Docker CLI</span>
                </button>
              </div>

            </div>

          </div>

          {/* Window Main Content (Grid vs Docker View) */}
          <div className="services-window-body">
            
            <AnimatePresence mode="wait">
              
              {/* GRID VIEW */}
              {viewMode === 'grid' && (
                <motion.div 
                  key="grid-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="services-grid"
                >
                  {filteredServices.length === 0 ? (
                    <div className="no-services-found">
                      <FaTerminal className="no-found-icon" />
                      <p>No containerized services match your search &quot;{searchQuery}&quot;.</p>
                    </div>
                  ) : (
                    filteredServices.map((svc) => {
                      const Icon = svc.icon;
                      return (
                        <motion.div 
                          key={svc.id}
                          className="service-card"
                          whileHover={{ y: -4, transition: { duration: 0.2 } }}
                          style={{ borderColor: svc.borderColor }}
                        >
                          {/* Card Top Banner */}
                          <div className="service-card-header">
                            <div className="service-icon-wrapper" style={{ background: svc.gradient, color: svc.color }}>
                              <Icon />
                            </div>
                            <div className="service-meta">
                              <span className="service-container-name">{svc.name}</span>
                              <span className="service-status-tag">
                                <span className="status-dot-green" /> {svc.status}
                              </span>
                            </div>
                          </div>

                          {/* Title & Desc */}
                          <h3 className="service-card-title">{svc.title}</h3>
                          <p className="service-card-desc">{svc.desc}</p>

                          {/* Tech Chips */}
                          <div className="service-tech-chips">
                            {svc.techStack.map((tech, i) => (
                              <span key={i} className="service-tech-chip">{tech}</span>
                            ))}
                          </div>

                          {/* Card Footer Metrics & Quick Inspect Button */}
                          <div className="service-card-footer">
                            <div className="service-port-info">
                              <FaNetworkWired className="port-icon" />
                              <span>{svc.port}</span>
                            </div>
                            <button 
                              className="inspect-svc-btn"
                              onClick={() => setInspectedService(svc)}
                            >
                              <FaEye />
                              <span>Inspect Service</span>
                            </button>
                          </div>

                        </motion.div>
                      );
                    })
                  )}
                </motion.div>
              )}

              {/* DOCKER CLI VIEW */}
              {viewMode === 'docker' && (
                <motion.div 
                  key="docker-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="docker-cli-container"
                >
                  <div className="cli-prompt-line">
                    <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/services</span>$ <span className="term-cmd">docker-compose ps --all</span>
                  </div>

                  <div className="docker-table-wrapper">
                    <table className="docker-table">
                      <thead>
                        <tr>
                          <th>SERVICE / CONTAINER</th>
                          <th>STATUS</th>
                          <th>PORTS</th>
                          <th>CAPABILITIES SUMMARY</th>
                          <th style={{ textAlign: 'right' }}>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredServices.map((svc) => {
                          const Icon = svc.icon;
                          return (
                            <tr key={svc.id} className="docker-table-row">
                              <td className="col-container">
                                <div className="svc-name-cell">
                                  <Icon style={{ color: svc.color }} className="cell-icon" />
                                  <div>
                                    <span className="cell-title">{svc.title}</span>
                                    <span className="cell-id">{svc.name}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="col-status">
                                <span className="docker-status-badge">
                                  <span className="status-dot-green" /> Up ({svc.uptimeDays})
                                </span>
                              </td>
                              <td className="col-ports">
                                <span className="port-text">{svc.port}</span>
                              </td>
                              <td className="col-desc">
                                <span className="desc-text">{svc.desc}</span>
                              </td>
                              <td className="col-action" style={{ textAlign: 'right' }}>
                                <button 
                                  className="docker-inspect-btn"
                                  onClick={() => setInspectedService(svc)}
                                >
                                  <FaEye /> Logs &amp; Env
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="cli-prompt-line mt-4">
                    <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/services</span>$ <span className="term-cursor" />
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

          {/* Window Footer Status Bar */}
          <div className="services-window-footer">
            <div className="footer-left">
              <span className="footer-label">ENGINEERING STACK:</span>
              <span className="footer-val">Next.js 16 • AWS Cloud • Node / Nest • AI Agents</span>
            </div>
            <div className="footer-right">
              <span>Showing {filteredServices.length} of {servicesData.length} active service containers</span>
            </div>
          </div>

        </motion.div>

      </div>

      {/* SERVICE QUICK LOOK INSPECTOR MODAL */}
      <AnimatePresence>
        {inspectedService && (
          <div className="modal-backdrop" onClick={() => setInspectedService(null)}>
            <motion.div 
              className="service-inspector-modal macos-window"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Window Header */}
              <div className="macos-header modal-window-header">
                <div className="macos-buttons">
                  <button className="macos-btn close" onClick={() => setInspectedService(null)} />
                  <span className="macos-btn minimize" />
                  <span className="macos-btn expand" />
                </div>
                <div className="modal-title-path">
                  <span>Inspection Mode: </span>
                  <span className="highlight-path">container://{inspectedService.name}</span>
                </div>
                <button className="modal-close-x" onClick={() => setInspectedService(null)}>
                  <FaTimes />
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-inspector-body">
                
                {/* Header Profile Info */}
                <div className="modal-svc-header">
                  <div className="modal-icon-box" style={{ background: inspectedService.gradient, color: inspectedService.color }}>
                    <inspectedService.icon />
                  </div>
                  <div>
                    <h3 className="modal-svc-title">{inspectedService.title}</h3>
                    <p className="modal-svc-id">ID: {inspectedService.id} | Container: {inspectedService.name}</p>
                  </div>
                  <span className="modal-status-badge">
                    <span className="status-dot-green" /> {inspectedService.status}
                  </span>
                </div>

                {/* Health Metrics Bar */}
                <div className="modal-metrics-bar">
                  <div className="metric-item">
                    <FaMicrochip className="metric-icon" />
                    <div>
                      <span className="metric-val">0.4%</span>
                      <span className="metric-lbl">CPU Usage</span>
                    </div>
                  </div>
                  <div className="metric-item">
                    <FaHdd className="metric-icon" />
                    <div>
                      <span className="metric-val">128 MB</span>
                      <span className="metric-lbl">Memory Alloc</span>
                    </div>
                  </div>
                  <div className="metric-item">
                    <FaRocket className="metric-icon" />
                    <div>
                      <span className="metric-val">&lt; 15 ms</span>
                      <span className="metric-lbl">API Latency</span>
                    </div>
                  </div>
                  <div className="metric-item">
                    <FaShieldAlt className="metric-icon" />
                    <div>
                      <span className="metric-val">100%</span>
                      <span className="metric-lbl">Health Check</span>
                    </div>
                  </div>
                </div>

                {/* Overview & Core Capabilities */}
                <div className="modal-section-block">
                  <h4 className="modal-block-heading">Service Architecture &amp; Capabilities</h4>
                  <p className="modal-svc-desc">{inspectedService.desc}</p>
                  <ul className="modal-capabilities-list">
                    {inspectedService.capabilities.map((cap, idx) => (
                      <li key={idx}>
                        <FaCheckCircle className="cap-check-icon" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="modal-section-block">
                  <h4 className="modal-block-heading">Technologies &amp; Libraries</h4>
                  <div className="modal-tech-chips">
                    {inspectedService.techStack.map((tech, i) => (
                      <span key={i} className="modal-chip">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Environment Variables Terminal Box */}
                <div className="modal-section-block">
                  <h4 className="modal-block-heading">Environment Config (.env.production)</h4>
                  <div className="modal-env-box">
                    {Object.entries(inspectedService.envPreview).map(([key, val]) => (
                      <div key={key} className="env-line">
                        <span className="env-key">{key}=</span>
                        <span className="env-val">&quot;{val}&quot;</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="modal-inspector-footer">
                <a 
                  href="#contact" 
                  className="modal-action-btn primary"
                  onClick={() => setInspectedService(null)}
                >
                  <FaRocket />
                  <span>Request Engineering Service</span>
                </a>
                <button 
                  className="modal-action-btn secondary" 
                  onClick={() => setInspectedService(null)}
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