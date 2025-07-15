"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface FlowingParticle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  color: string;
  shape: string;
  life: number;
  maxLife: number;
  opacity: number;
  size: number;
  trail: { x: number; y: number }[];
}

interface ClickBurst {
  id: string;
  x: number;
  y: number;
  tools: { id: string; x: number; y: number; vx: number; vy: number; rotation: number; color: string; tool: string }[];
}

// Simple colorful shapes for flowing particles
const FlowingShapes = {
  circle: (color: string, size: number) => (
    <div 
      className="rounded-full"
      style={{ 
        width: size, 
        height: size, 
        background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
        boxShadow: `0 0 ${size/2}px ${color}40`
      }} 
    />
  ),
  square: (color: string, size: number) => (
    <div 
      className="rounded-sm"
      style={{ 
        width: size, 
        height: size, 
        background: `linear-gradient(45deg, ${color} 0%, ${color}90 100%)`,
        boxShadow: `0 0 ${size/3}px ${color}30`
      }} 
    />
  ),
  diamond: (color: string, size: number) => (
    <div 
      className="transform rotate-45"
      style={{ 
        width: size * 0.8, 
        height: size * 0.8, 
        background: `linear-gradient(135deg, ${color} 0%, ${color}70 100%)`,
        boxShadow: `0 0 ${size/4}px ${color}50`
      }} 
    />
  ),
  star: (color: string, size: number) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path 
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
        fill={color}
        filter={`drop-shadow(0 0 ${size/6}px ${color}60)`}
      />
    </svg>
  ),
  triangle: (color: string, size: number) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path 
        d="M12 2L22 20H2L12 2Z" 
        fill={color}
        filter={`drop-shadow(0 0 ${size/4}px ${color}40)`}
      />
    </svg>
  ),
  heart: (color: string, size: number) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path 
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
        fill={color}
        filter={`drop-shadow(0 0 ${size/5}px ${color}50)`}
      />
    </svg>
  )
};

// Figma tool SVG icons for click bursts
const FigmaTools = {
  selection: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 2L18 8L8 18L2 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M8 8L12 12" stroke="white" strokeWidth="1"/>
    </svg>
  ),
  rectangle: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="5" width="14" height="10" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
      <rect x="5" y="7" width="10" height="6" fill="white" fillOpacity="0.3"/>
    </svg>
  ),
  ellipse: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
      <circle cx="10" cy="10" r="5" fill="white" fillOpacity="0.3"/>
    </svg>
  ),
  pen: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 17L5 15L15 5L17 3L15 1L13 3L3 13L1 15L3 17Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M13 3L17 7" stroke="white" strokeWidth="1"/>
      <path d="M5 15L7 13" stroke="white" strokeWidth="1"/>
    </svg>
  ),
  text: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 4H16V7H13V16H11V7H7V16H5V7H4V4Z" fill="currentColor"/>
      <rect x="3" y="3" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/>
    </svg>
  ),
  frame: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="16" height="16" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
      <rect x="5" y="5" width="10" height="10" rx="0.5" fill="currentColor" fillOpacity="0.2"/>
      <path d="M2 2L5 5M18 2L15 5M18 18L15 15M2 18L5 15" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
};

const figmaToolNames = Object.keys(FigmaTools);
const shapeNames = Object.keys(FlowingShapes);

export function FigmaToolsCursor() {
  // Smooth cursor position using Framer Motion's motion values
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Ultra-smooth spring configuration
  const springConfig = { damping: 30, stiffness: 700, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0, speed: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [flowingParticles, setFlowingParticles] = useState<FlowingParticle[]>([]);
  const [clickBursts, setClickBursts] = useState<ClickBurst[]>([]);
  
  const lastMousePosition = useRef<MousePosition>({ x: 0, y: 0 });
  const lastUpdateTime = useRef<number>(0);
  const animationFrameRef = useRef<number>();
  const particleIdRef = useRef<number>(0);

  // Vibrant color palette for flowing particles
  const flowingColors = [
    '#FF6B6B', // Coral Red
    '#4ECDC4', // Turquoise
    '#45B7D1', // Sky Blue
    '#96CEB4', // Mint Green
    '#FFEAA7', // Light Yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Mint
    '#F7DC6F', // Light Gold
    '#BB8FCE', // Light Purple
    '#85C1E9', // Light Blue
    '#F8C471', // Peach
    '#82E0AA', // Light Green
    '#F1948A', // Light Red
    '#85C1E9', // Powder Blue
    '#D7BDE2', // Lavender
    '#A3E4D7', // Aqua
    '#F9E79F', // Cream
    '#D5A6BD', // Dusty Rose
    '#AED6F1', // Alice Blue
    '#ABEBC6', // Honeydew
  ];

  // Generate unique ID for particles
  const generateId = useCallback(() => {
    return `particle-${++particleIdRef.current}`;
  }, []);

  // Calculate velocity
  const calculateVelocity = useCallback((current: MousePosition, previous: MousePosition, deltaTime: number) => {
    if (deltaTime === 0) return { vx: 0, vy: 0, speed: 0 };
    
    const vx = (current.x - previous.x) / deltaTime;
    const vy = (current.y - previous.y) / deltaTime;
    const speed = Math.sqrt(vx * vx + vy * vy);
    
    return { vx, vy, speed };
  }, []);

  // Mouse position tracking
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      
      // Update motion values for smooth cursor movement
      cursorX.set(newPosition.x);
      cursorY.set(newPosition.y);
      
      if (!isVisible) {
        setIsVisible(true);
      }
      
      setMousePosition(newPosition);
      
      // Calculate velocity
      const now = performance.now();
      const deltaTime = (now - lastUpdateTime.current) / 1000;
      
      if (deltaTime > 0) {
        const newVelocity = calculateVelocity(newPosition, lastMousePosition.current, deltaTime);
        setVelocity(newVelocity);
      }
      
      lastMousePosition.current = newPosition;
      lastUpdateTime.current = now;
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible, calculateVelocity]);

  // Handle interactive elements
  useEffect(() => {
    const handleHoverStart = (e: Event) => {
      setIsHovering(true);
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'BUTTON') {
        setCursorText('CLICK');
      } else if (target.tagName === 'A') {
        setCursorText('VISIT');
      } else if (target.hasAttribute('data-cursor')) {
        setCursorText(target.getAttribute('data-cursor') || '');
      } else {
        setCursorText('HOVER');
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      setCursorText('');
    };

    const handleClick = (e: MouseEvent) => {
      const newBurst: ClickBurst = {
        id: generateId(),
        x: e.clientX,
        y: e.clientY,
        tools: []
      };
      
      // Create scattered Figma tool particles for click
      const tools = [];
      const numTools = 8 + Math.floor(Math.random() * 4);
      
      for (let i = 0; i < numTools; i++) {
        const angle = (i / numTools) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const speed = 100 + Math.random() * 80;
        const toolName = figmaToolNames[Math.floor(Math.random() * figmaToolNames.length)];
        const color = flowingColors[Math.floor(Math.random() * flowingColors.length)];
        
        tools.push({
          id: generateId(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rotation: Math.random() * 360,
          color,
          tool: toolName,
        });
      }
      
      newBurst.tools = tools;
      setClickBursts(prev => [...prev, newBurst]);
      
      // Clean up burst after animation
      setTimeout(() => {
        setClickBursts(prev => prev.filter(burst => burst.id !== newBurst.id));
      }, 1500);
    };

    const interactiveElements = document.querySelectorAll('button, a, [role="button"], [data-cursor]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    document.addEventListener('click', handleClick);

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
      document.removeEventListener('click', handleClick);
    };
  }, [generateId]);

  // Continuous flowing particles animation
  useEffect(() => {
    if (!isVisible) return;

    let lastParticleTime = 0;
    const particleInterval = 80; // Generate particles every 80ms for smooth flow

    const animate = () => {
      const now = performance.now();
      const deltaTime = Math.min((now - lastUpdateTime.current) / 1000, 0.016);
      
      setFlowingParticles(prev => {
        let newParticles = [...prev];
        
        // Generate new flowing particles continuously
        if (now - lastParticleTime > particleInterval && velocity.speed > 5) {
          const intensity = Math.min(velocity.speed / 100, 1);
          const particleCount = Math.floor(1 + intensity * 2);
          
          for (let i = 0; i < particleCount; i++) {
            const offsetX = (Math.random() - 0.5) * 30;
            const offsetY = (Math.random() - 0.5) * 30;
            const shapeName = shapeNames[Math.floor(Math.random() * shapeNames.length)];
            const color = flowingColors[Math.floor(Math.random() * flowingColors.length)];
            
            newParticles.push({
              id: generateId(),
              x: mousePosition.x + offsetX,
              y: mousePosition.y + offsetY,
              vx: -velocity.vx * 0.1 + (Math.random() - 0.5) * 20,
              vy: -velocity.vy * 0.1 + (Math.random() - 0.5) * 20,
              rotation: Math.random() * 360,
              rotationSpeed: (Math.random() - 0.5) * 120,
              scale: 0.5 + Math.random() * 0.8,
              color,
              shape: shapeName,
              life: 1,
              maxLife: 1,
              opacity: 0.8 + Math.random() * 0.2,
              size: 6 + Math.random() * 12,
              trail: [],
            });
          }
          
          lastParticleTime = now;
        }
        
        // Update and filter particles with flowing motion
        return newParticles
          .map(particle => {
            // Add current position to trail
            const newTrail = [...particle.trail, { x: particle.x, y: particle.y }];
            if (newTrail.length > 8) newTrail.shift();
            
            // Organic flowing motion
            const drag = 0.95;
            const flowForce = 15;
            const turbulence = Math.sin(now * 0.002 + particle.id.length) * 3;
            
            return {
              ...particle,
              x: particle.x + particle.vx * deltaTime + turbulence * deltaTime,
              y: particle.y + particle.vy * deltaTime + Math.sin(now * 0.001 + particle.x * 0.01) * flowForce * deltaTime,
              vx: particle.vx * drag + (Math.random() - 0.5) * 5 * deltaTime,
              vy: particle.vy * drag + (Math.random() - 0.5) * 5 * deltaTime,
              rotation: particle.rotation + particle.rotationSpeed * deltaTime,
              life: particle.life - deltaTime / 3, // 3 second lifespan
              opacity: particle.opacity * (particle.life / particle.maxLife) * 0.95,
              scale: particle.scale * (1 + (1 - particle.life / particle.maxLife) * 0.3),
              trail: newTrail,
            };
          })
          .filter(particle => particle.life > 0 && particle.opacity > 0.05)
          .slice(0, 150); // Limit particles for performance
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, velocity, mousePosition, generateId]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-12px',
          translateY: '-12px',
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {/* Outer ring */}
          <div className="w-6 h-6 rounded-full border-2 border-white/80 backdrop-blur-sm bg-white/20 shadow-lg">
            {/* Inner dot */}
            <div 
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              style={{
                background: isHovering 
                  ? 'var(--accent-gradient-primary)' 
                  : 'rgba(31, 41, 55, 0.8)',
              }}
            />
          </div>
          
          {/* Hover glow effect */}
          {isHovering && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: 'var(--accent-gradient-radial)',
                filter: 'blur(4px)',
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Flowing particles */}
      <AnimatePresence mode="popLayout">
        {flowingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-[9998]"
            initial={{ 
              opacity: 0,
              scale: 0.3,
              rotate: particle.rotation - 90,
            }}
            animate={{
              opacity: particle.opacity,
              scale: particle.scale,
              rotate: particle.rotation,
              x: particle.x - particle.size / 2,
              y: particle.y - particle.size / 2,
            }}
            exit={{ 
              opacity: 0,
              scale: 0.1,
              rotate: particle.rotation + 90,
            }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {/* Particle trail */}
            {particle.trail.length > 1 && (
              <svg
                className="absolute inset-0 pointer-events-none"
                style={{
                  width: '100px',
                  height: '100px',
                  left: '-50px',
                  top: '-50px',
                }}
              >
                <path
                  d={`M ${particle.trail.map((point, i) => 
                    `${point.x - particle.x + 50} ${point.y - particle.y + 50}`
                  ).join(' L ')}`}
                  stroke={particle.color}
                  strokeWidth="2"
                  fill="none"
                  opacity={particle.opacity * 0.3}
                  strokeLinecap="round"
                />
              </svg>
            )}
            
            {/* Main particle */}
            <div style={{ opacity: particle.opacity }}>
              {FlowingShapes[particle.shape as keyof typeof FlowingShapes](particle.color, particle.size)}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click burst tools */}
      <AnimatePresence>
        {clickBursts.map((burst) => (
          <div key={burst.id}>
            {/* Burst explosion effect */}
            <motion.div
              className="fixed pointer-events-none z-[9997]"
              initial={{
                x: burst.x - 20,
                y: burst.y - 20,
                width: 40,
                height: 40,
                opacity: 0.8,
                scale: 0,
              }}
              animate={{
                scale: [0, 1.5, 3],
                opacity: [0.8, 0.3, 0],
                rotate: [0, 180, 360],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              style={{
                background: 'var(--accent-gradient-radial)',
                borderRadius: '50%',
                filter: 'blur(3px)',
              }}
            />
            
            {/* Scattered tools */}
            {burst.tools.map((tool) => (
              <motion.div
                key={tool.id}
                className="fixed pointer-events-none z-[9996]"
                initial={{
                  x: tool.x - 10,
                  y: tool.y - 10,
                  opacity: 0,
                  scale: 0.3,
                  rotate: tool.rotation - 90,
                }}
                animate={{
                  x: tool.x + tool.vx * 0.015 - 10,
                  y: tool.y + tool.vy * 0.015 - 10,
                  opacity: [0, 1, 0.7, 0],
                  scale: [0.3, 1, 0.8, 0.2],
                  rotate: tool.rotation + 180,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
              >
                <div
                  className="w-5 h-5 flex items-center justify-center rounded-md shadow-lg backdrop-blur-sm"
                  style={{
                    color: tool.color,
                    background: `${tool.color}20`,
                    border: `1px solid ${tool.color}40`,
                  }}
                >
                  {FigmaTools[tool.tool as keyof typeof FigmaTools]}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </AnimatePresence>

      {/* Cursor text label */}
      <AnimatePresence>
        {cursorText && (
          <motion.div
            className="fixed pointer-events-none z-[9996]"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '20px',
              translateY: '-10px',
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <div className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-800 rounded-md shadow-lg border border-white/20">
              {cursorText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}