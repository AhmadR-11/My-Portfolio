"use client";

import { useState, useEffect } from 'react';
import { FaApple, FaWifi, FaSearch, FaSlidersH, FaChartLine } from 'react-icons/fa';
import './MacMenuBar.css';

export default function MacMenuBar({ onOpenSpotlight, onOpenActivityMonitor }) {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + 
        ' ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      setTimeString(formatted);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="mac-menu-bar">
      {/* Left Menu Items */}
      <div className="mac-menu-left">
        <button className="mac-menu-item apple-logo" title="System Info" onClick={onOpenActivityMonitor}>
          <FaApple />
        </button>
        <span className="mac-menu-item app-name">Ahmad Raza</span>
        <span className="mac-menu-item hide-mobile">File</span>
        <span className="mac-menu-item hide-mobile">Edit</span>
        <span className="mac-menu-item hide-mobile">View</span>
        <span className="mac-menu-item hide-mobile">Go</span>
        <span className="mac-menu-item hide-mobile">Window</span>
        <span className="mac-menu-item hide-mobile">Help</span>
      </div>

      {/* Right Control Center Icons */}
      <div className="mac-menu-right">
        {/* Spotlight Trigger */}
        <button className="mac-menu-pill spotlight-btn" onClick={onOpenSpotlight} title="Spotlight Search (⌘K)">
          <FaSearch className="pill-icon" />
          <span className="pill-text">⌘K</span>
        </button>

        {/* Activity Monitor Trigger */}
        <button className="mac-menu-pill activity-btn" onClick={onOpenActivityMonitor} title="Activity Monitor Diagnostics">
          <FaChartLine className="pill-icon" />
          <span className="pill-text">Diagnostics</span>
        </button>

        {/* System Icons */}
        <div className="mac-sys-icons">
          <FaWifi className="sys-icon" title="Connected: 5G Wi-Fi" />
          <FaSlidersH className="sys-icon" title="Control Center" />
        </div>

        {/* Live Date & Time */}
        <span className="mac-clock">{timeString || 'Mon Sep 14 5:10 PM'}</span>
      </div>
    </header>
  );
}
