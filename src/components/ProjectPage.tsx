import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, User } from 'lucide-react';

// Create a component for project images
const ProjectImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  return <img src={src} alt={alt} className={className} />;
};

interface Project {
  id: number;
  title: string;
  category: string;
  year?: string;
  image: string;
  color: string;
  subtitle?: string;
  description?: string;
  fullDescription?: string;
  technologies?: string[];
  client?: string;
  duration?: string;
  role?: string;
  images?: string[];
}

interface ProjectPageProps {
  project: Project;
  /** Callback to navigate back to the previous view */
  onBackToPrevious: () => void;
  /** General navigation callback for other navigation items */
  onNavigate: (section: string) => void;
  onProjectClick: (project: Project) => void;
  relatedProjects: Project[];
  /** Track which view the user came from */
  previousView: 'main' | 'all-projects';
}

// Project content mapping
const getProjectContent = (project: Project) => {
  switch (project.id) {
    case 1: // Bloo Tour & Tourism
      return {
        title: "Bloo Tour & Tourism",
        client: "Tourism Board Sri Lanka",
        teamMember: "Ashen Ravisara - Lead UI/UX Designer",
        year: "2024",
        description: "A revolutionary tourism platform showcasing stunning destinations with immersive digital experiences, ancient temples, and cultural heritage sites.",
        fullDescription: "Bloo Tour & Tourism represents a revolutionary approach to travel discovery, showcasing stunning destinations with an immersive digital experience. This comprehensive tourism platform combines breathtaking visuals of ancient temples, cultural landmarks, and natural wonders with intuitive navigation and engaging storytelling. The design seamlessly blends modern web aesthetics with cultural heritage, creating an inspiring gateway for travelers seeking authentic experiences and meaningful connections with destinations around the world.",
        mainImage: "/images/1.png",
        designProcess: [
          {
            title: "Research & Discovery",
            description: "Understanding traveler behavior and tourism market needs through comprehensive research and stakeholder interviews.",
            image: "/images/1.png"
          },
          {
            title: "User Journey Mapping",
            description: "Creating detailed user journeys to optimize the travel discovery and booking experience.",
            image: "/images/1.png"
          },
          {
            title: "Visual Identity",
            description: "Developing a brand identity that reflects Sri Lanka's rich cultural heritage and natural beauty.",
            image: "/images/1.png"
          },
          {
            title: "Platform Design",
            description: "Designing intuitive interfaces that showcase destinations and facilitate seamless travel planning.",
            image: "/images/1.png"
          }
        ]
      };

    case 2: // Ethereal Commerce
      return {
        title: "Ethereal Commerce",
        client: "Retail Innovations Inc.",
        teamMember: "Ashen Ravisara - Senior UX Designer",
        year: "2024",
        description: "A revolutionary e-commerce platform featuring AR product visualization, AI-powered recommendations, and seamless checkout experiences across all devices.",
        fullDescription: "Ethereal Commerce revolutionizes the online shopping experience by integrating cutting-edge AR technology with AI-powered personalization. Users can virtually try on products, receive intelligent recommendations, and enjoy a seamless, immersive shopping journey that bridges the gap between physical and digital retail.",
        mainImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
        designProcess: [
          {
            title: "AR Integration Research",
            description: "Researching AR technologies and their applications in e-commerce experiences.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop"
          },
          {
            title: "AI Personalization",
            description: "Designing AI-powered recommendation systems for personalized shopping experiences.",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop"
          }
        ]
      };

    case 3: // Quantum Workspace
      return {
        title: "Quantum Workspace",
        client: "DesignTech Studios",
        teamMember: "Ashen Ravisara - Design Systems Lead",
        year: "2023",
        description: "A comprehensive design system that creates harmony between design and development workflows.",
        fullDescription: "Quantum Workspace is a comprehensive design system that creates harmony between design and development workflows. It provides a unified component library, design tokens, and collaboration tools that ensure consistency across all platforms while accelerating the development process.",
        mainImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=800&fit=crop",
        designProcess: [
          {
            title: "Component Architecture",
            description: "Building a scalable component library with consistent design patterns.",
            image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=800&fit=crop"
          }
        ]
      };

    case 4: // Neural Interface
      return {
        title: "Neural Interface",
        client: "AI Research Lab",
        teamMember: "Ashen Ravisara - UX Researcher & Designer",
        year: "2023",
        description: "Pioneering the future of human-computer interaction through intelligent adaptive interfaces.",
        fullDescription: "Neural Interface represents the cutting edge of human-computer interaction, utilizing advanced AI algorithms to create adaptive interfaces that learn from user behavior. The system continuously evolves to provide personalized experiences, making technology more intuitive and accessible for everyone.",
        mainImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
        designProcess: [
          {
            title: "AI Behavior Analysis",
            description: "Studying user interaction patterns to inform adaptive interface design.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop"
          }
        ]
      };

    default: // Recruitment Agency (fallback)
      return {
        title: "Recruitment Agency Web Application",
        client: "CodeLantic",
        teamMember: "Ashen Ravisara - UI/UX Designer",
        year: "2024",
        description: "This Recruitment Agency Web Application is designed to streamline the hiring process by providing two separate portals—one for recruitment agencies and another for companies.",
        fullDescription: "This Recruitment Agency Web Application is designed to streamline the hiring process by providing two separate portals—one for recruitment agencies and another for companies. The platform includes an integrated AI feature that allows users to generate job descriptions by simply providing a prompt, making it faster and easier to post listings. It also features a built-in chat system to enhance communication. The design focuses on creating an intuitive and organized user interface that supports a smooth workflow, clear navigation, and a modern look, ensuring both functionality and an engaging user experience.",
        mainImage: "/images/1.png",
        designProcess: [
          {
            title: "Wire-framing",
            description: "Structuring the Experience – Reviewing Functional Specification Documents (FSDs) to create well-defined wireframes that map out user journeys and feature interactions.",
            image: "/images/1.png"
          },
          {
            title: "Colors",
            description: "Defining the Visual Identity – Establishing a color palette that enhances usability, brand consistency, and accessibility across all recruitment platforms.",
            image: "/images/1.png"
          },
          {
            title: "Design System & Components",
            description: "Building Consistency – Creating a scalable design system with reusable UI components, typography, and styles for a unified digital experience.",
            image: "/images/1.png"
          },
          {
            title: "Web & Mobile Design",
            description: "Comprehensive Interface Design – Designed responsive interfaces for both recruitment agencies and companies, ensuring seamless functionality across all devices and user types.",
            image: "/images/1.png"
          }
        ]
      };
  }
};

export function ProjectPage({ project, onBackToPrevious, onNavigate, onProjectClick, relatedProjects, previousView }: ProjectPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useState(false);
  const [mouseY, setMouseY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Get dynamic content based on project
  const projectContent = getProjectContent(project);

  // Determine back button text based on previous view
  const backButtonText = previousView === 'all-projects' ? 'Back to All Projects' : 'Back to Projects';

  // Mouse position tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll detection for floating button visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      const hasScrolledPastInitial = currentScrollY > 200;
      const cursorNearTop = mouseY < 80;

      // Show floating button when:
      // 1. User has scrolled past initial section AND is scrolling up
      // 2. OR cursor is near the top while scrolled down
      const shouldShowFloatingButton = hasScrolledPastInitial && (scrollingUp || cursorNearTop);

      setIsFloatingButtonVisible(shouldShowFloatingButton);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mouseY, lastScrollY]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Comprehensive Background Setup */}
      <div className="fixed inset-0 z-0">
        {/* Base background texture */}
        <div className="background-texture" />
        
        {/* Animated gradient overlays */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y: backgroundY }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5" />
          <div className="absolute top-1/4 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-blue-500/5 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-2/3 h-2/3 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/20 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                opacity: 0,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 0.6, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Atmospheric glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-32 right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Floating Back Button */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isFloatingButtonVisible ? 0 : -100,
          opacity: isFloatingButtonVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <motion.button
          onClick={onBackToPrevious}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 px-6 py-3 bg-card/90 backdrop-blur-sm border border-border rounded-full hover:bg-muted hover:border-accent/30 transition-all duration-300 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">{backButtonText}</span>
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-20 relative z-10">
        {/* Initial Back Button */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <motion.button
            onClick={onBackToPrevious}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm border border-border rounded-full hover:bg-muted hover:border-accent/30 transition-all duration-300 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">{backButtonText}</span>
          </motion.button>
        </motion.div>

        {/* Project Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4">
                {projectContent.title}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-accent/20">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                      alt={`${projectContent.client} Profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-muted-foreground">All rights reserved by {projectContent.client}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-medium text-accent">{projectContent.year}</span>
            </div>
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
            {projectContent.fullDescription}
          </p>
        </motion.div>

        {/* Team Contributions */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-xl font-light text-foreground mb-4">Team Contributions</h3>
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-full bg-accent-gradient p-0.5">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <User className="w-6 h-6 text-accent" />
              </div>
            </div>
            <span className="text-muted-foreground">{projectContent.teamMember}</span>
          </div>
        </motion.div>

        {/* Main Project Showcase */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="bg-card backdrop-blur-sm rounded-2xl border border-border p-8 shadow-lg">
            <div className="aspect-[16/9] rounded-xl overflow-hidden">
              <ProjectImage
                src={projectContent.mainImage}
                alt={`${projectContent.title} Interface`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Design Process Sections */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {projectContent.designProcess.map((process, index) => (
            <div key={index} className="mb-16 last:mb-0">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-foreground mb-4">{process.title}</h2>
                <p className="text-xl text-muted-foreground max-w-3xl">
                  {process.description}
                </p>
              </div>

              <div className="bg-card backdrop-blur-sm rounded-2xl border border-border p-8 shadow-lg">
                <div className={index === 1 ? "max-w-2xl mx-auto" : "aspect-[16/10] rounded-xl overflow-hidden"}>
                  <ProjectImage
                    src={process.image}
                    alt={process.title}
                    className={index === 1 ? "w-full h-auto rounded-xl" : "w-full h-full object-cover"}
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Thank You Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <h2 className="text-5xl font-black text-accent-gradient mb-4">THANK YOU!</h2>
        </motion.div>

        {/* Other Projects Section */}
        {relatedProjects.length > 0 && (
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="text-center mb-12">
              <motion.span 
                className="text-sm tracking-widest text-accent-gradient uppercase mb-4 block animate-gradient-shift"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >

              </motion.span>
              <motion.h2 
                className="text-accent-gradient-sunset animate-gradient-pulse"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Other Projects
              </motion.h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.slice(0, 3).map((relatedProject, index) => {
                // Enhanced project data with required fields
                const enhancedRelatedProject = {
                  ...relatedProject,
                  subtitle: relatedProject.subtitle || "Professional Web Application",
                  description: relatedProject.description || "A comprehensive web application designed to provide exceptional user experience and functionality for modern businesses.",
                  color: relatedProject.color || "#6366f1"
                };

                return (
                  <motion.div
                    key={relatedProject.id}
                    className="group cursor-pointer relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    onClick={() => onProjectClick(relatedProject)}
                  >
                    <div 
                      className="relative backdrop-blur-xl rounded-2xl overflow-hidden border shadow-lg transition-all duration-500 group-hover:shadow-xl bg-card"
                      style={{
                        background: `linear-gradient(135deg, ${enhancedRelatedProject.color}08, rgba(255, 255, 255, 0.95))`,
                        borderColor: `${enhancedRelatedProject.color}20`,
                        boxShadow: `0 10px 25px -8px ${enhancedRelatedProject.color}15, 0 0 0 1px ${enhancedRelatedProject.color}10`
                      }}
                    >
                      {/* Project Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <ImageWithFallback
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                          style={{ 
                            background: `linear-gradient(135deg, ${enhancedRelatedProject.color}40, transparent)` 
                          }}
                        />
                      </div>

                      {/* Project Content */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <span 
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase backdrop-blur-sm border"
                            style={{
                              background: `${enhancedRelatedProject.color}10`,
                              color: enhancedRelatedProject.color,
                              borderColor: `${enhancedRelatedProject.color}20`
                            }}
                          >
                            {relatedProject.category || "Web"}
                          </span>
                          <span className="text-sm text-muted-foreground font-medium">
                            {relatedProject.year || "2024"}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-accent-gradient transition-colors duration-300">
                            {relatedProject.title}
                          </h3>
                          <p className="text-muted-foreground font-medium">
                            {enhancedRelatedProject.subtitle}
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {enhancedRelatedProject.description}
                        </p>

                        {/* View Project Button */}
                        <motion.button
                          whileHover={{ scale: 1.02, x: 3 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 border font-medium"
                          style={{
                            background: `${enhancedRelatedProject.color}10`,
                            borderColor: `${enhancedRelatedProject.color}20`,
                            color: enhancedRelatedProject.color
                          }}
                          data-cursor="VIEW"
                          onClick={(e) => {
                            e.stopPropagation();
                            onProjectClick(relatedProject);
                          }}
                        >
                          <span>View Project</span>
                          <motion.svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16" 
                            fill="none"
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path 
                              d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" 
                              fill="currentColor"
                            />
                          </motion.svg>
                        </motion.button>
                      </div>

                      {/* Floating Particle */}
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotateZ: [0, 5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }}
                        className="absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-60 blur-sm"
                        style={{ backgroundColor: enhancedRelatedProject.color }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}