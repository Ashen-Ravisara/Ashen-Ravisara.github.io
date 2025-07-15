import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ScrollingRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const ribbonText = [
    "LET'S CREATE TOGETHER",
    "INNOVATIVE DESIGN",
    "USER EXPERIENCE",
    "DIGITAL SOLUTIONS",
    "CREATIVE VISION",
    "MODERN AESTHETICS"
  ];

  const ribbonTextReverse = [
    "ASHEN RAVISARA",
    "UI/UX DESIGNER",
    "FREELANCER",
    "PORTFOLIO 2024",
    "DESIGN EXCELLENCE",
    "CREATIVE SOLUTIONS"
  ];

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full py-20 overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50"
      style={{ opacity, scale }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#6366f1_1px,transparent_1px),linear-gradient(-45deg,#6366f1_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* First Ribbon - Moving Left */}
      <motion.div 
        className="flex items-center gap-8 mb-8 whitespace-nowrap"
        style={{ x: x1 }}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex items-center gap-8">
            {ribbonText.map((text, index) => (
              <div key={`${i}-${index}`} className="flex items-center gap-8">
                <motion.span 
                  className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-gray-900 to-accent tracking-wider"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {text}
                </motion.span>
                <motion.div 
                  className="w-4 h-4 bg-accent rounded-full flex-shrink-0"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Second Ribbon - Moving Right */}
      <motion.div 
        className="flex items-center gap-8 whitespace-nowrap"
        style={{ x: x2 }}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex items-center gap-8">
            {ribbonTextReverse.map((text, index) => (
              <div key={`${i}-${index}`} className="flex items-center gap-8">
                <motion.div 
                  className="w-3 h-3 bg-gradient-to-r from-accent to-purple-500 rounded-full flex-shrink-0"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
                <motion.span 
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800/80 tracking-wide"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {text}
                </motion.span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Bottom Border */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
        animate={{
          opacity: [0.5, 1, 0.5],
          scaleX: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}