"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartLine, FaTimes, FaMicrochip, FaHdd, FaCheckCircle } from 'react-icons/fa';
import './ActivityMonitorModal.css';

const processList = [
  { pid: 1042, processName: "Next.js App Router", cpu: "98%", memory: "512 MB", status: "Operational", impact: "High" },
  { pid: 1084, processName: "React.js 19 Components", cpu: "96%", memory: "384 MB", status: "Operational", impact: "High" },
  { pid: 1120, processName: "PyTorch Deep Learning Engine", cpu: "94%", memory: "1.4 GB", status: "Operational", impact: "High" },
  { pid: 1192, processName: "OpenAI GPT-4o API Worker", cpu: "92%", memory: "256 MB", status: "Operational", impact: "Medium" },
  { pid: 1204, processName: "AWS EC2 & Lambda Services", cpu: "90%", memory: "890 MB", status: "Operational", impact: "High" },
  { pid: 1255, processName: "Docker Container Daemon", cpu: "88%", memory: "640 MB", status: "Operational", impact: "Medium" },
  { pid: 1310, processName: "Kubernetes Cluster Controller", cpu: "87%", memory: "1.1 GB", status: "Operational", impact: "High" },
  { pid: 1342, processName: "Python Scraping Automation", cpu: "85%", memory: "320 MB", status: "Operational", impact: "Medium" },
  { pid: 1400, processName: "Node.js REST API Backend", cpu: "91%", memory: "410 MB", status: "Operational", impact: "High" },
];

export default function ActivityMonitorModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('cpu');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="activity-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="activity-modal-window macos-window"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window Header */}
            <div className="macos-header tech-window-header">
              <div className="macos-buttons">
                <span className="macos-btn close" onClick={onClose} title="Close Diagnostics" />
                <span className="macos-btn minimize" onClick={onClose} />
                <span className="macos-btn expand" onClick={onClose} />
              </div>
              <div className="tech-window-breadcrumb">
                <span className="tech-user-path">ahmad@macbook</span>:<span className="tech-dir-path">Activity Monitor — System Diagnostics</span>
              </div>
              <button className="tech-modal-close-btn" onClick={onClose}>
                <FaTimes /> Esc
              </button>
            </div>

            {/* Toolbar Tabs */}
            <div className="activity-toolbar">
              <div className="activity-tabs">
                <button className={`act-tab-btn ${activeTab === 'cpu' ? 'active' : ''}`} onClick={() => setActiveTab('cpu')}>
                  <FaMicrochip className="tab-icon" /> CPU Proficiency
                </button>
                <button className={`act-tab-btn ${activeTab === 'memory' ? 'active' : ''}`} onClick={() => setActiveTab('memory')}>
                  <FaHdd className="tab-icon" /> Memory Footprint
                </button>
                <button className={`act-tab-btn ${activeTab === 'status' ? 'active' : ''}`} onClick={() => setActiveTab('status')}>
                  <FaCheckCircle className="tab-icon" /> Tech Stack Health
                </button>
              </div>
            </div>

            {/* Process List Table */}
            <div className="activity-body">
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>PID</th>
                    <th>Process / Technology</th>
                    <th>Proficiency / CPU</th>
                    <th>Memory</th>
                    <th>Health Status</th>
                  </tr>
                </thead>
                <tbody>
                  {processList.map((proc) => (
                    <tr key={proc.pid}>
                      <td className="proc-pid">{proc.pid}</td>
                      <td className="proc-name">{proc.processName}</td>
                      <td>
                        <div className="cpu-bar-wrapper">
                          <div className="cpu-bar-fill" style={{ width: proc.cpu }} />
                          <span className="cpu-text">{proc.cpu}</span>
                        </div>
                      </td>
                      <td className="proc-mem">{proc.memory}</td>
                      <td>
                        <span className="proc-status-tag">
                          <span className="proc-dot" /> {proc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Status Summary */}
            <div className="activity-footer">
              <div className="act-stat-box">
                <span className="stat-lbl">System Threads:</span>
                <span className="stat-val">32 Active</span>
              </div>
              <div className="act-stat-box">
                <span className="stat-lbl">Overall Ecosystem Health:</span>
                <span className="stat-val health-good">100% Operational</span>
              </div>
              <button className="tech-expand-btn close-modal-btn" onClick={onClose}>
                Close Activity Monitor
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
