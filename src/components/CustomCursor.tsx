"use client";

import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface SmokeParticle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  gradient: string;
  type: 'smoke' | 'mist' | 'glow' | 'burst';
  layer: number;
}

interface ClickRipple {
  id: string;
  x: number;
  y: number;
}

export function CustomCursor() {
  // Smooth cursor position using Framer Motion's motion values
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring animations for ultra-smooth movement
  const springOptions = { damping: 30, stiffness: 800, mass: 0.3 };
  const smoothX = useSpring(cursorX, springOptions);
  const smoothY = useSpring(cursorY, springOptions);

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0, speed: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [smokeParticles, setSmokeParticles] = useState<SmokeParticle[]>([]);
  const [clickRipples, setClickRipples] = useState<ClickRipple[]>([]);
  
  const lastMousePosition = useRef<MousePosition>({ x: 0, y: 0 });
  const lastUpdateTime = useRef<number>(0);
  const animationFrameRef = useRef<number>();
  const particleIdRef = useRef<number>(0);
  const velocityHistory = useRef<number[]>([]);

  // Gradient combinations for different particle types
  const gradients = {
    primary: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.3) 40%, rgba(59, 130, 246, 0.2) 70%, transparent 100%)',
    secondary: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 80%)',
    glow: 'radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.4) 30%, rgba(59, 130, 246, 0.2) 60%, transparent 90%)',
    mist: 'radial-gradient(circle, rgba(75, 85, 99, 0.2) 0%, rgba(107, 114, 128, 0.1) 50%, transparent 80%)',
    hover: 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.6) 30%, rgba(236, 72, 153, 0.4) 60%, rgba(59, 130, 246, 0.2) 80%, transparent 100%)'
  };

  // Generate unique ID for particles
  const generateId = useCallback(() => {
    return `particle-${++particleIdRef.current}`;
  }, []);

  // Smooth velocity calculation with history
  const calculateVelocity = useCallback((current: MousePosition, previous: MousePosition, deltaTime: number) => {
    if (deltaTime === 0) return { vx: 0, vy: 0, speed: 0 };
    
    const vx = (current.x - previous.x) / deltaTime;
    const vy = (current.y - previous.y) / deltaTime;
    const speed = Math.sqrt(vx * vx + vy * vy);
    
    // Smooth velocity with history
    velocityHistory.current.push(speed);
    if (velocityHistory.current.length > 8) {
      velocityHistory.current.shift();
    }
    
    const smoothSpeed = velocityHistory.current.reduce((a, b) => a + b) / velocityHistory.current.length;
    
    return { vx, vy, speed: smoothSpeed };
  }, []);

  // Mouse position tracking with interpolation
  useEffect(() => {
    let rafId: number;
    
    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      
      // Update motion values for smooth cursor movement
      cursorX.set(newPosition.x);
      cursorY.set(newPosition.y);
      
      if (!isVisible) {
        setIsVisible(true);
      }
      
      // Update state for particle system
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
      if (rafId) cancelAnimationFrame(rafId);
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
        setCursorText('VIEW');
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
      const newRipple: ClickRipple = {
        id: generateId(),
        x: e.clientX,
        y: e.clientY,
      };
      
      setClickRipples(prev => [...prev, newRipple]);
      
      // Create explosive burst particles with gradient smoke
      const burstParticles: SmokeParticle[] = [];
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const speed = 60 + Math.random() * 40;
        const layer = Math.floor(Math.random() * 3);
        
        burstParticles.push({
          id: generateId(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 1,
          size: 8 + Math.random() * 12,
          opacity: 0.7 + Math.random() * 0.3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 180,
          gradient: isHovering ? gradients.hover : gradients.glow,
          type: 'burst',
          layer
        });
      }
      
      setSmokeParticles(prev => [...prev, ...burstParticles]);
      
      setTimeout(() => {
        setClickRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 800);
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
  }, [generateId, isHovering]);

  // Enhanced particle system with gradient smoke
  useEffect(() => {
    if (!isVisible) return;

    let lastParticleTime = 0;
    const particleInterval = 30; // Generate particles more frequently for smoother smoke

    const animate = () => {
      const now = performance.now();
      const deltaTime = Math.min((now - lastUpdateTime.current) / 1000, 0.016);
      
      setSmokeParticles(prev => {
        let newParticles = [...prev];
        
        // Generate multiple layers of smoke particles
        if (now - lastParticleTime > particleInterval) {
          
          // Primary smoke trail - always generate
          if (Math.random() < 0.8) {
            const layer = Math.floor(Math.random() * 3);
            newParticles.push({
              id: generateId(),
              x: mousePosition.x + (Math.random() - 0.5) * 20,
              y: mousePosition.y + (Math.random() - 0.5) * 20,
              vx: -velocity.vx * 0.2 + (Math.random() - 0.5) * 20,
              vy: -velocity.vy * 0.2 + (Math.random() - 0.5) * 20 - 10,
              life: 1,
              maxLife: 1,
              size: 6 + Math.random() * 8 + velocity.speed * 0.08,
              opacity: 0.4 + Math.random() * 0.4,
              rotation: Math.random() * 360,
              rotationSpeed: (Math.random() - 0.5) * 90,
              gradient: isHovering ? gradients.hover : gradients.primary,
              type: 'smoke',
              layer
            });
          }
          
          // Velocity-based intense smoke
          if (velocity.speed > 20 && Math.random() < 0.9) {
            const layer = Math.floor(Math.random() * 3);
            newParticles.push({
              id: generateId(),
              x: mousePosition.x + (Math.random() - 0.5) * 15,
              y: mousePosition.y + (Math.random() - 0.5) * 15,
              vx: -velocity.vx * 0.25 + (Math.random() - 0.5) * 25,
              vy: -velocity.vy * 0.25 + (Math.random() - 0.5) * 25 - 15,
              life: 1,
              maxLife: 1,
              size: 8 + Math.random() * 10 + velocity.speed * 0.1,
              opacity: 0.5 + Math.random() * 0.4,
              rotation: Math.random() * 360,
              rotationSpeed: (Math.random() - 0.5) * 120,
              gradient: isHovering ? gradients.hover : gradients.secondary,
              type: 'smoke',
              layer
            });
          }
          
          // Ambient mist particles
          if (Math.random() < 0.3) {
            const layer = Math.floor(Math.random() * 2);
            newParticles.push({
              id: generateId(),
              x: mousePosition.x + (Math.random() - 0.5) * 40,
              y: mousePosition.y + (Math.random() - 0.5) * 40,
              vx: (Math.random() - 0.5) * 15,
              vy: (Math.random() - 0.5) * 15 - 5,
              life: 1,
              maxLife: 1,
              size: 12 + Math.random() * 16,
              opacity: 0.15 + Math.random() * 0.25,
              rotation: Math.random() * 360,
              rotationSpeed: (Math.random() - 0.5) * 30,
              gradient: isHovering ? gradients.secondary : gradients.mist,
              type: 'mist',
              layer
            });
          }
          
          // Glow particles for enhanced effect
          if (Math.random() < 0.4) {
            const layer = 2;
            newParticles.push({
              id: generateId(),
              x: mousePosition.x + (Math.random() - 0.5) * 10,
              y: mousePosition.y + (Math.random() - 0.5) * 10,
              vx: -velocity.vx * 0.1 + (Math.random() - 0.5) * 8,
              vy: -velocity.vy * 0.1 + (Math.random() - 0.5) * 8 - 8,
              life: 1,
              maxLife: 1,
              size: 4 + Math.random() * 6,
              opacity: 0.6 + Math.random() * 0.4,
              rotation: Math.random() * 360,
              rotationSpeed: (Math.random() - 0.5) * 60,
              gradient: gradients.glow,
              type: 'glow',
              layer
            });
          }
          
          lastParticleTime = now;
        }
        
        // Update and filter particles with enhanced physics
        return newParticles
          .map(particle => {
            const ageRatio = 1 - (particle.life / particle.maxLife);
            const drag = particle.type === 'mist' ? 0.96 : 0.97;
            
            return {
              ...particle,
              x: particle.x + particle.vx * deltaTime,
              y: particle.y + particle.vy * deltaTime,
              vx: particle.vx * drag,
              vy: particle.vy * drag + (particle.type === 'smoke' ? 8 : 4) * deltaTime,
              life: particle.life - deltaTime / (
                particle.type === 'burst' ? 1.5 : 
                particle.type === 'glow' ? 2.0 : 
                particle.type === 'smoke' ? 2.5 : 3.5
              ),
              rotation: particle.rotation + particle.rotationSpeed * deltaTime,
              opacity: particle.opacity * (particle.life / particle.maxLife) * (particle.type === 'mist' ? 0.7 : 1),
              size: particle.size * (1 + ageRatio * 0.5) // Grow slightly over time
            };
          })
          .filter(particle => particle.life > 0 && particle.opacity > 0.01)
          .slice(0, 80); // Higher particle limit for richer smoke
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, velocity, mousePosition, isHovering, generateId]);

  if (!isVisible) return null;

  // Sort particles by layer for proper rendering order
  const sortedParticles = [...smokeParticles].sort((a, b) => a.layer - b.layer);

  return (
    <>
      {/* Background texture */}
      <div className="background-texture" />

      {/* Main cursor with gradient glow */}
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
            scale: isHovering ? 1.4 : 1,
          }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 500,
              damping: 30,
            }
          }}
        >
          {/* Core cursor */}
          <div
            className="w-6 h-6 rounded-full"
            style={{
              background: isHovering ? gradients.hover : gradients.glow,
              filter: 'blur(0.3px)',
              boxShadow: isHovering 
                ? '0 0 20px rgba(99, 102, 241, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)' 
                : '0 0 15px rgba(99, 102, 241, 0.4)',
            }}
          />
          
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: gradients.primary,
              filter: 'blur(1px)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Gradient smoke particles with layered rendering */}
      <AnimatePresence mode="popLayout">
        {sortedParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none"
            style={{
              zIndex: 9990 + particle.layer,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.3,
            }}
            animate={{
              opacity: particle.opacity,
              scale: particle.type === 'burst' ? 1.2 : particle.type === 'mist' ? 0.8 : 1,
              rotate: particle.rotation,
              x: particle.x - particle.size / 2,
              y: particle.y - particle.size / 2,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.2,
            }}
            transition={{
              type: "tween",
              duration: 0.15,
              ease: "easeOut",
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.gradient,
              borderRadius: '50%',
              filter: `blur(${
                particle.type === 'mist' ? '2px' : 
                particle.type === 'glow' ? '0.5px' : 
                '1px'
              })`,
              mixBlendMode: particle.type === 'glow' ? 'screen' : 'normal',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Enhanced click ripples with gradient */}
      <AnimatePresence>
        {clickRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9995]"
            initial={{
              x: ripple.x - 20,
              y: ripple.y - 20,
              width: 40,
              height: 40,
              opacity: 0.8,
              scale: 0,
            }}
            animate={{
              scale: 3,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            style={{
              background: gradients.primary,
              borderRadius: '50%',
              filter: 'blur(1px)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Cursor label with gradient border */}
      <AnimatePresence>
        {cursorText && (
          <motion.div
            className="fixed pointer-events-none z-[9996]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '25px',
              translateY: '-8px',
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <div
              className="px-3 py-1 rounded-md text-xs font-semibold text-white uppercase tracking-wider"
              style={{
                background: 'rgba(31, 41, 55, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              }}
            >
              {cursorText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* High-speed atmospheric trail */}
      {velocity.speed > 80 && (
        <motion.div
          className="fixed pointer-events-none z-[9992]"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50px',
            translateY: '-50px',
          }}
        >
          <motion.div
            className="w-24 h-24 rounded-full"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: gradients.secondary,
              filter: 'blur(3px)',
            }}
          />
        </motion.div>
      )}
    </>
  );
}