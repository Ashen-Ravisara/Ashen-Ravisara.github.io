"use client";

import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface FlameParticle {
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
  type: 'core' | 'flame' | 'ember' | 'spark';
  layer: number;
  scale: number;
}

interface ClickBurst {
  id: string;
  x: number;
  y: number;
}

export function GradientFlamesCursor() {
  // Smooth cursor position using Framer Motion's motion values
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring animations for ultra-smooth movement
  const springOptions = { damping: 25, stiffness: 600, mass: 0.2 };
  const smoothX = useSpring(cursorX, springOptions);
  const smoothY = useSpring(cursorY, springOptions);

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0, speed: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [flameParticles, setFlameParticles] = useState<FlameParticle[]>([]);
  const [clickBursts, setClickBursts] = useState<ClickBurst[]>([]);
  
  const lastMousePosition = useRef<MousePosition>({ x: 0, y: 0 });
  const lastUpdateTime = useRef<number>(0);
  const animationFrameRef = useRef<number>();
  const particleIdRef = useRef<number>(0);
  const velocityHistory = useRef<number[]>([]);

  // Gradient combinations for flame effects
  const flameGradients = {
    core: 'radial-gradient(circle, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.7) 40%, rgba(59, 130, 246, 0.5) 70%, transparent 100%)',
    flame: 'radial-gradient(ellipse 60% 100%, rgba(139, 92, 246, 0.8) 0%, rgba(99, 102, 241, 0.6) 30%, rgba(59, 130, 246, 0.4) 60%, rgba(236, 72, 153, 0.2) 80%, transparent 100%)',
    ember: 'radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, rgba(139, 92, 246, 0.5) 50%, rgba(99, 102, 241, 0.3) 80%, transparent 100%)',
    spark: 'radial-gradient(circle, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.6) 40%, transparent 70%)',
    hover: 'radial-gradient(circle, rgba(99, 102, 241, 1) 0%, rgba(139, 92, 246, 0.8) 30%, rgba(236, 72, 153, 0.6) 60%, rgba(59, 130, 246, 0.4) 80%, transparent 100%)',
    burst: 'radial-gradient(circle, rgba(236, 72, 153, 0.9) 0%, rgba(139, 92, 246, 0.7) 40%, rgba(99, 102, 241, 0.5) 70%, transparent 90%)'
  };

  // Generate unique ID for particles
  const generateId = useCallback(() => {
    return `flame-${++particleIdRef.current}`;
  }, []);

  // Smooth velocity calculation with history
  const calculateVelocity = useCallback((current: MousePosition, previous: MousePosition, deltaTime: number) => {
    if (deltaTime === 0) return { vx: 0, vy: 0, speed: 0 };
    
    const vx = (current.x - previous.x) / deltaTime;
    const vy = (current.y - previous.y) / deltaTime;
    const speed = Math.sqrt(vx * vx + vy * vy);
    
    // Smooth velocity with history
    velocityHistory.current.push(speed);
    if (velocityHistory.current.length > 10) {
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
        setCursorText('IGNITE');
      } else if (target.tagName === 'A') {
        setCursorText('EXPLORE');
      } else if (target.hasAttribute('data-cursor')) {
        setCursorText(target.getAttribute('data-cursor') || '');
      } else {
        setCursorText('FLAME');
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
      };
      
      setClickBursts(prev => [...prev, newBurst]);
      
      // Create explosive flame burst particles
      const burstParticles: FlameParticle[] = [];
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const speed = 80 + Math.random() * 60;
        const layer = Math.floor(Math.random() * 3);
        
        burstParticles.push({
          id: generateId(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 20,
          vy: Math.sin(angle) * speed - Math.random() * 30,
          life: 1,
          maxLife: 1,
          size: 6 + Math.random() * 12,
          opacity: 0.8 + Math.random() * 0.2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 200,
          gradient: flameGradients.burst,
          type: 'spark',
          layer,
          scale: 1
        });
      }
      
      setFlameParticles(prev => [...prev, ...burstParticles]);
      
      setTimeout(() => {
        setClickBursts(prev => prev.filter(burst => burst.id !== newBurst.id));
      }, 1000);
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

  // Enhanced flame particle system
  useEffect(() => {
    if (!isVisible) return;

    let lastParticleTime = 0;
    const particleInterval = 25; // Generate particles frequently for rich flames

    const animate = () => {
      const now = performance.now();
      const deltaTime = Math.min((now - lastUpdateTime.current) / 1000, 0.016);
      
      setFlameParticles(prev => {
        let newParticles = [...prev];
        
        // Generate flame particles based on movement
        if (now - lastParticleTime > particleInterval) {
          
          // Core flame particles - always generate
          if (Math.random() < 0.9) {
            const layer = 2; // Core flames on top layer
            const offsetX = (Math.random() - 0.5) * 12;
            const offsetY = (Math.random() - 0.5) * 12;
            
            newParticles.push({
              id: generateId(),
              x: mousePosition.x + offsetX,
              y: mousePosition.y + offsetY,
              vx: (Math.random() - 0.5) * 15 - velocity.vx * 0.1,
              vy: -20 - Math.random() * 30 - velocity.vy * 0.1,
              life: 1,
              maxLife: 1,
              size: 8 + Math.random() * 6 + (isHovering ? 4 : 0),
              opacity: 0.7 + Math.random() * 0.3,
              rotation: Math.random() * 360,
              rotationSpeed: (Math.random() - 0.5) * 120,
              gradient: isHovering ? flameGradients.hover : flameGradients.core,
              type: 'core',
              layer,
              scale: 1
            });
          }
          
          // Main flame body
          if (Math.random() < 0.8) {
            const layer = 1;
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 8;
            
            newParticles.push({
              id: generateId(),
              x: mousePosition.x + offsetX,
              y: mousePosition.y + offsetY,
              vx: (Math.random() - 0.5) * 20 - velocity.vx * 0.15,
              vy: -15 - Math.random() * 25 - velocity.vy * 0.15,
              life: 1,
              maxLife: 1,
              size: 10 + Math.random() * 8 + velocity.speed * 0.05,
              opacity: 0.6 + Math.random() * 0.3,
              rotation: Math.random() * 360,
              rotationSpeed: (Math.random() - 0.5) * 100,
              gradient: flameGradients.flame,
              type: 'flame',
              layer,
              scale: 1
            });
          }
          
          // Ember particles for detail
          if (Math.random() < 0.6) {
            const layer = 0;
            const offsetX = (Math.random() - 0.5) * 25;
            const offsetY = (Math.random() - 0.5) * 15;
            
            newParticles.push({
              id: generateId(),
              x: mousePosition.x + offsetX,
              y: mousePosition.y + offsetY,
              vx: (Math.random() - 0.5) * 25 - velocity.vx * 0.2,
              vy: -10 - Math.random() * 20 - velocity.vy * 0.2,
              life: 1,
              maxLife: 1,
              size: 4 + Math.random() * 6,
              opacity: 0.5 + Math.random() * 0.4,
              rotation: Math.random() * 360,
              rotationSpeed: (Math.random() - 0.5) * 150,
              gradient: flameGradients.ember,
              type: 'ember',
              layer,
              scale: 1
            });
          }
          
          // High-velocity sparks
          if (velocity.speed > 30 && Math.random() < 0.7) {
            const layer = Math.floor(Math.random() * 3);
            newParticles.push({
              id: generateId(),
              x: mousePosition.x + (Math.random() - 0.5) * 8,
              y: mousePosition.y + (Math.random() - 0.5) * 8,
              vx: (Math.random() - 0.5) * 40 - velocity.vx * 0.3,
              vy: -25 - Math.random() * 35 - velocity.vy * 0.3,
              life: 1,
              maxLife: 1,
              size: 3 + Math.random() * 5 + velocity.speed * 0.08,
              opacity: 0.8 + Math.random() * 0.2,
              rotation: Math.random() * 360,
              rotationSpeed: (Math.random() - 0.5) * 180,
              gradient: flameGradients.spark,
              type: 'spark',
              layer,
              scale: 1
            });
          }
          
          lastParticleTime = now;
        }
        
        // Update and filter particles with flame physics
        return newParticles
          .map(particle => {
            const ageRatio = 1 - (particle.life / particle.maxLife);
            const drag = 0.98;
            const turbulence = (Math.sin(now * 0.001 + particle.id.length) * 0.5 + 0.5) * 5;
            
            return {
              ...particle,
              x: particle.x + particle.vx * deltaTime + turbulence * deltaTime,
              y: particle.y + particle.vy * deltaTime,
              vx: particle.vx * drag + (Math.random() - 0.5) * 8 * deltaTime,
              vy: particle.vy * drag - 20 * deltaTime, // Upward buoyancy
              life: particle.life - deltaTime / (
                particle.type === 'spark' ? 1.2 :
                particle.type === 'core' ? 1.8 :
                particle.type === 'flame' ? 2.2 : 2.8
              ),
              rotation: particle.rotation + particle.rotationSpeed * deltaTime,
              opacity: particle.opacity * (particle.life / particle.maxLife) * 
                      (particle.type === 'ember' ? 0.7 : 1),
              scale: particle.scale * (1 + ageRatio * 0.3), // Flames grow as they rise
              size: particle.size * (1 + ageRatio * 0.2)
            };
          })
          .filter(particle => particle.life > 0 && particle.opacity > 0.02)
          .slice(0, 120); // Higher particle limit for rich flame effect
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
  const sortedParticles = [...flameParticles].sort((a, b) => a.layer - b.layer);

  return (
    <>
      {/* Main cursor core */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-8px',
          translateY: '-8px',
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isHovering ? 1.6 : 1,
          }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 400,
              damping: 25,
            }
          }}
        >
          {/* Core flame cursor */}
          <div
            className="w-4 h-4 rounded-full"
            style={{
              background: isHovering ? flameGradients.hover : flameGradients.core,
              filter: 'blur(0.2px)',
              boxShadow: isHovering 
                ? '0 0 25px rgba(99, 102, 241, 0.8), 0 0 50px rgba(139, 92, 246, 0.6)' 
                : '0 0 20px rgba(99, 102, 241, 0.6)',
            }}
          />
          
          {/* Inner glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [0.8, 1.3, 0.8],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: flameGradients.spark,
              filter: 'blur(1px)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Flame particles with layered rendering */}
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
              rotate: particle.rotation - 45,
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
              y: particle.y - 30,
            }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: "easeOut",
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size * (particle.type === 'flame' ? 1.4 : 1)}px`,
              background: particle.gradient,
              borderRadius: particle.type === 'flame' ? '50% 50% 50% 50% / 60% 60% 40% 40%' : '50%',
              filter: `blur(${
                particle.type === 'ember' ? '1.5px' : 
                particle.type === 'core' ? '0.3px' : 
                '0.8px'
              })`,
              mixBlendMode: particle.type === 'spark' ? 'screen' : 'normal',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Click flame bursts */}
      <AnimatePresence>
        {clickBursts.map((burst) => (
          <motion.div
            key={burst.id}
            className="fixed pointer-events-none z-[9995]"
            initial={{
              x: burst.x - 30,
              y: burst.y - 30,
              width: 60,
              height: 60,
              opacity: 0.9,
              scale: 0,
            }}
            animate={{
              scale: 4,
              opacity: 0,
              rotate: 180,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            style={{
              background: flameGradients.burst,
              borderRadius: '50%',
              filter: 'blur(2px)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Cursor label with flame styling */}
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
            <div
              className="px-3 py-1 rounded-md text-xs font-semibold text-white uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(139, 92, 246, 0.9) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3), 0 0 20px rgba(139, 92, 246, 0.2)',
              }}
            >
              {cursorText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* High-velocity flame trail */}
      {velocity.speed > 100 && (
        <motion.div
          className="fixed pointer-events-none z-[9992]"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-40px',
            translateY: '-60px',
          }}
        >
          <motion.div
            className="w-20 h-32 rounded-full"
            animate={{
              scaleY: [0.8, 1.4, 0.8],
              scaleX: [1, 0.6, 1],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: flameGradients.flame,
              filter: 'blur(3px)',
              borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%',
            }}
          />
        </motion.div>
      )}
    </>
  );
}