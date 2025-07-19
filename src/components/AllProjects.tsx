import { motion } from 'framer-motion';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  year: string;
  color: string;
}

interface AllProjectsProps {
  onBackToFeatured: () => void;
  onProjectClick: (project: Project) => void;
}

const allProjects: Project[] = [
  {
    id: 1,
    title: "Bloo Tour & Tourism",
    subtitle: "All rights reserved by LumetriX Solutions (Pvt.)Ltd",
    description: "A revolutionary tourism platform showcasing stunning destinations with immersive digital experiences, ancient temples, and cultural heritage sites.",
    image: "/images/blootuor.png",
    category: "Landing pages",
    year: "2024",
    color: "#FF6B35",
  },
  {
    id: 2,
    title: "LumetriX Solution Landing page",
    subtitle: "Tool Used: Figma Make",
    description: "A revolutionary e-commerce platform featuring AR product visualization, AI-powered recommendations, and seamless checkout experiences across all devices.",
    image: "/images/LumetrX.png",
    category: "Web Applications",
    year: "2024",
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Artigala Ayurveda",
    subtitle: "All rights reserved by LumetriX Solutions (Pvt.)Ltd",
    description: "A comprehensive design system and collaboration platform for distributed teams, featuring real-time co-editing, version control, and design token management.",
    image: "/images/ArtigalaAyurvedaCover.png",
    category: "Web Applications",
    year: "2023",
    color: "#FF6B35",
  },
  {
    id: 4,
    title: "Recruitment Agency Web Application",
    subtitle: "Tool Used: Figma Make",
    description: "Pioneering the future of human-computer interaction through intelligent adaptive interfaces that learn from user behavior and continuously evolve.",
    image: "/images/RecruitmentCover.png",
    category: "Web Applications",
    year: "2023",
    color: "#294BFF",
  },
  {
    id: 5,
    title: "Infinity Day Planner Web Application",
    subtitle: "All rights reserved by Codelantic (Pvt.)Ltd",
    description: "A comprehensive recruitment platform with dual portals for agencies and companies, featuring AI job description generation and integrated chat system.",
    image: "/images/IDPcover.png",
    category: "Web Applications",
    year: "2024",
    color: "#01375B",
  },
  {
    id: 6,
    title: "EBOS Web Application",
    subtitle: "All rights reserved by Codelantic (Pvt.)Ltd",
    description: "A next-generation banking app that combines traditional financial services with modern UX principles, featuring biometric authentication and AI-powered financial insights.",
    image: "/images/EBOScover.png",
    category: "Mobile Apps",
    year: "2023",
    color: "#5F9D9F",
  },
  {
    id: 7,
    title: "Readwood Cabins",
    subtitle: "All rights reserved by LumetriX Solutions (Pvt.)Ltd",
    description: "Readwood Cabins is a modern hotel booking site for browsing and booking rooms with a simple, elegant design.",
    image: "/images/RedwoodMain.png",
    category: "Landing pages",
    year: "2024",
    color: "#700F10",
  },
  {
    id: 8,
    title: "Gamification Education Website",
    subtitle: "",
    description: "Gamification Education Website is a university project designed to teach C programming to first-year students through interactive lessons and challenges. The user-friendly interface supports engagement, progress tracking, and easy navigation for an effective learning experience. This approach helps motivate students by making learning fun and accessible.",
    image: "/images/GamificationCover.png",
    category: "Web Applications",
    year: "2023",
    color: "#2E1484",
  },
  
];

const categories = ["All", "Web Applications", "Landing pages", "Mobile Apps"];

export function AllProjects({ onBackToFeatured, onProjectClick }: AllProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "All" 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory);

  const handleProjectCardClick = (project: Project) => {
    onProjectClick(project);
  };

  return (
    <section className="relative bg-background min-h-screen py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 mb-16"
      >
        <div className="flex items-center justify-between mb-12">
          <motion.button
            onClick={onBackToFeatured}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-card hover:bg-muted text-foreground border border-border hover:border-accent/40 rounded-full transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md"
            data-cursor="CLICK"
          >
            <motion.svg 
              width="20" 
              height="20" 
              viewBox="0 0 16 16" 
              fill="none"
              whileHover={{ x: -3 }}
              transition={{ duration: 0.3 }}
            >
              <path 
                d="M8 0L9.41 1.41L3.83 7H16V9H3.83L9.41 14.59L8 16L0 8L8 0Z" 
                fill="currentColor"
              />
            </motion.svg>
            <span className="font-medium">Back to About</span>
          </motion.button>

          <div className="text-center">
            <motion.span 
              className="text-sm tracking-widest text-accent-gradient uppercase mb-4 block animate-gradient-shift"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Complete Portfolio
            </motion.span>
            <motion.h1 
              className="text-accent-gradient-sunset animate-gradient-pulse"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              All Projects
            </motion.h1>
          </div>

          <div className="w-32" /> {/* Spacer for centering */}
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-sm font-medium tracking-wider transition-all duration-300 backdrop-blur-sm border ${
                selectedCategory === category
                  ? 'bg-accent-gradient text-white border-accent/50 shadow-lg shadow-accent/25'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground hover:border-accent/30'
              }`}
              data-cursor="CLICK"
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                layout: { duration: 0.3 }
              }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative cursor-pointer"
              onClick={() => handleProjectCardClick(project)}
            >
              <div 
                className="relative backdrop-blur-xl rounded-2xl overflow-hidden border shadow-lg transition-all duration-500 group-hover:shadow-xl bg-card"
                style={{
                  background: `linear-gradient(135deg, ${project.color}08, rgba(255, 255, 255, 0.95))`,
                  borderColor: `${project.color}20`,
                  boxShadow: hoveredProject === project.id 
                    ? `0 25px 50px -12px ${project.color}30, 0 0 0 1px ${project.color}20`
                    : `0 10px 25px -8px ${project.color}15, 0 0 0 1px ${project.color}10`
                }}
              >
                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
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

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase backdrop-blur-sm border"
                      style={{
                        background: `${project.color}10`,
                        color: project.color,
                        borderColor: `${project.color}20`
                      }}
                    >
                      {project.category}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">
                      {project.year}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent-gradient transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground font-medium">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* View Project Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 border font-medium"
                    style={{
                      background: `${project.color}10`,
                      borderColor: `${project.color}20`,
                      color: project.color
                    }}
                    data-cursor="VIEW"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectCardClick(project);
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
                  style={{ backgroundColor: project.color }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}