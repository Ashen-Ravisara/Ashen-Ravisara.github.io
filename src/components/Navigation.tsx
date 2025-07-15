"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  onNavigate?: (section: string) => void;
  onHome?: () => void;
}

export function Navigation({ onNavigate, onHome }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Work', section: 'project' },
    { label: 'About', section: 'about' },
    { label: 'Contact', section: 'contact' },
  ];

  const handleNavigation = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      // Fallback to direct scrolling if no callback provided
      const targetSelector = `[data-section="${section}"]`;
      const element = document.querySelector(targetSelector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (onHome) {
      onHome();
    } else {
      // Fallback to scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 transition-all duration-700 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={handleHomeClick}
          >
            <span className="text-lg font-bold tracking-wider text-gray-800">AR</span>
          </motion.div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center group"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
              className="w-6 h-0.5 bg-gray-800 block transition-all duration-300"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-gray-800 block transition-all duration-300"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
              className="w-6 h-0.5 bg-gray-800 block transition-all duration-300"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-lg"
          >
            <div className="flex items-center justify-center h-full">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center space-y-8"
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavigation(item.section)}
                      className="block text-4xl md:text-6xl font-bold text-gray-800 hover:text-accent transition-colors duration-300"
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}