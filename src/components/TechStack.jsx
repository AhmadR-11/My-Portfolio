"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaAws } from 'react-icons/fa';
import { 
  SiPython, SiNodedotjs, SiReact, SiNextdotjs, 
  SiJenkins, SiApachetomcat, SiTerraform, 
  SiDocker, SiKubernetes, SiLinux, SiUbuntu, SiGithub 
} from 'react-icons/si';
import './TechStack.css';

const techData = [
  { name: "Python",     Icon: SiPython },
  { name: "Node.js",    Icon: SiNodedotjs },
  { name: "React.js",   Icon: SiReact },
  { name: "Next.js",    Icon: SiNextdotjs },
  { name: "Jenkins",    Icon: SiJenkins },
  { name: "Tomcat",     Icon: SiApachetomcat },
  { name: "Terraform",  Icon: SiTerraform },
  { name: "AWS",        Icon: FaAws },
  { name: "Docker",     Icon: SiDocker },
  { name: "Kubernetes", Icon: SiKubernetes },
  { name: "Linux",      Icon: SiLinux },
  { name: "Ubuntu",     Icon: SiUbuntu },
  { name: "GitHub",     Icon: SiGithub }
];

export default function TechStack() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="tech-stack-section">
      <div 
        className="tech-stack-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(!isHovered)}
      >
        <div className="tech-stack-title">
          <span className="term-user">ahmad@macbook</span>:<span className="term-dir">~/stack</span>$ {isHovered ? './unpack.sh' : 'idle...'}
        </div>

        <div className="tech-balls-area">
          {techData.map((tech, i) => {
            const total = techData.length;
            
            // Clustered State (Tightly packed overlapping clump)
            const angle = (i / total) * Math.PI * 2;
            const radius = 25; 
            const clusteredX = Math.cos(angle) * radius;
            const clusteredY = Math.sin(angle) * radius;

            // Scattered State (Readable layout, slightly organic but separated)
            // Arrange in an oval/ellipse to fill the space
            const scatterRadiusX = 280;
            const scatterRadiusY = 90;
            const scatterAngle = (i / total) * Math.PI * 2 + (Math.PI / 2); // Shift starting angle
            // Add slight random offset based on index to look "disturbed" but readable
            const disturbX = (i % 2 === 0 ? 1 : -1) * 15;
            const disturbY = (i % 3 === 0 ? 1 : -1) * 15;
            const scatteredX = Math.cos(scatterAngle) * scatterRadiusX + disturbX;
            const scatteredY = Math.sin(scatterAngle) * scatterRadiusY + disturbY;

            const targetX = isHovered ? scatteredX : clusteredX;
            const targetY = isHovered ? scatteredY : clusteredY;
            const targetScale = isHovered ? 1 : 0.85;

            return (
              <motion.div
                key={tech.name}
                className="tech-ball-wrapper"
                initial={false}
                animate={{
                  x: targetX,
                  y: targetY,
                  scale: targetScale,
                  opacity: 1
                }}
                transition={{
                  type: "spring",
                  stiffness: isHovered ? 120 : 80,
                  damping: isHovered ? 12 : 15,
                  mass: 0.8,
                  delay: isHovered ? i * 0.04 : 0 // Disturbance ripple effect
                }}
              >
                {/* Continuous Hanging/Floating Animation */}
                <motion.div
                  className="tech-ball"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, i % 2 === 0 ? 2 : -2, 0]
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                >
                  <div className="tech-ball-inner">
                    <tech.Icon className="tech-icon" />
                    <span className="tech-name">{tech.name}</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
        {!isHovered && (
          <div className="tech-hint">Hover to disturb</div>
        )}
      </div>
    </div>
  );
}
