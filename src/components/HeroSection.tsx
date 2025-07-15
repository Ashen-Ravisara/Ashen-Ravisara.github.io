"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Enhanced spring physics for ultra-smooth movement
  const springX = useSpring(x, { stiffness: 80, damping: 25, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 80, damping: 25, mass: 0.5 });

  const rotateX = useTransform(springY, [-300, 300], [8, -8]);
  const rotateY = useTransform(springX, [-300, 300], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('hero')?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  // Enhanced letter-by-letter animation for "Ashen Ravisara"
  const name = "Ashen Ravisara";
  const nameVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 1.4,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.7,
      rotateX: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        mass: 0.8,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 1,
      },
    },
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100"
      data-animate="true"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="text-center z-10 perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hello */}
        <motion.div
          variants={textVariants}
          className="mb-6"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-light text-gray-600"
            whileHover={{ 
              scale: 1.05, 
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                duration: 0.6 
              }
            }}
          >
            <motion.span
              className="text-accent-gradient animate-gradient-shift"
              whileHover={{
                filter: "brightness(1.3) saturate(1.2)",
                transition: { duration: 0.4 }
              }}
            >
              Hello
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* I'm Ashen Ravisara */}
        <motion.div
          variants={textVariants}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-8xl font-bold leading-none">
            <span className="text-gray-700">I'm </span>
            <motion.span
              variants={nameVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {name.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block text-accent-gradient-sunset animate-gradient-shift"
                  whileHover={{ 
                    scale: 1.15,
                    y: -8,
                    rotateZ: 5,
                    filter: "brightness(1.4) saturate(1.3)",
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 12,
                      duration: 0.4 
                    }
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 2.6, 
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.8 
              }}
              className="text-accent-gradient"
            >
              ,
            </motion.span>
          </h1>
        </motion.div>

        {/* UI/UX Designer */}
        <motion.div
          variants={textVariants}
          className="mb-16"
        >
          <motion.h3 
            className="text-3xl md:text-5xl font-medium text-gray-800"
            whileHover={{ 
              scale: 1.08,
              transition: { 
                type: "spring", 
                stiffness: 250, 
                damping: 18,
                duration: 0.6 
              }
            }}
          >
            <span className="text-accent-gradient animate-gradient-pulse">
              UI/UX Designer
            </span>
          </motion.h3>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={textVariants}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          whileHover={{
            scale: 1.02,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.4 
            }
          }}
        >
          Crafting immersive digital experiences that push the boundaries of design and technology. 
          Where creativity meets precision, and <span className="text-accent-gradient">innovation takes form</span>.
        </motion.p>
      </motion.div>

      {/* Enhanced floating geometric elements with gradients */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: {
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent-gradient-radial rounded-full opacity-60 animate-gentle-glow glow-accent-gradient"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.3, 1],
        }}
        transition={{
          rotate: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }
        }}
        className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-accent-gradient-sunset rounded-full opacity-40 animate-gentle-glow glow-accent-gradient"
      />

      {/* Additional floating elements with gradients */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent-gradient-warm rounded-full opacity-50 glow-accent-gradient"
      />

      <motion.div
        animate={{
          x: [-5, 5, -5],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent-gradient-secondary rounded-full opacity-60 glow-accent-gradient"
      />

      {/* Scroll indicator with gradient */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 4,
          type: "spring",
          stiffness: 120,
          damping: 20,
          duration: 1 
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [-5, 15, -5] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-px h-20 bg-accent-gradient animate-gradient-shift"
        />
        <motion.p 
          className="text-xs text-gray-600 mt-6 tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
        >
          <span className="text-accent-gradient">SCROLL</span>
        </motion.p>
      </motion.div>

      {/* Enhanced background with gradient accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white opacity-90"
          animate={{
            background: [
              "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 50%, #FFFFFF 100%)",
              "linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 50%, #F9FAFB 100%)",
              "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 50%, #FFFFFF 100%)",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 opacity-30"
          style={{ background: 'var(--accent-gradient-glow)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 opacity-30"
          style={{ background: 'var(--accent-gradient-glow)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] opacity-5"
          style={{ background: 'var(--accent-gradient-radial)' }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
}