"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PageLoader.css';

export default function PageLoader({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ultra-smooth 60fps progress increment from 0 to 100
    const duration = 1400; // 1.4 seconds total
    const startTime = performance.now();

    const animateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      
      // Smooth easeOutCubic curve
      const easedProgress = Math.round(100 * (1 - Math.pow(1 - rawProgress / 100, 3)));
      
      setProgress(easedProgress);

      if (elapsed < duration) {
        requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          if (onComplete) onComplete();
        }, 400);
      }
    };

    const animationFrame = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="apple-pro-loader"
          className="pro-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(12px)",
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* Background Ambient Mesh Light */}
          <div className="pro-loader-mesh" aria-hidden="true" />

          <div className="pro-loader-card">
            {/* Minimal Brand Monogram */}
            <motion.div
              className="pro-loader-brand"
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="pro-loader-logo-ring">
                <span className="pro-loader-logo-text">&lt;AR /&gt;</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="pro-loader-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ahmad Raza
            </motion.h2>

            {/* Seamless Progress Track */}
            <div className="pro-loader-track-bg">
              <div
                className="pro-loader-track-fill"
                style={{ width: `${progress}%` }}
              >
                <div className="pro-loader-shimmer" />
              </div>
            </div>

            {/* Status Info */}
            <div className="pro-loader-footer">
              <span className="pro-loader-status-msg">
                {progress < 40 ? 'Initialising environment...' : progress < 80 ? 'Loading components...' : 'Ready'}
              </span>
              <span className="pro-loader-counter">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
