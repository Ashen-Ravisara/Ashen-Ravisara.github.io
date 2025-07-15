"use client";

import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MagneticTarget {
  element: HTMLElement;
  rect: DOMRect;
  magnetism: number;
  color: string;
}

export function MagneticLiquidCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Enhanced spring for liquid feel
  const liquidSpring = { damping: 20, stiffness: 300, mass: 0.8 };
  const smoothX = useSpring(cursorX, liquidSpring);
  const smoothY = useSpring(cursorY, liquidSpring);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<MagneticTarget | null>(null);
  const [velocity, setVelocity] = useState({ x: 0, y: 0, speed: 0 });
  
  const lastPosition = useRef<MousePosition>({ x: 0, y: 0 });
  const lastTime = useRef<number>(0);

  // Liquid deformation based on velocity
  const scaleX = useTransform(smoothX, (x) => {
    const stretch = Math.min(velocity.speed * 0.002, 0.3);
    return 1 + stretch;
  });
  
  const scaleY = useTransform(smoothY, (y) => {
    const stretch = Math.min(velocity.speed * 0.002, 0.3);
    return 1 - stretch * 0.5;
  });

  // Color transitions
  const cursorColor = currentTarget?.color || '#6366F1';

  const findMagneticTargets = useCallback((): MagneticTarget[] => {
    const elements = document.querySelectorAll('button, a, [data-magnetic]');
    return Array.from(elements).map((el) => ({
      element: el as HTMLElement,
      rect: el.getBoundingClientRect(),
      magnetism: parseFloat(el.getAttribute('data-magnetism') || '80'),
      color: el.getAttribute('data-cursor-color') || '#8B5CF6'
    }));
  }, []);

  const calculateMagneticPull = useCallback((mousePos: MousePosition) => {
    const targets = findMagneticTargets();
    let closestTarget: MagneticTarget | null = null;
    let minDistance = Infinity;

    for (const target of targets) {
      const centerX = target.rect.left + target.rect.width / 2;
      const centerY = target.rect.top + target.rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mousePos.x - centerX, 2) + Math.pow(mousePos.y - centerY, 2)
      );

      if (distance < target.magnetism && distance < minDistance) {
        minDistance = distance;
        closestTarget = target;
      }
    }

    return closestTarget;
  }, [findMagneticTargets]);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      
      // Calculate velocity
      const now = performance.now();
      const deltaTime = (now - lastTime.current) / 1000;
      
      if (deltaTime > 0) {
        const vx = (newPos.x - lastPosition.current.x) / deltaTime;
        const vy = (newPos.y - lastPosition.current.y) / deltaTime;
        const speed = Math.sqrt(vx * vx + vy * vy);
        setVelocity({ x: vx, y: vy, speed });
      }

      // Check for magnetic targets
      const target = calculateMagneticPull(newPos);
      setCurrentTarget(target);
      setIsHovering(!!target);

      // Apply magnetic pull
      if (target) {
        const centerX = target.rect.left + target.rect.width / 2;
        const centerY = target.rect.top + target.rect.height / 2;
        const pullStrength = 0.3;
        
        cursorX.set(newPos.x + (centerX - newPos.x) * pullStrength);
        cursorY.set(newPos.y + (centerY - newPos.y) * pullStrength);
      } else {
        cursorX.set(newPos.x);
        cursorY.set(newPos.y);
      }

      lastPosition.current = newPos;
      lastTime.current = now;
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, calculateMagneticPull]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main liquid cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-16px',
          translateY: '-16px',
          scaleX,
          scaleY,
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full"
          animate={{
            scale: isHovering ? 1.5 : 1,
            backgroundColor: cursorColor,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            backgroundColor: { duration: 0.3 }
          }}
          style={{
            background: `radial-gradient(circle, ${cursorColor}E6 0%, ${cursorColor}80 70%, transparent 100%)`,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 20px ${cursorColor}60`,
          }}
        />
        
        {/* Liquid blob effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle, ${cursorColor}40 0%, transparent 70%)`,
            filter: 'blur(1px)',
          }}
        />
      </motion.div>

      {/* Magnetic field visualization */}
      {isHovering && currentTarget && (
        <motion.div
          className="fixed pointer-events-none z-[9998]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            left: currentTarget.rect.left + currentTarget.rect.width / 2 - 40,
            top: currentTarget.rect.top + currentTarget.rect.height / 2 - 40,
          }}
        >
          <motion.div
            className="w-20 h-20 rounded-full border"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              borderColor: `${cursorColor}40`,
              background: `radial-gradient(circle, ${cursorColor}10 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      )}

      {/* Velocity trails */}
      {velocity.speed > 100 && (
        <motion.div
          className="fixed pointer-events-none z-[9997]"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-30px',
            translateY: '-30px',
          }}
        >
          <motion.div
            className="w-15 h-15 rounded-full"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: `radial-gradient(circle, ${cursorColor}30 0%, transparent 70%)`,
              filter: 'blur(2px)',
            }}
          />
        </motion.div>
      )}
    </>
  );
}