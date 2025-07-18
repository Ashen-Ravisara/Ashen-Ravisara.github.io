"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    id: 1,
    title: "Bloo Tour & Tourism",
    subtitle: "All rights reserved by LumetriX Solutions (Pvt.)Ltd",
    category: "Landing Pages",
    year: "2025",
    image: "/public/Images/blootuor.png",
    color: "#FF6B35",
    description: "Bloo Tour & Tourism is a responsive website that showcases Sri Lanka’s attractions with easy navigation and essential travel info.",
  },
  {
    id: 2,
    title: "LumetriX Solution Landing page",
    subtitle: "Tool : Figma Make (AI-powered design)",
    category: "Landing Pages",
    year: "2025",
    image: "/public/Images/LumetrX.png",
    color: "#8b5cf6",
    description: "LumetriX Solutions is a modern portfolio website showcasing IT services with a clean, responsive design built using Figma Make.",
  },
  {
    id: 3,
    title: "Artigala Ayurveda",
    subtitle: "All rights reserved by LumetriX Solutions (Pvt.)Ltd",
    category: "Web Applications",
    year: "2025",
    image: "/public/Images/ArtigalaAyurvedaCover.png",
    color: "#60BB01",
    description: "Artigala Ayurveda is a nature-inspired e-commerce website for Ayurvedic products, offering easy browsing, detailed info, and a smooth shopping experience.",
  },
  {
    id: 4,
    title: "Recruitment Agency Web Application",
    subtitle: "All rights reserved by Syntax Erreur (Pvt.)Ltd",
    category: "Web Applications",
    year: "2025",
    image: "/public/Images/RecruitmentCover.png",
    color: "#294BFF",
    description: "Recruitment Agency Web App is a dual-portal platform for agencies and companies, featuring AI-generated job descriptions and built-in chat. It offers a clean, intuitive interface for a smooth and efficient hiring process.",
  }
];

// Additional projects for "See More" functionality
const additionalProjects = [
  {
    id: 5,
    title: "Infinity Day Planner Web Application",
    subtitle: "All rights reserved by Codelantic (Pvt.)Ltd",
    category: "Web Applications",
    year: "2025",
    image: "/public/Images/IDPcover.png",
    color: "#01375B",
    description: "IDP is a smart day planner for a Swaziland client featuring Manager and Staff portals for streamlined scheduling, work orders, route planning, and more.",
  },
  {
    id: 6,
    title: "EBOS Web Application",
    subtitle: "All rights reserved by Codelantic (Pvt.)Ltd",
    category: "Web Applications",
    year: "2025",
    image: "/public/Images/EBOScover.png",
    color: "#5F9D9F",
    description: "Ebos is a multi-industry management platform with Super Admin, Manager, and Staff portals, built to streamline operations and boost team collaboration for a UK-based client.",
  }
];

// Always use the full array for consistent hook calls
const allProjectsData = [...projects, ...additionalProjects];

interface FeaturedProjectsProps {
  onNavigateToAllProjects?: () => void;
  onExploreProject?: (project: any) => void;
}

export function FeaturedProjects({ onNavigateToAllProjects, onExploreProject }: FeaturedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Pre-calculate all transforms at the top level for consistent hook calls
  const project0Transforms = {
    translateX: useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [-100, 0, 0, 50]),
    translateY: useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [100, 0, 0, -50]),
    rotateZ: useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [-8, 0, 0, -2.4]),
    scale: useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.95]),
    opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.7])
  };

  const project1Transforms = {
    translateX: useTransform(scrollYProgress, [0.167, 0.317, 1.017, 1.167], [100, 0, 0, -50]),
    translateY: useTransform(scrollYProgress, [0.167, 0.317, 1.017, 1.167], [100, 0, 0, -50]),
    rotateZ: useTransform(scrollYProgress, [0.167, 0.317, 1.017, 1.167], [8, 0, 0, 2.4]),
    scale: useTransform(scrollYProgress, [0.167, 0.317, 1.017, 1.167], [0.8, 1, 1, 0.95]),
    opacity: useTransform(scrollYProgress, [0.167, 0.267, 1.067, 1.167], [0, 1, 1, 0.7])
  };

  const project2Transforms = {
    translateX: useTransform(scrollYProgress, [0.333, 0.483, 1.183, 1.333], [-100, 0, 0, 50]),
    translateY: useTransform(scrollYProgress, [0.333, 0.483, 1.183, 1.333], [100, 0, 0, -50]),
    rotateZ: useTransform(scrollYProgress, [0.333, 0.483, 1.183, 1.333], [-8, 0, 0, -2.4]),
    scale: useTransform(scrollYProgress, [0.333, 0.483, 1.183, 1.333], [0.8, 1, 1, 0.95]),
    opacity: useTransform(scrollYProgress, [0.333, 0.433, 1.233, 1.333], [0, 1, 1, 0.7])
  };

  const project3Transforms = {
    translateX: useTransform(scrollYProgress, [0.5, 0.65, 1.35, 1.5], [100, 0, 0, -50]),
    translateY: useTransform(scrollYProgress, [0.5, 0.65, 1.35, 1.5], [100, 0, 0, -50]),
    rotateZ: useTransform(scrollYProgress, [0.5, 0.65, 1.35, 1.5], [8, 0, 0, 2.4]),
    scale: useTransform(scrollYProgress, [0.5, 0.65, 1.35, 1.5], [0.8, 1, 1, 0.95]),
    opacity: useTransform(scrollYProgress, [0.5, 0.6, 1.4, 1.5], [0, 1, 1, 0.7])
  };

  const project4Transforms = {
    translateX: useTransform(scrollYProgress, [0.667, 0.817, 1.517, 1.667], [-100, 0, 0, 50]),
    translateY: useTransform(scrollYProgress, [0.667, 0.817, 1.517, 1.667], [100, 0, 0, -50]),
    rotateZ: useTransform(scrollYProgress, [0.667, 0.817, 1.517, 1.667], [-8, 0, 0, -2.4]),
    scale: useTransform(scrollYProgress, [0.667, 0.817, 1.517, 1.667], [0.8, 1, 1, 0.95]),
    opacity: useTransform(scrollYProgress, [0.667, 0.767, 1.567, 1.667], [0, 1, 1, 0.7])
  };

  const project5Transforms = {
    translateX: useTransform(scrollYProgress, [0.833, 0.983, 1.683, 1.833], [100, 0, 0, -50]),
    translateY: useTransform(scrollYProgress, [0.833, 0.983, 1.683, 1.833], [100, 0, 0, -50]),
    rotateZ: useTransform(scrollYProgress, [0.833, 0.983, 1.683, 1.833], [8, 0, 0, 2.4]),
    scale: useTransform(scrollYProgress, [0.833, 0.983, 1.683, 1.833], [0.8, 1, 1, 0.95]),
    opacity: useTransform(scrollYProgress, [0.833, 0.933, 1.733, 1.833], [0, 1, 1, 0.7])
  };

  // Array of all transforms for easy access
  const allTransforms = [
    project0Transforms,
    project1Transforms,
    project2Transforms,
    project3Transforms,
    project4Transforms,
    project5Transforms
  ];

  // Projects to display based on state
  const displayProjects = useMemo(() => {
    return showMore ? allProjectsData : projects;
  }, [showMore]);

  const handleSeeMore = () => {
    setShowMore(true);
  };

  const handleSeeAll = () => {
    if (onNavigateToAllProjects) {
      onNavigateToAllProjects();
    }
  };

  const handleExploreProject = (project: any) => {
    if (onExploreProject) {
      onExploreProject(project);
    }
  };

  // Custom image component for tourism images
  const TourismImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    if (typeof src === 'string' && src.startsWith('figma:asset')) {
      return (
        <div
          className={`bg-center bg-cover bg-no-repeat ${className}`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      );
    }
    return <ImageWithFallback src={src} alt={alt} className={className} />;
  };

  return (
    <section className="relative bg-white min-h-screen">
      {/* Section Header */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.span 
            className="text-sm tracking-widest text-accent-gradient uppercase mb-4 block animate-gradient-shift"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured Work
          </motion.span>
          <motion.h2 
            className="text-accent-gradient-sunset animate-gradient-pulse"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Selected Projects
          </motion.h2>
        </motion.div>
      </div>

      {/* Projects Container */}
      <div ref={containerRef} className="relative">
        {displayProjects.map((project, displayIndex) => {
          // Find the original index in the full array for consistent transforms
          const originalIndex = allProjectsData.findIndex(p => p.id === project.id);
          const transforms = allTransforms[originalIndex];
          const isEven = originalIndex % 2 === 0;
          
          return (
            <motion.div
              key={project.id}
              style={{
                translateX: transforms.translateX,
                translateY: transforms.translateY,
                rotateZ: transforms.rotateZ,
                scale: transforms.scale,
                opacity: transforms.opacity,
                transformStyle: "preserve-3d",
                zIndex: displayProjects.length - displayIndex
              }}
              className="sticky top-0 h-screen w-full flex items-center justify-center p-6"
              initial={displayIndex >= 4 ? { opacity: 0, y: 100 } : {}}
              animate={displayIndex >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={displayIndex >= 4 ? { duration: 0.8, delay: (displayIndex - 4) * 0.2 } : {}}
            >
              {/* Project Card */}
              <motion.div
                className="relative w-full max-w-7xl mx-auto"
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: isEven ? 2 : -2,
                  transition: { type: "spring", stiffness: 300, damping: 30 }
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div 
                  className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200 shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}08, rgba(255, 255, 255, 0.95))`,
                    boxShadow: `0 25px 50px -12px ${project.color}20, 0 0 0 1px ${project.color}10`
                  }}
                >
                  <div className="relative z-10 h-full flex items-center justify-center px-8 md:px-16 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
                      {/* Project Content */}
                      <motion.div
                        className={`lg:col-span-6 space-y-8 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <div className="space-y-6">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                          >
                            <span 
                              className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase border backdrop-blur-sm"
                              style={{
                                background: `${project.color}15`,
                                color: project.color,
                                borderColor: `${project.color}30`
                              }}
                            >
                              {project.category}
                            </span>
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                              {project.title}
                            </h3>
                            <p className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
                              {project.subtitle}
                            </p>
                          </motion.div>
                          
                          <motion.p 
                            className="text-lg text-gray-600 leading-relaxed max-w-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                          >
                            {project.description}
                          </motion.p>
                        </div>

                        <motion.div 
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        >
                          <div className="flex items-center gap-4">
                            <span className="px-4 py-2 bg-gray-100 backdrop-blur-sm rounded-full text-sm font-medium border border-gray-200 text-gray-700">
                              {project.year}
                            </span>
                            <div 
                              className="w-4 h-4 rounded-full glow-accent-gradient"
                              style={{ backgroundColor: project.color }}
                            />
                          </div>
                          
                          <motion.button
                            onClick={() => handleExploreProject(project)}
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group inline-flex items-center gap-3 px-8 py-4 backdrop-blur-sm rounded-full transition-all duration-500 border-2"
                            style={{
                              background: `${project.color}20`,
                              borderColor: `${project.color}40`,
                              color: project.color
                            }}
                            data-cursor="VIEW"
                          >
                            <span className="font-medium">Explore Project</span>
                            <motion.svg 
                              width="20" 
                              height="20" 
                              viewBox="0 0 16 16" 
                              fill="none"
                              className="transition-transform duration-300"
                              whileHover={{ x: 3 }}
                            >
                              <path 
                                d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" 
                                fill="currentColor"
                              />
                            </motion.svg>
                          </motion.button>
                        </motion.div>
                      </motion.div>

                      {/* Project Visual */}
                      <motion.div
                        className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <motion.div
                          whileHover={{ 
                            scale: 1.05, 
                            rotateY: isEven ? 5 : -5,
                            rotateX: 2
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="relative group cursor-pointer"
                          style={{ transformStyle: "preserve-3d" }}
                          onClick={() => handleExploreProject(project)}
                        >
                          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            <TourismImage
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
                            <div 
                              className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                              style={{ 
                                background: `linear-gradient(135deg, ${project.color}40, transparent)` 
                              }}
                            />
                            
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <motion.div
                                className="px-6 py-3 bg-gray-900/90 backdrop-blur-sm rounded-full text-white font-medium"
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                View Project
                              </motion.div>
                            </div>
                          </div>
                          
                          {/* 3D Floating Elements */}
                          <motion.div
                            animate={{
                              y: [0, -15, 0],
                              rotateZ: [0, 10, 0],
                            }}
                            transition={{
                              duration: 6,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute -top-6 -right-6 w-12 h-12 rounded-full opacity-60 blur-sm glow-accent-gradient"
                            style={{ backgroundColor: project.color }}
                          />
                          <motion.div
                            animate={{
                              y: [0, 12, 0],
                              rotateZ: [0, -8, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 1
                            }}
                            className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full opacity-40 blur-sm"
                            style={{ background: 'var(--accent-gradient-radial)' }}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: `radial-gradient(circle at 25% 75%, ${project.color} 0%, transparent 50%), radial-gradient(circle at 75% 25%, ${project.color} 0%, transparent 50%)`
                      }}
                    />
                  </div>
                </div>

                {/* Project Number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -top-4 -left-4 text-8xl md:text-9xl font-black pointer-events-none"
                  style={{ 
                    background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: `0 0 20px ${project.color}30`,
                    filter: 'blur(0.5px)'
                  }}
                >
                  {String(displayIndex + 1).padStart(2, '0')}
                </motion.div>

                {/* See More Button - Only show after 4th project */}
                {displayIndex === 3 && !showMore && (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 pointer-events-auto z-30"
                  >
                    <motion.button
                      onClick={handleSeeMore}
                      whileHover={{ 
                        scale: 1.1,
                        y: -5,
                        transition: { 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 20 
                        }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative inline-flex items-center gap-4 px-12 py-6 bg-accent-gradient rounded-full text-black font-bold text-lg shadow-2xl backdrop-blur-sm border-2 border-accent/30 overflow-hidden"
                      data-cursor="CLICK"
                    >
                      <motion.div
                        className="absolute inset-0 bg-accent-gradient-sunset opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{ backgroundSize: '200% 200%' }}
                      />
                      
                      <span className="relative z-10">See More Projects</span>
                      
                      <motion.div
                        className="relative z-10 flex items-center justify-center w-8 h-8 bg-black/20 rounded-full"
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none"
                        >
                          <path 
                            d="M8 0V16M0 8H16" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </motion.div>
                    </motion.button>
                  </motion.div>
                )}

                {/* See All Button - Only show after 6th project */}
                {displayIndex === displayProjects.length - 1 && showMore && (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 pointer-events-auto z-30"
                  >
                    <motion.button
                      onClick={handleSeeAll}
                      whileHover={{ 
                        scale: 1.1,
                        y: -5,
                        transition: { 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 20 
                        }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative inline-flex items-center gap-4 px-12 py-6 bg-accent-gradient rounded-full text-black font-bold text-lg shadow-2xl backdrop-blur-sm border-2 border-accent/30 overflow-hidden"
                      data-cursor="CLICK"
                    >
                      <motion.div
                        className="absolute inset-0 bg-accent-gradient-sunset opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{ backgroundSize: '200% 200%' }}
                      />
                      
                      <span className="relative z-10">See All Projects</span>
                      
                      <motion.div
                        className="relative z-10 flex items-center justify-center w-8 h-8 bg-black/20 rounded-full"
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none"
                        >
                          <path 
                            d="M8 0V16M0 8H16" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </motion.div>
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}