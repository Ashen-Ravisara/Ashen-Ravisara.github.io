import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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
    case 1: // Prime Reality
      return {
        title: "Prime Reality",
        client: "LumetriX Solutions (Pvt).Ltd",
        // teamMember: "Ashen Ravisara - Lead UI/UX Designer",
        year: "2025",
        // description: "A revolutionary tourism platform showcasing stunning destinations with immersive digital experiences, ancient temples, and cultural heritage sites.",
        fullDescription: "The goal of this project is to redesign an asset management dashboard for a company that handles physical and digital assets used in research and development (R&D) processes. The dashboard should allow R&D teams to easily track and manage various assets . The design focuses on creating a user-friendly interface that provides clear visibility into asset status, location, and usage history. Key features include intuitive navigation, real-time updates, and detailed asset information to enhance operational efficiency and decision-making. The project aims to streamline asset management processes, reduce downtime, and improve overall productivity within R&D teams.",
        mainImage: "/images/PrimeRealityCover.png",
        designProcess: [
          {
            title: "Colors",
            description: "Defining the Visual Identity – Establishing a color palette that enhances usability, brand consistency, and accessibility across all banking platforms.",
            image: "/images/PrimeRealityColors.png"
          },
          {
            title: "Design System & Components",
            description: "Building Consistency – Creating a scalable design system with reusable UI components, typography, and styles for a unified digital experience.",
            image: "/images/PrimeRealityDesignSystem.png"
          },
          {
            title: "Web Design",
            image: "/images/PrimeRealityCoverUI.png"
          }
        ]
      };

    case 2: // Bloo Tour & Tourism
      return {
        title: "Bloo Tour & Tourism",
        client: "LumetriX Solutions (Pvt).Ltd",
        // teamMember: "Ashen Ravisara - Lead UI/UX Designer",
        year: "2025",
        // description: "A revolutionary tourism platform showcasing stunning destinations with immersive digital experiences, ancient temples, and cultural heritage sites.",
        fullDescription: "Bloo Tour & Tourism is a responsive tourism website created to highlight the beauty of Sri Lanka’s travel destinations. Users can browse a variety of attractions—from cultural landmarks to natural wonders—while also accessing essential travel details such as available vehicles and accommodation options. The platform offers an intuitive, visually rich interface that ensures a seamless experience for travelers planning their journey. Designed with user experience at its core, the website provides clear navigation, vibrant visuals, and essential travel information all in one place.",
        mainImage: "/images/blootuor.png",
        designProcess: [
          {
            title: "Web & Mobile Design",
            image: "/images/BlooTourUI.png"
          },
        ]
      };

    case 3: // LumetriX Solution Landing page
      return {
        title: "LumetriX Solutions Landing page",
        // client: "Retail Innovations Inc.",
        // teamMember: "Ashen Ravisara - Senior UX Designer",
        year: "2025",
        // description: "A revolutionary e-commerce platform featuring AR product visualization, AI-powered recommendations, and seamless checkout experiences across all devices.",
        fullDescription: "TThe Portfolio Website for LumetriX Solutions was designed to represent the company’s innovative presence in the IT industry, offering services in software development, UI/UX design, web solutions, and AI integration. The website showcases the company’s vision, service offerings, and key projects in a clean, professional layout aimed at building trust and attracting potential clients. As the UI/UX designer, I focused on creating a responsive, user-friendly interface that reflects LumetriX’s modern and forward-thinking identity. The design emphasizes intuitive navigation, service clarity, and visual consistency to ensure a seamless browsing experience for visitors. The project was developed using Figma Make, leveraging AI-powered design tools to streamline the process while maintaining a high level of quality and creativity.",
        mainImage: "/images/LumetrX.png",
        designProcess: [
          {
            title: "Web Design",
            image: "/images/LumerriXUI.png"
          },
        ]
      };

    case 4: // Artigala Ayurveda
      return {
        title: "Artigala Ayurveda",
        client: "LumetriX Solutions (Pvt.)Ltd",
        // teamMember: "Ashen Ravisara - Design Systems Lead",
        year: "2025",
        fullDescription: "Artigala Ayurveda is an e-commerce website created for the traditional wellness brand, Artigala Ayurveda. The site offers a serene and nature-inspired interface where users can explore a variety of Ayurvedic products with detailed descriptions, benefits, and usage guidance. Customers can easily browse categories, view product details, and make purchases directly through the website. The design blends modern web practices with traditional aesthetics, reflecting the brand's commitment to natural healing and holistic living.",
        mainImage: "/images/ArtigalaMain.png",
        designProcess: [
          {
            title: "Web Design",
            image: "/images/ArtigalaUI.png"
          }
        ]
      };

    case 5: // Recruitment Agency Web Application
      return {
        title: "Recruitment Agency Web Application",
        client: "Syntax Erreur (Pvt.)Ltd",
        teamMember: "Hiran B Anuraja - UI/ UX Designer",
        year: "2025",
        fullDescription: "Neural Interface represents the cutting edge of human-computer interaction, utilizing advanced AI algorithms to create adaptive interfaces that learn from user behavior. The system continuously evolves to provide personalized experiences, making technology more intuitive and accessible for everyone.",
        mainImage: "/images/RecruitmentMain.png",
        designProcess: [
          {
            title: "Wire-framing",
            description: "Structuring the Experience – Reviewing Functional Specification Documents (FSDs) to create well-defined wireframes that map out user journeys and feature interactions.",
            image: "/images/RecruitmentWireframe.png"
          },
          {
            title: "Colors",
            description: "Defining the Visual Identity – Establishing a color palette that enhances usability, brand consistency, and accessibility across all banking platforms.",
            image: "/images/RecruitmentColors.png"
          },
          {
            title: "Design System & Components",
            description: "Building Consistency – Creating a scalable design system with reusable UI components, typography, and styles for a unified digital experience.",
            image: "/images/RecruitmentDesignSystem.png"
          },
          {
            title: "Web & Mobile Design",
            image: "/images/RecruitmentUI.png"
          }
        ]
      };

    case 6: // Infinity Day Planner Web Application
      return {
        title: "Infinity Day Planner Web Application",
        client: "Codelantic (Pvt.)Ltd",
        teamMember: "Hiran B Anuraja - UI/ UX Designer",
        year: "2024",
        fullDescription: "IDP is a smart day planner web application developed for a Swaziland - based client, designed to simplify and optimize daily operations. The platform features two user portals - Manager and Staff - enabling efficient management of schedules, work orders, staff onboarding, route planning, leave management, and other essential day-to-day tasks. IDP helps organizations enhance productivity and coordination by providing a centralized system for planning, tracking, and managing workforce activities in real time.",
        mainImage: "/images/IDPmain.png",
        designProcess: [
          {
            title: "Colors",
            description: "Defining the Visual Identity – Establishing a color palette that enhances usability, brand consistency, and accessibility across all banking platforms.",
            image: "/images/IDPcolors.png"
          },
          {
            title: "Design System & Components",
            description: "Building Consistency – Creating a scalable design system with reusable UI components, typography, and styles for a unified digital experience.",
            image: "/images/IDPdesignSystem.png"
          },
          {
            title: "Web & Mobile Design",
            image: "/images/IDPUI.png"
          }
        ]
      };

    case 7: // Ebos Web Application
      return {
        title: "EBOS Web Application",
        client: "Codelantic (Pvt.)Ltd",
        // teamMember: "Hiran B Anuraja - UI/ UX Designer",
        year: "2024",
        fullDescription: "Ebos is a comprehensive multi-industry management platform developed for a UK-based client, designed to centralize and streamline business operations. The system includes three dedicated portals—Super Admin, Manager, and Staff—each with tailored functionalities and access levels. From overseeing company-wide operations and managing teams to executing tasks and tracking performance, Ebos enables seamless collaboration and efficient workflow management across various industries, all within a single unified platform.",
        mainImage: "/images/EbosCover.png",
        designProcess: [
          {
            title: "Wireframes",
            description: "Structuring the Experience – Reviewing Functional Specification Documents (FSDs) to create well-defined wireframes that map out user journeys and feature interactions.",
            image: "/images/EbosWireframe.png"
          },
          {
            title: "Colors",
            description: "Defining the Visual Identity – Establishing a color palette that enhances usability, brand consistency, and accessibility across all banking platforms.",
            image: "/images/EbosColors.png"
          },
          {
            title: "Web & Mobile Design",
            image: "/images/EbosUI.png"
          }
        ]
      };

    case 8: // Redwood Cabins Landing Page
      return {
        title: "Readwood Cabins",
        client: "Metafuse (Pvt.)Ltd",
        // teamMember: "Hiran B Anuraja - UI/ UX Designer",
        year: "2024",
        fullDescription: "Readwood Cabins is a modern hotel booking website built for the Readwood Cabins resort. The platform allows users to view detailed information about available rooms, including amenities, pricing, and images, helping them make informed decisions. With a smooth booking process integrated into the site, guests can reserve accommodations directly through the website. The design focuses on simplicity and elegance, ensuring an effortless user journey from browsing to booking.",
        mainImage: "/images/RedwoodMain.png",
        designProcess: [
          {
            title: "Web Design",
            image: "/images/RedwoodUI.png"
          }
        ]
      };

    case 9: // Gamification Education Website
      return {
        title: "Gamification Education Website",
        // client: "Metafuse (Pvt.)Ltd",
        teamMember: "Hiran B Anuraja - UI/ UX Designer",
        year: "2024",
        fullDescription: "The Gamification Education Website was developed as part of our university final year research project to teach the C programming language to first-year students through a gamified approach. The platform features interactive lessons, challenges, and progress tracking, making the learning experience more engaging and effective. As the UI/UX designer, I focused on creating an intuitive and visually appealing interface that enhances user engagement and ensures a seamless user experience. The design emphasizes clarity, usability, and an easy navigation flow to help students stay motivated and progress through the learning material effortlessly.",
        mainImage: "/images/GamificationCover.png",
        designProcess: [
          {
            title: "Web Design",
            image: "/images/GamificationUI.png"
          }
        ]
      };
  }
};

export function ProjectPage({ project, onBackToPrevious, previousView }: ProjectPageProps) {
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
                {projectContent?.title}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">All rights reserved by {projectContent?.client}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-medium text-accent">{projectContent?.year}</span>
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
            {projectContent?.fullDescription}
          </p>
        </motion.div>

        {/* Team Contributions */}
        {projectContent?.teamMember && (
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
              <span className="text-muted-foreground">{projectContent?.teamMember}</span>
            </div>
          </motion.div>
        )}
        
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
                src={projectContent?.mainImage || ""}
                alt={`${projectContent?.title} Interface`}
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
          {projectContent?.designProcess.map((process, index) => (
            <div key={index} className="mb-16 last:mb-0">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-foreground mb-4">{process.title}</h2>
              </div>

              <div className="bg-card backdrop-blur-sm rounded-2xl border border-border p-8 shadow-lg">
                <div className={index === 1 ? "max-w-2xl mx-auto" : "rounded-xl overflow-hidden"}>
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
      </div>
    </div>
  );
}