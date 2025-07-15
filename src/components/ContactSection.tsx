import { motion } from 'framer-motion';
import { useState } from 'react';
import { ScrollingRibbon } from './ScrollingRibbon';

export function ContactSection() {
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  return (
    <>
      {/* Modern Scrolling Ribbon */}
      <ScrollingRibbon />
      
      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#6366f1_0%,transparent_50%)] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#8b5cf6_0%,transparent_50%)] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0%,transparent_70%)] opacity-10" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          {/* Section Tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 bg-indigo-100 backdrop-blur-sm border border-indigo-200 rounded-full text-indigo-700 text-sm font-medium tracking-wider uppercase">
              Contact
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-none group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="inline-block">
                {["L", "e", "t", "'", "s", " ", "T", "a", "l", "k"].map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      y: -4,
                      scale: 1.1,
                      rotateZ: Math.random() * 6 - 3,
                      transition: { 
                        type: "spring",
                        stiffness: 400,
                        damping: 12
                      }
                    }}
                    whileTap={{
                      scale: 0.95,
                      y: 1,
                      transition: { duration: 0.1 }
                    }}
                    onMouseEnter={() => setHoveredLetter(index)}
                    onMouseLeave={() => setHoveredLetter(null)}
                    className={`inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:via-indigo-600 group-hover:to-blue-700 transition-all duration-300 cursor-pointer select-none ${
                      letter === " " ? "w-3" : ""
                    }`}
                    style={{
                      backgroundSize: "200% 100%",
                      animation: `gradient-shift 3s ease-in-out infinite ${index * 0.2}s`,
                      filter: hoveredLetter === index ? 'drop-shadow(0 0 15px #6366f1)' : 'none',
                      transformOrigin: 'center bottom'
                    }}
                  >
                    {letter === " " ? "\u00A0" : (
                      <motion.span
                        animate={hoveredLetter === index ? {
                          textShadow: [
                            '0 0 0px #6366f1',
                            '0 0 15px #6366f1',
                            '0 0 0px #6366f1'
                          ]
                        } : {}}
                        transition={{ duration: 0.5, repeat: hoveredLetter === index ? Infinity : 0 }}
                      >
                        {letter}
                      </motion.span>
                    )}
                  </motion.span>
                ))}
              </span>
            </motion.h2>

            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Ready to bring your vision to life? Let's collaborate and create something extraordinary together.
            </motion.p>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Email */}
            <motion.a
              href="mailto:ashen2ravisara@gmail.com?subject=Project%20Inquiry%20-%20Portfolio%20Contact&body=Hi%20Ashen,%0A%0AI%20would%20like%20to%20discuss%20a%20potential%20project%20with%20you.%0A%0ABest%20regards"
              className="group relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 hover:border-indigo-300 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.03,
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative z-10">
                <motion.div 
                  className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-indigo-200 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-indigo-700 transition-colors duration-300">Email</h3>
                <p className="text-gray-500 mb-4">Drop me a line anytime</p>
                <p className="text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors duration-300">ashen2ravisara@gmail.com</p>
              </div>
              
              {/* Hover Effect Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+1234567890"
              className="group relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 hover:border-purple-300 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.03,
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative z-10">
                <motion.div 
                  className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-200 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">Phone</h3>
                <p className="text-gray-500 mb-4">Let's have a conversation</p>
                <p className="text-purple-600 font-medium group-hover:text-purple-700 transition-colors duration-300">+94 76 394 0690</p>
              </div>
              
              {/* Hover Effect Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              { icon: "linkedin", href: "https://linkedin.com", label: "LinkedIn", color: "bg-blue-100 hover:bg-blue-200 text-blue-600" },
              { icon: "behance", href: "https://behance.com", label: "Behance", color: "bg-indigo-100 hover:bg-indigo-200 text-indigo-600" },
              { icon: "facebook", href: "https://facebook.com", label: "Facebook", color: "bg-blue-100 hover:bg-blue-200 text-blue-600" },
              { icon: "instagram", href: "https://instagram.com", label: "Instagram", color: "bg-purple-100 hover:bg-purple-200 text-purple-600" }
            ].map((social, index) => (
              <motion.a
                key={social.icon}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative w-14 h-14 ${social.color} backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center hover:border-gray-300 transition-all duration-300`}
                whileHover={{ 
                  scale: 1.15,
                  y: -3,
                  rotate: 360,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                whileTap={{ scale: 0.92 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                <motion.div
                  className="w-6 h-6 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {social.icon === "linkedin" && (
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {social.icon === "behance" && (
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                    </svg>
                  )}
                  {social.icon === "facebook" && (
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                  {social.icon === "instagram" && (
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                </motion.div>
                
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  {social.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 -mt-1" />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Background Gradient Animation */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "radial-gradient(600px at 0% 0%, #6366f1 0%, transparent 50%)",
              "radial-gradient(600px at 100% 100%, #8b5cf6 0%, transparent 50%)",
              "radial-gradient(600px at 0% 100%, #3b82f6 0%, transparent 50%)",
              "radial-gradient(600px at 100% 0%, #6366f1 0%, transparent 50%)",
              "radial-gradient(600px at 0% 0%, #8b5cf6 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </section>
    </>
  );
}