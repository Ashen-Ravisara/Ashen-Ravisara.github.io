"use client";

import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { SplashScreen } from './components/SplashScreen';
import { HeroSection } from './components/HeroSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { AllProjects } from './components/AllProjects';
import { ProjectPage } from './components/ProjectPage';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FigmaToolsCursor } from './components/FigmaToolsCursor';

// Consolidated projects data that can be shared across components
const allProjectsData = [
  {
    id: 1,
    title: "Bloo Tour & Tourism",
    subtitle: "Immersive Travel Discovery Platform", 
    category: "Landing pages",
    year: "2024",
    image: "/images/1.png",
    color: "#FF6B35",
    description: "A revolutionary tourism platform showcasing stunning destinations with immersive digital experiences, ancient temples, and cultural heritage sites.",
    fullDescription: "Bloo Tour & Tourism represents a revolutionary approach to travel discovery, showcasing stunning destinations with an immersive digital experience. This comprehensive tourism platform combines breathtaking visuals of ancient temples, cultural landmarks, and natural wonders with intuitive navigation and engaging storytelling. The design seamlessly blends modern web aesthetics with cultural heritage, creating an inspiring gateway for travelers seeking authentic experiences and meaningful connections with destinations around the world.",
    technologies: ["React", "Next.js", "Framer Motion", "Tailwind CSS", "WebGL"],
    client: "Tourism Board Sri Lanka",
    duration: "5 months",
    role: "Lead UI/UX Designer"
  },
  {
    id: 2,
    title: "Ethereal Commerce",
    subtitle: "Next-Gen E-commerce Experience",
    category: "Mobile Apps",
    year: "2024",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
    color: "#8b5cf6",
    description: "Redefining online shopping with immersive AR try-ons and AI-powered personalized recommendations.",
    fullDescription: "Ethereal Commerce revolutionizes the online shopping experience by integrating cutting-edge AR technology with AI-powered personalization. Users can virtually try on products, receive intelligent recommendations, and enjoy a seamless, immersive shopping journey that bridges the gap between physical and digital retail.",
    technologies: ["React Native", "ARKit", "TensorFlow", "Firebase", "Stripe"],
    client: "Retail Innovations Inc.",
    duration: "8 months",
    role: "Senior UX Designer"
  },
  {
    id: 3,
    title: "Quantum Workspace",
    subtitle: "Collaborative Design System",
    category: "Web Applications",
    year: "2023",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=800&fit=crop",
    color: "#06b6d4",
    description: "A unified design system that bridges the gap between design and development teams across platforms.",
    fullDescription: "Quantum Workspace is a comprehensive design system that creates harmony between design and development workflows. It provides a unified component library, design tokens, and collaboration tools that ensure consistency across all platforms while accelerating the development process.",
    technologies: ["Figma", "Storybook", "React", "Vue", "Angular"],
    client: "DesignTech Studios",
    duration: "4 months",
    role: "Design Systems Lead"
  },
  {
    id: 4,
    title: "Neural Interface",
    subtitle: "AI-Powered User Experience",
    category: "Web Applications",
    year: "2023",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    color: "#f59e0b",
    description: "Pioneering the future of human-computer interaction through intelligent adaptive interfaces.",
    fullDescription: "Neural Interface represents the cutting edge of human-computer interaction, utilizing advanced AI algorithms to create adaptive interfaces that learn from user behavior. The system continuously evolves to provide personalized experiences, making technology more intuitive and accessible for everyone.",
    technologies: ["Python", "TensorFlow", "React", "WebGL", "WebAssembly"],
    client: "AI Research Lab",
    duration: "12 months",
    role: "UX Researcher & Designer"
  },
  {
    id: 5,
    title: "Recruitment Agency Web Application",
    subtitle: "AI-Powered Recruitment Platform",
    category: "Web Applications",
    year: "2024",
    image: "/images/1.png",
    color: "#6366f1",
    description: "A comprehensive recruitment platform with dual portals for agencies and companies, featuring AI job description generation and integrated chat system.",
    fullDescription: "This Recruitment Agency Web Application is designed to streamline the hiring process by providing two separate portals—one for recruitment agencies and another for companies. The platform includes an integrated AI feature that allows users to generate job descriptions by simply providing a prompt, making it faster and easier to post listings. It also features a built-in chat system to enhance communication. The design focuses on creating an intuitive and organized user interface that supports a smooth workflow, clear navigation, and a modern look, ensuring both functionality and an engaging user experience.",
    technologies: ["React", "TypeScript", "AI/ML", "Chat System", "Portal Design"],
    client: "CodeLantic",
    duration: "6 months",
    role: "UI/UX Designer"
  },
  {
    id: 6,
    title: "Stellar Banking",
    subtitle: "Digital Finance Revolution",
    category: "Mobile Apps",
    year: "2023",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop",
    color: "#10b981",
    description: "Transforming traditional banking with seamless digital experiences and innovative financial tools.",
    fullDescription: "Stellar Banking transforms traditional financial services through innovative digital solutions. The platform offers seamless banking experiences, advanced financial analytics, and cutting-edge security features that meet the evolving needs of modern consumers and businesses.",
    technologies: ["React", "Node.js", "Blockchain", "PostgreSQL", "AWS"],
    client: "FinTech Innovations",
    duration: "10 months",
    role: "Principal Designer"
  },
  {
    id: 7,
    title: "Aurora Health",
    subtitle: "Healthcare Innovation Platform",
    category: "Web Applications",
    year: "2022",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop",
    color: "#ef4444",
    description: "Revolutionary healthcare platform that connects patients, doctors, and care providers in one seamless ecosystem.",
    fullDescription: "Aurora Health creates a comprehensive healthcare ecosystem that seamlessly connects patients, healthcare providers, and medical institutions. The platform streamlines appointment scheduling, medical records management, and telemedicine services while ensuring the highest standards of privacy and security.",
    technologies: ["Vue.js", "Python", "MongoDB", "Docker", "Kubernetes"],
    client: "HealthCare Systems Ltd.",
    duration: "14 months",
    role: "Lead UX Designer"
  },
  {
    id: 8,
    title: "Travel Explore",
    subtitle: "Adventure Discovery Landing",
    category: "Landing pages",
    year: "2024",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop",
    color: "#34d399",
    description: "An immersive landing page experience for adventure travel booking, featuring stunning visual storytelling and seamless booking integration.",
    fullDescription: "Travel Explore showcases the power of immersive web design in the travel industry. This landing page combines stunning visual storytelling with seamless user experience design to create an engaging platform for adventure travel bookings. The design features parallax scrolling, interactive elements, and optimized conversion funnels to maximize user engagement and booking rates.",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP", "WebGL"],
    client: "Adventure Travel Co.",
    duration: "3 months",
    role: "Creative Director"
  },
  {
    id: 9,
    title: "FitTracker Pro",
    subtitle: "Personal Fitness Companion",
    category: "Mobile Apps",
    year: "2024",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop",
    color: "#f59e0b",
    description: "A comprehensive fitness tracking mobile app with workout planning, nutrition monitoring, and social features to keep users motivated and engaged.",
    fullDescription: "FitTracker Pro represents the next generation of fitness applications, combining comprehensive health monitoring with social engagement features. The app provides personalized workout plans, nutrition tracking, and community challenges to keep users motivated. Advanced analytics and machine learning algorithms provide insights into user progress and suggest optimized fitness routines.",
    technologies: ["React Native", "HealthKit", "Firebase", "Machine Learning", "Social"],
    client: "FitTech Solutions",
    duration: "7 months",
    role: "Lead Mobile Designer"
  }
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'all-projects' | 'project'>('main');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [targetProjectId, setTargetProjectId] = useState<number | null>(null);
  const [previousView, setPreviousView] = useState<'main' | 'all-projects'>('main'); // Track where user came from

  useEffect(() => {
    // Preload critical resources
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to specific project in FeaturedProjects section
  useEffect(() => {
    if (currentView === 'main' && targetProjectId) {
      const timer = setTimeout(() => {
        // First scroll to the FeaturedProjects section
        const featuredSection = document.querySelector('[data-section="featured-projects"]');
        if (featuredSection) {
          featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Clear the target after scrolling
        setTargetProjectId(null);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentView, targetProjectId]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigateToAllProjects = () => {
    setPreviousView('main'); // Track that we came from main
    setCurrentView('all-projects');
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFeatured = () => {
    setCurrentView('main');
    setSelectedProject(null);
    
    // Smooth scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Then scroll to about section
    setTimeout(() => {
      const aboutSection = document.querySelector('[data-section="about"]');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleExploreProject = (project: any) => {
    setPreviousView('main'); // Track that we came from main (Featured Projects)
    setSelectedProject(project);
    setCurrentView('project');
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle navigation back from project page - now goes to the correct previous view
  const handleBackFromProject = () => {
    setSelectedProject(null);
    
    if (previousView === 'all-projects') {
      // Return to All Projects page
      setCurrentView('all-projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Return to Featured Projects section on main page
      setCurrentView('main');
      setTargetProjectId(selectedProject?.id || null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle general navigation to different sections
  const handleNavigate = (section: string) => {
    setCurrentView('main');
    setSelectedProject(null);
    
    // Smooth scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Then scroll to specific section
    setTimeout(() => {
      let targetSelector = '';
      switch (section) {
        case 'home':
          targetSelector = '[data-section="hero"]';
          break;
        case 'about':
          targetSelector = '[data-section="about"]';
          break;
        case 'contact':
          targetSelector = '[data-section="contact"]';
          break;
        case 'project':
          targetSelector = '[data-section="featured-projects"]';
          break;
        default:
          targetSelector = '[data-section="hero"]';
      }
      
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleProjectClickFromAllProjects = (project: any) => {
    setPreviousView('all-projects'); // Track that we came from All Projects
    setSelectedProject(project);
    setCurrentView('project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle navigation from Navigation component
  const handleNavigationFromMenu = (section: string) => {
    handleNavigate(section);
  };

  // Handle home navigation from Navigation component
  const handleHomeFromMenu = () => {
    setCurrentView('main');
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get related projects for the current selected project
  const getRelatedProjects = (currentProject: any) => {
    return allProjectsData
      .filter(p => p.id !== currentProject?.id)
      .slice(0, 3);
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-accent-gradient-radial rounded-full animate-pulse shadow-accent-gradient" />
          <div className="w-2 h-2 bg-accent-gradient-sunset rounded-full animate-pulse shadow-accent-gradient" style={{ animationDelay: '0.2s' }} />
          <div className="w-2.5 h-2.5 bg-accent-gradient-warm rounded-full animate-pulse shadow-accent-gradient" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-background text-foreground overflow-x-hidden custom-cursor">
      <FigmaToolsCursor />
      
      {/* Background texture with gradient enhancements */}
      <div className="background-texture" />
      
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {!showSplash && (
        <>
          {/* Navigation is now always visible and handles all navigation */}
          <Navigation 
            onNavigate={handleNavigationFromMenu}
            onHome={handleHomeFromMenu}
          />
          
          <main>
            {currentView === 'main' ? (
              <>
                <div data-section="hero">
                  <HeroSection />
                </div>
                <div data-section="featured-projects">
                  <FeaturedProjects 
                    onNavigateToAllProjects={handleNavigateToAllProjects}
                    onExploreProject={handleExploreProject}
                  />
                </div>
                <div data-section="about">
                  <AboutSection />
                </div>
                <div data-section="contact">
                  <ContactSection />
                </div>
              </>
            ) : currentView === 'all-projects' ? (
              <AllProjects 
                onBackToFeatured={handleBackToFeatured}
                onProjectClick={handleProjectClickFromAllProjects}
              />
            ) : currentView === 'project' && selectedProject ? (
              <ProjectPage 
                project={selectedProject} 
                onBackToPrevious={handleBackFromProject}
                onNavigate={handleNavigate}
                onProjectClick={handleProjectClickFromAllProjects}
                relatedProjects={getRelatedProjects(selectedProject)}
                previousView={previousView}
              />
            ) : null}
          </main>

          {currentView === 'main' && (
            <footer className="py-8 px-6 md:px-12 border-t border-accent-gradient-subtle/20 relative bg-white/80 backdrop-blur-sm">
              {/* Gradient border effect */}
              <div className="absolute top-0 left-0 w-full h-px bg-accent-gradient opacity-30" />
              
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <span 
                    className="font-bold tracking-wider text-accent-gradient animate-gradient-shift" 
                    data-cursor="HOME"
                  >
                    Ashen Ravisara
                  </span>
                  <span className="text-muted-foreground text-sm">
                    © 2024 Creative Portfolio
                  </span>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <button 
                    className="hover:text-accent-gradient transition-all duration-300 hover:scale-105"
                    data-cursor="LEGAL"
                  >
                    Privacy
                  </button>
                  <button 
                    className="hover:text-accent-gradient transition-all duration-300 hover:scale-105"
                    data-cursor="LEGAL"
                  >
                    Terms
                  </button>
                  <button 
                    className="hover:text-accent-gradient transition-all duration-300 hover:scale-105"
                    data-cursor="INFO"
                  >
                    Credits
                  </button>
                </div>
              </div>

              {/* Subtle background gradient glow */}
              <div 
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ background: 'var(--accent-gradient-glow)' }}
              />
            </footer>
          )}
        </>
      )}
    </div>
  );
}