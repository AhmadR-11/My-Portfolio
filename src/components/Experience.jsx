"use client";

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FaBriefcase, FaBuilding, FaCalendarAlt, FaMapMarkerAlt, 
  FaCheckCircle, FaTerminal, FaCloud, FaCode, FaLaptopCode, 
  FaServer, FaRocket, FaShieldAlt, FaLayerGroup, FaChevronRight
} from 'react-icons/fa';
import './Experience.css';

const experiences = [
  {
    id: 'nexium',
    role: 'Full Stack Software Engineer',
    company: 'Nexium',
    type: 'Full-Time / Contract',
    period: 'Jun 2025 – Jan 2026',
    location: 'Lahore, PK (Hybrid)',
    icon: FaLaptopCode,
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(37, 99, 235, 0.2))',
    summary: 'Architected and delivered production AI web applications using MERN, Next.js, LLM integrations, and token-based authentication.',
    keyPoints: [
      'AI Recipe Generator: Architected a secure single-page MERN application integrating LLM recipe generation and token-based authentication.',
      'Blog Summariser: Engineered an AI-powered bilingual content summarization tool using web scraping and LLM integration for rapid consumption.',
      'Designed responsive UI/UX using Tailwind CSS and React 19, optimizing client-side state and minimizing API request latency.',
      'Integrated secure JWT authentication flows with role-based access control and rate-limiting middleware.'
    ],
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'OpenAI API', 'Tailwind CSS'],
    logs: [
      { time: '0.001', type: 'OK', msg: 'Connecting to Nexium production gateway...' },
      { time: '0.014', type: 'OK', msg: 'Initializing LLM prompt engine & token auth...' },
      { time: '0.045', type: 'INFO', msg: 'MERN stack cluster operating cleanly.' },
      { time: '0.089', type: 'OK', msg: 'AI Blog Summariser scraping worker active.' }
    ]
  },
  {
    id: 'aws-devops',
    role: 'DevOps & Cloud Engineer',
    company: 'AWS Infrastructure',
    type: 'Cloud Project Lead',
    period: '2024 – Present',
    location: 'Cloud / Remote',
    icon: FaCloud,
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, rgba(129, 140, 248, 0.2), rgba(147, 51, 234, 0.2))',
    summary: 'Provisioned secure, auto-scaling AWS infrastructure using Terraform and Packer, automating container deployments via Docker and Kubernetes.',
    keyPoints: [
      'Provisioned secure AWS environments using Terraform & Packer (VPC, NAT Gateways, ALBs, ASG, and CloudWatch alarms).',
      'Configured Kubernetes cluster with Horizontal Pod Autoscaling (HPA) and Persistent Volumes for high-availability workloads.',
      'Deployed live WordPress application separating EC2 web tier from isolated RDS database tier, hardened via IAM roles and SSM.',
      'Engineered automated CI/CD deployment pipelines with Nginx reverse proxying and zero-downtime rolling updates.'
    ],
    skills: ['AWS (VPC/EC2/RDS)', 'Terraform', 'Packer', 'Docker', 'Kubernetes', 'Nginx', 'IAM / SSM'],
    logs: [
      { time: '0.000', type: 'OK', msg: 'Booting DevOps Infrastructure Subsystem...' },
      { time: '0.014', type: 'OK', msg: 'Starting Docker daemon...' },
      { time: '0.045', type: 'OK', msg: 'Initializing Kubernetes control plane & HPA...' },
      { time: '0.089', type: 'INFO', msg: 'Terraform: State locked in S3 with DynamoDB.' },
      { time: '0.124', type: 'OK', msg: 'AWS: Authenticated successfully. Custom VPC active.' },
      { time: '0.250', type: 'OK', msg: 'System fully operational. All DevOps modules loaded.' }
    ]
  },
  {
    id: 'projectify',
    role: 'Software Architect & Lead',
    company: 'Projectify SaaS Platform',
    type: 'Final Year Project Lead',
    period: '2025 – 2026',
    location: 'FAST-NUCES, Lahore',
    icon: FaServer,
    color: '#c084fc',
    gradient: 'linear-gradient(135deg, rgba(192, 132, 252, 0.2), rgba(219, 39, 119, 0.2))',
    summary: 'Architected a multi-tenant FYP management ecosystem automating group matching, panel evaluations, and AI plagiarism vector search.',
    keyPoints: [
      'Architected multi-tenant SaaS ecosystem with dedicated portals for 4 user roles (Student, Supervisor, Coordinator, Evaluator).',
      'Engineered AI-backed plagiarism engine generating 1024-dim vector embeddings via Cohere AI and Pinecone/pg-vector similarity search.',
      'Implemented real-time encrypted messaging using Socket.IO with Redis adapters, Cloudflare R2 for asset storage, and Docker deployment.',
      'Built dynamic workflow engine handling hardware approvals, milestone file versioning, and automated meeting reminder CRON jobs.'
    ],
    skills: ['Next.js', 'Node.js', 'PostgreSQL', 'Cohere AI', 'Pinecone', 'Socket.IO', 'Docker'],
    logs: [
      { time: '0.002', type: 'OK', msg: 'Initializing Projectify multi-tenant gateway...' },
      { time: '0.021', type: 'OK', msg: 'Connecting pg-vector & Pinecone similarity engine...' },
      { time: '0.065', type: 'INFO', msg: 'Socket.IO Redis adapter connected.' },
      { time: '0.110', type: 'OK', msg: 'Role-based access control (RBAC) initialized.' }
    ]
  },
  {
    id: 'instagram-clone',
    role: 'Full Stack Developer',
    company: 'Instagram Platform',
    type: 'Independent Engineering',
    period: '2025 – 2026',
    location: 'Lahore, PK',
    icon: FaCode,
    color: '#34d399',
    gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(5, 150, 105, 0.2))',
    summary: 'Developed a high-performance social media platform using Next.js, NestJS, and PostgreSQL, featuring instant messaging and real-time feeds.',
    keyPoints: [
      'Architected relational database schema using PostgreSQL managing follower/following logic and nested comment threads.',
      'Implemented real-time feed updates and instant direct messaging via WebSockets (Socket.IO).',
      'Built full-text search indexing to allow instant discovery of user profiles, tags, and engagement-based post ranking.',
      'Implemented multi-stage authentication flow and private profile visibility logic.'
    ],
    skills: ['Next.js', 'NestJS', 'React', 'TypeScript', 'PostgreSQL', 'Socket.IO', 'Tailwind CSS'],
    logs: [
      { time: '0.005', type: 'OK', msg: 'Loading Instagram clone microservices...' },
      { time: '0.030', type: 'OK', msg: 'PostgreSQL relational follower tree active.' },
      { time: '0.075', type: 'INFO', msg: 'WebSocket instant messaging online.' }
    ]
  }
];

export default function Experience() {
  const [selectedExpId, setSelectedExpId] = useState(experiences[0].id);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const activeExp = experiences.find(e => e.id === selectedExpId) || experiences[0];

  return (
    <div ref={ref} className="exp-section" id="experience">
      <div className="exp-container-inner">

        {/* Section Header */}
        <div className="exp-header-area">
          <div className="exp-badge">
            <FaBriefcase className="badge-icon" />
            <span>Career &amp; Engineering Track Record</span>
          </div>
          <h2 className="exp-section-title">Professional Experience &amp; Engineering Roles</h2>
          <p className="exp-section-subtitle">
            A track record of designing resilient full-stack applications, provisioning AWS cloud infrastructure, and building autonomous AI systems.
          </p>
        </div>

        {/* macOS Main Window Window */}
        <motion.div 
          className="macos-window exp-macos-window"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Title Bar */}
          <div className="macos-header exp-window-header">
            <div className="macos-buttons">
              <span className="macos-btn close" title="Close" />
              <span className="macos-btn minimize" title="Minimize" />
              <span className="macos-btn expand" title="Expand" />
            </div>
            <div className="exp-window-breadcrumb">
              <span className="exp-user-path">ahmad@macbook</span>:<span className="exp-dir-path">~/experience/{activeExp.id}</span>
            </div>
            <div className="exp-status-tag">
              <span className="status-ping-green" /> 4 Verified Milestones
            </div>
          </div>

          {/* Main 2-Column Area (Left Role Navigation List + Right Detailed Inspector) */}
          <div className="exp-window-content">
            
            {/* Left Column: Role Selector List */}
            <div className="exp-sidebar">
              <div className="exp-sidebar-header">
                <FaBriefcase className="sidebar-header-icon" />
                <span>ROLES &amp; COMMITMENTS</span>
              </div>
              <div className="exp-nav-list">
                {experiences.map((exp) => {
                  const Icon = exp.icon;
                  const isSelected = exp.id === selectedExpId;
                  return (
                    <button 
                      key={exp.id}
                      className={`exp-nav-item ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedExpId(exp.id)}
                    >
                      <div className="exp-nav-icon-wrapper" style={{ color: exp.color, background: isSelected ? exp.gradient : 'transparent' }}>
                        <Icon />
                      </div>
                      <div className="exp-nav-text">
                        <span className="exp-nav-role">{exp.role}</span>
                        <span className="exp-nav-company">{exp.company}</span>
                      </div>
                      <FaChevronRight className={`exp-nav-arrow ${isSelected ? 'visible' : ''}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Detailed Role Inspector */}
            <div className="exp-inspector">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeExp.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="exp-detail-panel"
                >
                  {/* Role Header Banner */}
                  <div className="exp-detail-header">
                    <div className="exp-detail-title-area">
                      <div className="exp-role-badge" style={{ background: activeExp.gradient, color: activeExp.color, borderColor: activeExp.color }}>
                        <activeExp.icon />
                      </div>
                      <div>
                        <h3 className="exp-role-title">{activeExp.role}</h3>
                        <p className="exp-company-name">
                          <FaBuilding className="meta-icon" /> {activeExp.company} • <span className="exp-type-badge">{activeExp.type}</span>
                        </p>
                      </div>
                    </div>

                    <div className="exp-detail-meta-pills">
                      <span className="meta-pill">
                        <FaCalendarAlt className="meta-icon" /> {activeExp.period}
                      </span>
                      <span className="meta-pill">
                        <FaMapMarkerAlt className="meta-icon" /> {activeExp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="exp-summary-box">
                    <p>{activeExp.summary}</p>
                  </div>

                  {/* Key Highlights & Achievements */}
                  <div className="exp-highlights-section">
                    <h4 className="exp-subheading">
                      <FaRocket className="subheading-icon" /> Key Accomplishments &amp; Architecture
                    </h4>
                    <ul className="exp-bullets-list">
                      {activeExp.keyPoints.map((point, idx) => (
                        <li key={idx}>
                          <FaCheckCircle className="bullet-check-icon" style={{ color: activeExp.color }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Used */}
                  <div className="exp-tech-section">
                    <h4 className="exp-subheading">
                      <FaLayerGroup className="subheading-icon" /> Technologies &amp; Tools Used
                    </h4>
                    <div className="exp-tech-chips">
                      {activeExp.skills.map((sk, i) => (
                        <span key={i} className="exp-tech-chip">{sk}</span>
                      ))}
                    </div>
                  </div>

                  {/* Subsystem Terminal Boot Log Preview */}
                  <div className="exp-terminal-log-box">
                    <div className="term-log-prompt">
                      <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/experience/{activeExp.id}</span>$ <span className="term-cmd">cat sysboot.log</span>
                    </div>
                    <div className="term-lines-wrapper">
                      {activeExp.logs.map((lg, i) => (
                        <div key={i} className="term-log-line">
                          <span className="log-time">[{lg.time}s]</span>
                          <span className={`log-status status-${lg.type.toLowerCase()}`}>{lg.type}</span>
                          <span className="log-msg">{lg.msg}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Footer Status Bar */}
          <div className="exp-window-footer">
            <span className="footer-left-txt">Subsystem Audit: Verified Experience Entries (2024 - 2026)</span>
            <span className="footer-right-txt">macOS Sonoma Experience Inspector</span>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
