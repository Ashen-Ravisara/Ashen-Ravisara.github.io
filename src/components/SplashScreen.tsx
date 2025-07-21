"use client";

import { easeInOut, motion, spring, type Easing } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");

  useEffect(() => {
    // Smooth progress animation with variable speed
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }

        // Variable speed - slower at start and end, faster in middle
        let increment = 1;
        if (prev < 20) increment = 0.8; // Slower start
        else if (prev < 40) increment = 1.5; // Speed up
        else if (prev < 60) increment = 2; // Fastest
        else if (prev < 80) increment = 1.2; // Slow down
        else increment = 0.6; // Very slow finish

        return Math.min(prev + increment, 100);
      });
    }, 35);

    // Dynamic loading text
    const textStates = [
      { text: "Initializing", time: 500 },
      { text: "Loading Assets", time: 1200 },
      { text: "Preparing Experience", time: 2000 },
      { text: "Almost Ready", time: 2500 },
    ];

    textStates.forEach(({ text, time }) => {
      setTimeout(() => setLoadingText(text), time);
    });

    // Complete splash screen with smooth exit
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  // Enhanced easing curves
  const smoothEase: Easing = [0.25, 0.1, 0.25, 1];
  const elegantEase: Easing = [0.4, 0, 0.2, 1];

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: easeInOut,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      y: -20,
      transition: {
        duration: 0.8,
        ease: easeInOut,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.7,
      rotateX: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: spring,
        stiffness: 80,
        damping: 25,
        mass: 1.2,
        duration: 1.5,
      },
    },
  };

  const loadingVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: spring,
        stiffness: 100,
        damping: 20,
        delay: 0.6,
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "exit"}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
      data-animate="true"
    >
      {/* Enhanced background with smoother animations */}
      <div className="background-texture" />

      {/* Smoother atmospheric effects */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 via-transparent to-purple-500/10" />
          <motion.div
            className="absolute top-1/4 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-blue-500/15 via-transparent to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/4 w-2/3 h-2/3 bg-gradient-to-tr from-indigo-500/15 via-transparent to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </motion.div>

        {/* Smoother floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/40 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                opacity: 0,
              }}
              animate={{
                y: [null, -120],
                opacity: [0, 0.8, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: smoothEase,
              }}
            />
          ))}
        </div>

        {/* Enhanced atmospheric glows */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      <div className="text-center relative z-10">
        {/* Enhanced title with smoother animation */}
        <motion.div variants={titleVariants}>
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tighter mb-20 text-accent-gradient"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.03,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.4
              }
            }}
          >
            Ashen Ravisara
          </motion.h1>
        </motion.div>

        {/* Smoother loading animation */}
        <motion.div
          variants={loadingVariants}
          className="flex flex-col items-center space-y-12"
        >
          {/* Enhanced animated dots */}
          <div className="flex items-center space-x-4">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="relative"
              >
                <motion.div
                  className="w-4 h-4 bg-accent-gradient-radial rounded-full"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: smoothEase,
                  }}
                />
                <motion.div
                  className="absolute inset-0 w-4 h-4 bg-accent/30 rounded-full blur-sm"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: smoothEase,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Smoother progress bar */}
          <div className="w-96 h-2 bg-muted/30 relative overflow-hidden rounded-full border border-border/10 shadow-inner">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full shadow-lg"
              style={{
                background: "linear-gradient(90deg, #6366f1, #8b5cf6, #3b82f6, #6366f1)",
                backgroundSize: "200% 100%",
              }}
              initial={{ width: "0%" }}
              animate={{
                width: `${progress}%`,
                backgroundPosition: ["0% 50%", "200% 50%"],
              }}
              transition={{
                width: {
                  duration: 0.3,
                  ease: smoothEase
                },
                backgroundPosition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }
              }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
              animate={{
                x: ["-100%", "400%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: elegantEase,
              }}
              style={{ width: "30%" }}
            />
          </div>

          {/* Smoother loading text */}
          <motion.div className="h-8 flex items-center justify-center">
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{
                duration: 0.6,
                ease: elegantEase,
              }}
              className="text-sm text-muted-foreground tracking-widest uppercase"
            >
              <span className="text-accent-gradient font-medium">
                {loadingText}
              </span>
            </motion.p>
          </motion.div>

          {/* Progress percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-xs text-muted-foreground/60 tracking-wider"
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>

        {/* Smoother background decorative elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            rotate: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent-gradient-radial rounded-full opacity-40"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            rotate: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }
          }}
          className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-accent-gradient-sunset rounded-full opacity-30"
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/5 w-2 h-2 bg-accent-gradient-warm rounded-full"
        />

        <motion.div
          animate={{
            x: [-8, 8, -8],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-accent-gradient-secondary rounded-full opacity-40"
        />
      </div>
    </motion.div>
  );
}