"use client";

import { FaFileAlt } from 'react-icons/fa';
import './FloatingResumeButton.css';

export default function FloatingResumeButton() {
  return (
    <a
      className="floating-resume-btn"
      href="/Ahmad-Raza-CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open resume in a new tab"
    >
      <FaFileAlt />
      <span>Resume / CV</span>
    </a>
  );
}
